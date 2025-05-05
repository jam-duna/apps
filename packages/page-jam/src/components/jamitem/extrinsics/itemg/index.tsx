// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ExtrinsicsProps } from '../index.js';

import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';

export function ExtrG (param: ExtrinsicsProps) {
  return (
    <Tooltip
      arrow
      placement='top'
      title='Extrinsics Guarantees'
    >
      <Box
        alignItems='center'
        display='flex'
        justifyContent='center'
        sx={{
          ':hover': {
            backgroundColor: '#1b5e20d0'
          },
          backgroundColor: '#1b5e20',
          borderRadius: '4px',
          color: '#ffffff',
          cursor: 'pointer',
          paddingInline: '5px',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Typography
          fontSize='12px'
          fontWeight='bold'
          paddingTop='2px'
          variant='body2'
        >
          G-{param.count}
        </Typography>
      </Box>
    </Tooltip>
  );
}
