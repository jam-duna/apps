// [object Object]
// SPDX-License-Identifier: Apache-2.0

import type { ExtrinsicsProps } from '../index.js';

import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';

export function ExtrP (param: ExtrinsicsProps) {
  return (
    <Tooltip
      arrow
      placement='top'
      title='Extrinsics Preimages'
    >
      <Box
        alignItems='center'
        display='flex'
        justifyContent='center'
        sx={{
          cursor: 'pointer',
          paddingInline: '5px',
          transition: 'all 0.3s ease-in-out',
          color: '#ffffff',
          backgroundColor: '#311b92',
          borderRadius: '4px',
          ':hover': {
            backgroundColor: '#311b92c0'
          }
        }}
      >
        <Typography
          fontSize='12px'
          fontWeight='bold'
          paddingTop='2px'
          variant='body2'
        >
            P-{param.count}
        </Typography>
      </Box>
    </Tooltip>
  );
}
