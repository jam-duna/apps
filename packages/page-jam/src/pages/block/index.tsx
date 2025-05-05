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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const headerHash = params.headerhash!;
  const [searchParams] = useSearchParams();
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

    setTraceData(data ? [data] : null);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    const copyToClipboard = async () => {
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

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    copyToClipboard();
  };

  if (!blockRecord) {
    return (
      <Container
        className='hasOwnMaxWidth'
        maxWidth='lg'
        sx={{ mt: 4 }}
      >
        <Box sx={{ alignItems: 'center', display: 'inline-flex', mb: 5 }}>
          <BlockIcon
            color={'#555'}
            size={24}
          />
          <Typography
            sx={{ fontSize: '32px', fontWeight: 'bold' }}
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
        sx={{ alignItems: 'center', display: 'inline-flex', gap: '5px', mb: 5 }}
      >
        <BlockIcon
          color={'#555'}
          size={24}
        />
        <Typography
          sx={{ fontSize: '32px', fontWeight: 'bold' }}
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
        onTabChange={setSelectedTab}
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
        sx={{ marginBlock: 3, p: 3 }}
        variant='outlined'
      >
        <Button
          // eslint-disable-next-line react/jsx-no-bind
          onClick={function handleTraceClick () {
            // eslint-disable-next-line no-void
            void fetchTrace();
          }}
          variant='contained'
        >
          Trace Block
        </Button>
        {traceData !== null && (
          <Box sx={{ margin: '0 auto', maxWidth: '100%', p: 2 }}>
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
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={handleCopy}
                  sx={{
                    border: '1px solid #888',
                    borderRadius: '4px',
                    p: '6px',
                    position: 'absolute',
                    right: '6px',
                    top: '6px'
                  }}
                >
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
