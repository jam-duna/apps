// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react/jsx-no-bind */

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fallbackCopyTextToClipboard } from '../../../utils/clipboard.js';
import { SegmentIcon } from '../../Icons/index.js';
import { ItemMode } from '../index.js';

interface SegmentProps {
  mode: ItemMode;
  hash: string;
  index: number;
  data?: string;
}

export function Segment (param: SegmentProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    const copyToClipboard = async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(param.data || '0x___');
        } else {
          fallbackCopyTextToClipboard(param.data || '0x___');
        }

        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    // eslint-disable-next-line no-void
    void copyToClipboard();
  };

  const tableRender = (
    <Box
      alignItems='center'
      display='flex'
      gap={0.5}
      justifyContent='start'
      paddingLeft='10px'
      sx={{
        color: '#444444',
        cursor: 'pointer'
      }}
    >
      <Tooltip
        arrow
        placement='top'
        title={`Segment data : ${param.data || '0x___'}`}
      >
        <Typography
          fontSize={'13px'}
          variant='subtitle2'
        >
          {param.data || '0x___'}
        </Typography>
      </Tooltip>
      <Tooltip
        arrow
        placement='top'
        title={copied ? 'Copied!' : 'Copy segment data'}
      >
        <IconButton onClick={handleCopy}>
          {!copied
            ? (
              <ContentCopy
                sx={{
                  color: '#444444',
                  height: '12px',
                  width: '12px'
                }}
              />
            )
            : (
              <Check sx={{
                color: '#444444',
                height: '12px',
                width: '12px'
              }}
              />
            )}
        </IconButton>
      </Tooltip>
    </Box>
  );
  const mediumRender = (
    <Tooltip
      arrow
      placement='top'
      title={`Segment index : ${param.index}`}
    >
      <Link
        style={{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          width: '40px'
        }}
        to={`/jam/segment/${param.hash}/${param.index}`}
      >
        <Typography
          fontSize={'14px'}
          variant='subtitle2'
        >
          {param.index}
        </Typography>
      </Link>
    </Tooltip>
  );
  const largeRender = (
    <Link
      to={`/jam/segment/${param.hash}/${param.index}`}
    >
      <Box
        alignItems='center'
        display='flex'
        gap={0.5}
        justifyContent='center'
        sx={{
          color: '#444444',
          cursor: 'pointer',
          height: '100%',
          width: '100%'
        }}
      >
        <SegmentIcon
          color={'#444'}
          size={24}
        />
        <Typography
          fontSize={'32px'}
          fontWeight={'bold'}
          variant='subtitle2'
        >
          Segment
        </Typography>
      </Box>
    </Link>
  );

  return (
    <>
      {param.mode === ItemMode.Table && tableRender}
      {param.mode === ItemMode.Medium && mediumRender}
      {param.mode === ItemMode.Large && largeRender}
    </>
  );
}
