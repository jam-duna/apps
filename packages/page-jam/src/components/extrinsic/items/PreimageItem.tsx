// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Preimage } from '../../../types/index.js';

import { Box, Typography } from '@mui/material';
import React from 'react';

interface PreimageItemProps {
  preimage: Preimage;
  idx: number;
  expanded: boolean;
}

export default function PreimageItem ({ idx, preimage }: PreimageItemProps) {
  return (
    <Box
      sx={{
        borderTop: '1px solid #ccc',
        overflowWrap: 'anywhere',
        py: 1,
        whiteSpace: 'normal',
        wordBreak: 'break-word'
      }}
    >
      <Typography
        sx={{ mb: 1 }}
        variant='body2'
      >
        Preimage {idx}
      </Typography>
      {Object.entries(preimage).map(([key, value]) => (
        <Typography
          color='textSecondary'
          gutterBottom
          key={key}
          variant='body2'
        >
          {key}: {value}
        </Typography>
      ))}
    </Box>
  );
}
