// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react/jsx-no-bind */
'use client';

import type { PreimageProps } from '../../../utils/blockAnalyzer.js';

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material'; // Report icon
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { calculateHash } from '../../../utils/blake2.js';
import { fallbackCopyTextToClipboard } from '../../../utils/clipboard.js';
import { getRelativeTime, truncateHash } from '../../../utils/helper.js';
import { PreimageIcon } from '../../Icons/index.js';

function PreimageListItem (data: PreimageProps) {
  const createdAt = data.timestamp;
  const preimageHash = calculateHash(data.preimage.blob);
  const preimageSize = (data.preimage.blob.length - 2) / 2;

  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(preimageHash).catch(console.error);
      } else {
        fallbackCopyTextToClipboard(preimageHash);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Link
      key={preimageHash}
      style={{ color: 'inherit', textDecoration: 'none' }}
      to={`/preimages/${preimageHash}/${preimageSize}`}
    >
      <Box
        sx={{
          '&:hover': { backgroundColor: '#f9f9f9' },
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
          borderRadius: 1,
          display: 'flex',
          p: 1.5,
          transition: 'background-color 0.2s'
        }}
      >
        {/* Left icon */}
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: 1,
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            mr: 2,
            width: 40
          }}
        >
          <PreimageIcon
            color={'#311b92c0'}
            size={20}
          />
        </Box>
        {/* Middle: Report count and relative time */}
        <Box sx={{ flex: 1 }}>
          <Typography variant='subtitle1'>
            requester {data.preimage.requester}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            {getRelativeTime(createdAt)} ago
          </Typography>
        </Box>
        {/* Right: truncated header hash */}
        <Box sx={{ textAlign: 'right' }}>
          <Box
            alignItems='center'
            display='flex'
            flexDirection='row'
            gap='2px'
            justifyContent='end'
            marginRight='-5px'
          >
            <Typography
              fontSize='13px'
              sx={{
                ':hover': {
                  color: '#311b92c0'
                },
                color: '#444444',
                textDecoration: 'none',
                transition: 'all 0.3s ease-in-out'
              }}
              variant='body2'
            >
              hash {truncateHash(preimageHash, 'long')}
            </Typography>
            <Tooltip
              arrow
              placement='top'
              title={copied ? 'Copied!' : 'Copy workpackage hash'}
            >
              <IconButton onClick={handleCopy}>
                {!copied
                  ? (
                    <ContentCopy
                      sx={{ color: '#444444', height: '12px', width: '12px' }}
                    />
                  )
                  : (
                    <Check
                      sx={{ color: '#444444', height: '12px', width: '12px' }}
                    />
                  )}
              </IconButton>
            </Tooltip>
          </Box>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            {preimageSize} bytes
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

interface RecentPreimagesProps {
  preimages: PreimageProps[];
}

export function RecentPreimages (data: RecentPreimagesProps) {
  const displayPreimgs = data.preimages.slice(0, 8);

  return (
    <Paper variant='outlined'>
      <Typography
        sx={{ borderBottom: '1px solid #ccc', m: 0, mb: 2, px: 1.5, py: 2 }}
        variant='h6'
      >
        Recent Preimages
      </Typography>
      {displayPreimgs && displayPreimgs.length > 0
        ? (
          displayPreimgs.map((preimg, preimgIndex) => {
            return <PreimageListItem
              key={preimgIndex}
              {...preimg}
            />;
          })
        )
        : (
          <Typography
            sx={{ '&:hover': { backgroundColor: '#f9f9f9' }, p: 2 }}
            variant='subtitle2'
          >
          No recent preimages
          </Typography>
        )}
    </Paper>
  );
}
