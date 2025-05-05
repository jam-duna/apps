// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, TextareaAutosize, Tooltip } from '@mui/material';
import React, { useState } from 'react';

import { fallbackCopyTextToClipboard } from '../../../utils/clipboard.js';

interface PreimageRawbytesProps {
  rawbytes: string,
}

export function PreimageRawbytes ({ rawbytes }: PreimageRawbytesProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(rawbytes);
      } else {
        fallbackCopyTextToClipboard(rawbytes);
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
        paddingInline: '5px',
        color: '#444444',
        marginTop: '3px'
      }}
    >
      <TextareaAutosize
        color='neutral'
        maxRows={20}
        minRows={20}
        readOnly
        style={{ flexGrow: 1 }}
        value={rawbytes}
      />
      <Tooltip
        arrow
        placement='top'
        title={copied ? 'Copied!' : 'Copy preimage rawbytes'}
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
