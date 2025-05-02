// [object Object]
// SPDX-License-Identifier: Apache-2.0

'use client';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton } from '@mui/material';
import React from 'react';

export interface BlockNavigationButtonsProps {
  prevHash: string | null;
  nextHash: string | null;
  onPrev: () => void;
  onNext: () => void;
}

export default function BlockNavigationButtons ({ nextHash,
  onNext,
  onPrev,
  prevHash }: BlockNavigationButtonsProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        disabled={!prevHash}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        size='small'
        sx={{ ml: 2 }}
      >
        <ArrowBackIosNewIcon fontSize='small' />
      </IconButton>
      <IconButton
        disabled={!nextHash}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        size='small'
        sx={{ ml: 0.5 }}
      >
        <ArrowForwardIosIcon fontSize='small' />
      </IconButton>
    </Box>
  );
}
