// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Disputes } from '../../../types/index.js';

import { Box, Typography } from '@mui/material';
import React from 'react';

interface DisputeItemProps {
  disputes: Disputes;
  idx: number;
}

export default function DisputeItem ({ disputes, idx }: DisputeItemProps) {
  return (
    <Box
      sx={{
        py: 1,
        borderTop: '1px solid #ccc',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere'
      }}
    >
      <Typography
        sx={{ mb: 1 }}
        variant='body2'
      >
        Disputes {idx}
      </Typography>
      <Typography variant='body2'>
        Verdicts: {disputes.verdicts?.length || 0}
      </Typography>
      <Typography variant='body2'>
        Culprits: {disputes.culprits?.length || 0}
      </Typography>
      <Typography variant='body2'>
        Faults: {disputes.faults?.length || 0}
      </Typography>
    </Box>
  );
}
