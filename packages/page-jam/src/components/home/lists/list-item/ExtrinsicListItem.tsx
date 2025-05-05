// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { Block } from '../../../../db/db.js';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { calculateExtrinsicCounts } from '../../../../utils/extrinsics.js';
import { getRelativeTime, pluralize } from '../../../../utils/helper.js';

export interface ExtrinsicListItemProps {
  blockItem: Block;
}

export default function ExtrinsicListItem ({ blockItem }: ExtrinsicListItemProps) {
  const extrinsic = blockItem.extrinsic;
  const slot = blockItem.header.slot;

  // Calculate extrinsic counts
  const { assurancesCount,
    disputesCount,
    guaranteesCount,
    preimagesCount,
    ticketsCount,
    totalExtrinsics } = calculateExtrinsicCounts(extrinsic);

  const createdAt = blockItem?.overview?.createdAt;
  const headerHash = blockItem?.overview?.headerHash;
  const relativeTime = createdAt ? getRelativeTime(createdAt) : 'N/A';

  // Build details string (only non-zero counts)
  const detailItems: string[] = [];

  if (ticketsCount > 0) {
    detailItems.push(`Tickets: ${ticketsCount}`);
  }

  if (disputesCount > 0) {
    detailItems.push(`Disputes: ${disputesCount}`);
  }

  if (guaranteesCount > 0) {
    detailItems.push(`Guarantees: ${guaranteesCount}`);
  }

  if (preimagesCount > 0) {
    detailItems.push(`Preimages: ${preimagesCount}`);
  }

  if (assurancesCount > 0) {
    detailItems.push(`Assurances: ${assurancesCount}`);
  }

  return (
    <Link
      key={headerHash}
      style={{ color: 'inherit', textDecoration: 'none' }}
      to={`/jam/block/${headerHash}/extrinsic`}
    >
      <Box
        sx={{
          '&:hover': { backgroundColor: '#f9f9f9' },
          alignItems: 'center',
          borderBottom: '1px solid #ccc',
          borderRadius: 1,
          display: 'flex',
          p: 1.5,
          transition: 'background-color 0.2s'
        }}
      >
        {/* Left Icon */}
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: 1,
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            mr: 2,
            width: 40
          }}
        >
          <ReceiptLongIcon fontSize='small' />
        </Box>
        {/* Middle: extrinsic count and relative time */}
        <Box sx={{ flex: 1 }}>
          <Typography variant='subtitle1'>
            Slot {slot} - {totalExtrinsics}{' '}
            {pluralize('Extrinsic', totalExtrinsics)}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            {relativeTime} ago
          </Typography>
        </Box>
        {/* Right: details string */}
        <Box sx={{ textAlign: 'right' }}>
          {detailItems.length > 0 && (
            <Typography
              color='textSecondary'
              variant='body2'
            >
              {detailItems.join(', ')}
            </Typography>
          )}
        </Box>
      </Box>
    </Link>
  );
}
