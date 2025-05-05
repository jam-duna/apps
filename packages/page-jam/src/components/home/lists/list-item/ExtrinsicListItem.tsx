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
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/jam/block/${headerHash}/extrinsic`}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          borderRadius: 1,
          transition: 'background-color 0.2s',
          '&:hover': { backgroundColor: '#f9f9f9' },
          borderBottom: '1px solid #ccc'
        }}
      >
        {/* Left Icon */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            mr: 2
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
