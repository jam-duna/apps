// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { RhoItem } from '../../../types/index.js';

import { Box, Typography } from '@mui/material';
import React from 'react';

import ReportTable from './ReportTable.js';

interface RhoTableProps {
  data: RhoItem;
  headerHash: string;
}

export default function RhoTable ({ data, headerHash }: RhoTableProps) {
  const validItems = data.filter((item) => item !== null);

  if (validItems.length === 0) {
    return <Typography variant='body1'>No Rho data available.</Typography>;
  }

  return (
    <Box sx={{ my: 4 }}>
      {validItems.map((item, idx) => {
        // TypeScript knows item is not null here.
        const { report, timeout } = item;

        return (
          <Box
            key={idx}
            sx={{ mb: 4 }}
          >
            <ReportTable
              data={report}
              headerHash={headerHash}
              idx={idx}
              timeout={timeout}
            />
          </Box>
        );
      })}
    </Box>
  );
}
