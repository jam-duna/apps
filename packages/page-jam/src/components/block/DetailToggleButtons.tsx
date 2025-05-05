// Copyright 2017-2025 @polkadot/app-jamm author & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export interface DetailToggleButtonsProps {
  selectedTab: 'block' | 'state';
  onTabChange: (tab: 'block' | 'state') => void;
}

export default function DetailToggleButtons ({ onTabChange,
  selectedTab }: DetailToggleButtonsProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Button
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => onTabChange('block')}
        sx={{ mr: 1 }}
        variant={selectedTab === 'block' ? 'contained' : 'outlined'}
      >
        <Typography
          fontWeight={600}
          variant='caption'
        >
          Block
        </Typography>
      </Button>
      <Button
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => onTabChange('state')}
        variant={selectedTab === 'state' ? 'contained' : 'outlined'}
      >
        <Typography
          fontWeight={600}
          variant='caption'
        >
          State
        </Typography>
      </Button>
    </Box>
  );
}
