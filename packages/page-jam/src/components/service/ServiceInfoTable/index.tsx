// [object Object]
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { ServiceInfo } from '../../../types/index.js';

import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

import { LabeledRow } from '../../display/LabeledRow.js';
import { ItemMode, Preimage } from '../../jamitem/index.js';

interface ServiceInfoTableProps {
  serviceInfo: ServiceInfo;
  metadata: string;
}

export function ServiceInfoTable ({ metadata,
  serviceInfo }: ServiceInfoTableProps) {
  return (
    <Paper
      sx={{ p: 2, marginBlock: 3 }}
      variant='outlined'
    >
      <Typography
        fontWeight={'bold'}
        mb={3}
        variant='h6'
      >
        Service Info
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <LabeledRow
          label='Metadata:'
          tooltip='Metadata of service'
          value={metadata}
        />
        <LabeledRow
          label='Service ID:'
          tooltip='Service ID'
          value={serviceInfo.service_index}
        />
        <LabeledRow
          label='Balance:'
          tooltip='Account balance'
          value={serviceInfo.balance.toString()}
        />
        <LabeledRow
          label='Code Hash:'
          tooltip='Unique identifier for the service'
          value={
            <Preimage
              hash={serviceInfo.code_hash}
              mode={ItemMode.Medium}
              service={serviceInfo.service_index.toString()}
            />
          }
        />
        <LabeledRow
          label='Code Size:'
          tooltip='Code Size'
          value={serviceInfo.code_size.toString()}
        />
        <LabeledRow
          label='Min Item Gas:'
          tooltip='Minimum gas for items'
          value={serviceInfo.min_item_gas.toString()}
        />
        <LabeledRow
          label='Min Memo Gas:'
          tooltip='Minimum gas for memo'
          value={serviceInfo.min_memo_gas.toString()}
        />
        <LabeledRow
          label='Items:'
          tooltip='Number of items'
          value={serviceInfo.items.toString()}
        />
      </Box>
    </Paper>
  );
}
