// Copyright 2017-2025 @polkadot/app-jamm author & contributors
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
    <Box sx={{ alignItems: 'center', display: 'flex' }}>
      <IconButton
        disabled={!prevHash}
        // eslint-disable-next-line react/jsx-no-bind
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
        // eslint-disable-next-line react/jsx-no-bind
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
