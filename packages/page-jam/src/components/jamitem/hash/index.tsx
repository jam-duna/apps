// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

import { fallbackCopyTextToClipboard } from '../../../utils/clipboard.js';

interface HashProps {
  hash: string;
}

export function Hash ({ hash }: HashProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(hash);
      } else {
        fallbackCopyTextToClipboard(hash);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Box
      alignItems='center'
      display='flex'
      gap='2px'
      justifyContent='start'
      sx={{
        cursor: 'pointer',
        color: '#444444'
      }}
    >
      <Tooltip
        arrow
        placement='top'
        title={`Hash: ${hash}`}
      >
        <Typography
          fontSize='15px'
          variant='subtitle2'
        >
          {hash}
        </Typography>
      </Tooltip>
      <Tooltip
        arrow
        placement='top'
        title={copied ? 'Copied!' : 'Copy hash'}
      >
        <IconButton onClick={handleCopy}>
          {!copied
            ? <ContentCopy sx={{ width: '12px', height: '12px', color: '#444444' }} />
            : <Check sx={{ width: '12px', height: '12px', color: '#444444' }} />
          }
        </IconButton>
      </Tooltip>
    </Box>
  );
}
