// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react/jsx-no-bind */

'use client';

import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from '../../db/db.js';
import { fetchState } from '../../hooks/useFetchState.js';
import { getRpcUrlFromWs } from '../../utils/ws.js';
import { BlockSearchIcon } from '../Icons/index.js';

export default function SearchBar () {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState<'hash' | 'slot'>('hash');
  const [openDialog, setOpenDialog] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = async () => {
    if (!searchValue) {
      return;
    }

    const rpcUrl = getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org');

    // Check IndexedDB for a matching block by headerHash
    try {
      let foundBlock;

      if (searchType === 'hash') {
        foundBlock = await db.blocks.get({ headerHash: searchValue });
      } else if (searchType === 'slot') {
        foundBlock = await db.blocks
          .where('overview.slot')
          .equals(Number(searchValue))
          .first();
      }

      if (foundBlock) {
        navigate(`/jam/block/${searchValue}?type=${searchType}`);

        return;
      }

      navigate(`/jam/block/${searchValue}?type=${searchType}`);
    } catch (error) {
      console.log('Error searching IndexedDB:', error);
    }

    // Show loading modal while fetching block data
    setIsFetching(true);

    try {
      if (searchType === 'hash') {
        // Optionally fetch state data if needed
        try {
          await fetchState(searchValue, rpcUrl);
        } catch (stateError) {
          console.error('Error fetching state data:', stateError);
        }
      }

      navigate(`/jam/block/${searchValue}?type=${searchType}`);
    } catch (error) {
      console.error('Error fetching block data:', error);
      setOpenDialog(true);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Regex to match numbers or hex hashes (with optional '0x' prefix)
    const isHex = /^(0x)?[0-9a-fA-F]*$/.test(newValue);
    const isNumber = /^[0-9]*$/.test(newValue);

    if (isHex || newValue === '') {
      setSearchValue(newValue);
      setSearchType(isNumber ? 'slot' : 'hash');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // eslint-disable-next-line no-void
      void handleSearch();
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Box
      display='flex'
      width='100%'
    >
      <TextField
        InputLabelProps={{
          sx: {
            fontSize: '14px' // label size
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleSearch}
                sx={{ height: '32px' }}
              >
                <Box marginTop='-10px'>
                  <BlockSearchIcon
                    color={'#444'}
                    size={16}
                  />
                </Box>
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            '::placeholder': {
              fontSize: '14px', // placeholder text size
              opacity: 1 // ensure it's visible
            },
            fontSize: '14px' // input text size
          }
        }}
        fullWidth
        label='Query Block'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder='Enter slot index or header hash'
        size='small'
        value={searchValue}
        variant='outlined'
      />
      {/* Dialog for error handling */}
      <Dialog
        onClose={handleCloseDialog}
        open={openDialog}
      >
        <DialogTitle>Invalid Input</DialogTitle>
        <DialogContent>
          <Typography>
            The input you entered did not return valid block data.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Loading Modal */}
      <Dialog open={isFetching}>
        <DialogContent
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            py: 4
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Fetching data, please wait...</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
