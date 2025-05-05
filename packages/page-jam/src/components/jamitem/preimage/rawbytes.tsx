// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-void */
/* eslint-disable react/jsx-no-bind */

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
        color: '#444444',
        cursor: 'pointer',
        marginTop: '3px',
        paddingInline: '5px'
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
        <IconButton onClick={(e) => void handleCopy(e)}>
          {!copied
            ? <ContentCopy sx={{ color: '#444444', height: '12px', width: '12px' }} />
            : <Check sx={{ color: '#444444', height: '12px', width: '12px' }} />
          }
        </IconButton>
      </Tooltip>
    </Box>
  );
}
