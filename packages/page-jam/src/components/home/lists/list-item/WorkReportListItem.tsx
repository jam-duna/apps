// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { Block } from '../../../../db/db.js';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { getRelativeTime, pluralize, truncateHash } from '../../../../utils/helper.js';

export interface WorkReportListItemProps {
  blockItem: Block;
}

export default function WorkReportListItem ({ blockItem }: WorkReportListItemProps) {
  const guaranteesCount = blockItem.extrinsic.guarantees.length;
  const createdAt = blockItem?.overview?.createdAt;
  const relativeTime = createdAt ? getRelativeTime(createdAt) : 'N/A';
  const headerHash = blockItem?.overview?.headerHash || '';
  const shortHash = truncateHash(headerHash, 'long');
  const slot = blockItem.header.slot;

  return (
    <Link
      key={headerHash}
      style={{ color: 'inherit', textDecoration: 'none' }}
      to={`/jam/block/${headerHash}/workreport`}
    >
      <Box
        sx={{
          '&:hover': { backgroundColor: '#f9f9f9' },
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
          borderRadius: 1,
          display: 'flex',
          p: 1.5,
          transition: 'background-color 0.2s'
        }}
      >
        {/* Left icon */}
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
          <AssignmentIcon fontSize='small' />
        </Box>
        {/* Middle: Report count and relative time */}
        <Box sx={{ flex: 1 }}>
          <Typography variant='subtitle1'>
            Slot {slot} - {guaranteesCount}
            {pluralize(' Report', guaranteesCount)}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            {relativeTime} ago
          </Typography>
        </Box>
        {/* Right: truncated header hash */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            sx={{ color: '#1976d2', textDecoration: 'underline' }}
            variant='body2'
          >
            {shortHash}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            header hash
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
