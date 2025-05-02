// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import DetailToggleButtons from '../../components/block/DetailToggleButtons.js';
import { BlockTab } from '../../components/block/tabs/BlockTab.js';
import { StateTab } from '../../components/block/tabs/StateTab.js';
import { BlockIcon } from '../../components/Icons/index.js';
import { useBlockOverview } from '../../hooks/useBlockOverview.js';
import { fetchTraceBlock } from '../../hooks/useFetchTraceBlock.js';
import { fallbackCopyTextToClipboard } from '../../utils/clipboard.js';
import { getRpcUrlFromWs } from '../../utils/ws.js';

export default function BlockOverviewPage () {
  const params = useParams();
  const headerHash = params.headerhash!;
  const [searchParams, setSearchParams] = useSearchParams();
  const queryType = searchParams.get('type') as 'hash' | 'slot';

  const { blockRecord, nextHash, prevHash, stateRecord } = useBlockOverview(
    headerHash,
    queryType
  );

  const [selectedTab, setSelectedTab] = useState<'block' | 'state'>('block');

  const [traceData, setTraceData] = useState<any[] | null>(null);

  const fetchTrace = async () => {
    const data = await fetchTraceBlock(
      headerHash,
      getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org')
    );

    setTraceData(data);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(JSON.stringify(traceData));
      } else {
        fallbackCopyTextToClipboard(JSON.stringify(traceData));
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!blockRecord) {
    return (
      <Container
        className='hasOwnMaxWidth'
        maxWidth='lg'
        sx={{ mt: 4 }}
      >
        <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 5 }}>
          <BlockIcon
            color={'#555'}
            size={24}
          />
          <Typography
            sx={{ fontWeight: 'bold', fontSize: '32px' }}
            variant='h2'
          >
            Block Details
          </Typography>
        </Box>
        <Paper
          sx={{ p: 3 }}
          variant='outlined'
        >
          <Typography variant='body1'>Loading block details...</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Box
        sx={{ display: 'inline-flex', gap: '5px', alignItems: 'center', mb: 5 }}
      >
        <BlockIcon
          color={'#555'}
          size={24}
        />
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '32px' }}
          variant='h2'
        >
          Block
        </Typography>
        <Typography
          sx={{ fontSize: '20px', marginTop: '6px' }}
          variant='body1'
        >
          {blockRecord.header.slot}
        </Typography>
      </Box>
      <DetailToggleButtons
        onTabChange={(tab) => setSelectedTab(tab)}
        selectedTab={selectedTab}
      />
      {selectedTab === 'block' && (
        <BlockTab
          blockRecord={blockRecord}
          hash={headerHash}
          nextHash={nextHash}
          prevHash={prevHash}
          type={queryType}
        />
      )}
      {selectedTab === 'state' && stateRecord && (
        <StateTab stateRecord={stateRecord} />
      )}
      {selectedTab === 'state' && !stateRecord && (
        <Paper
          sx={{ p: 3 }}
          variant='outlined'
        >
          <Typography variant='body2'>No state data available.</Typography>
        </Paper>
      )}
      <Paper
        sx={{ p: 3, marginBlock: 3 }}
        variant='outlined'
      >
        <Button
          onClick={fetchTrace}
          variant='contained'
        >
          Trace Block
        </Button>
        {traceData !== null && (
          <Box sx={{ maxWidth: '100%', margin: '0 auto', p: 2 }}>
            <Box
              alignItems='center'
              display='flex'
              justifyContent='space-between'
              mb={1}
              sx={{ position: 'relative' }}
            >
              <Typography variant='h6'>Trace Block Result</Typography>
              <Tooltip
                arrow
                placement='top'
                title={copied ? 'Copied!' : 'Copy'}
              >
                <IconButton
                  onClick={handleCopy}
                  sx={{
                    position: 'absolute',
                    border: '1px solid #888',
                    borderRadius: '4px',
                    p: '6px',
                    right: '6px',
                    top: '6px'
                  }}
                >
                  {!copied
                    ? (
                      <ContentCopy
                        sx={{ width: '12px', height: '12px', color: '#444444' }}
                      />
                    )
                    : (
                      <Check
                        sx={{ width: '12px', height: '12px', color: '#444444' }}
                      />
                    )}
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              InputProps={{ readOnly: true }}
              fullWidth
              maxRows={15}
              multiline
              value={JSON.stringify(traceData, null, 2)}
              variant='outlined'
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
}
