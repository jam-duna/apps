// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { Block } from '../../../../db/db.js';

import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { filterExtrinsicBlocks } from '../../../../utils/extrinsics.js'; // Example icon
import ExtrinsicListItem from '../list-item/ExtrinsicListItem.js';

interface ExtrinsicListsProps {
  latestBlocks: Block[];
}

export default function ExtrinsicLists ({ latestBlocks }: ExtrinsicListsProps) {
  // Filter blocks that have at least one extrinsic event

  const filteredBlocks = filterExtrinsicBlocks(latestBlocks).slice(0, 5);

  return (
    <Paper
      sx={{ px: 0 }}
      variant='outlined'
    >
      <Typography
        sx={{ borderBottom: '1px solid #ccc', px: 1.5, py: 2 }}
        variant='h6'
      >
        Extrinsic Lists
      </Typography>
      {filteredBlocks.map((blockItem) => (
        <ExtrinsicListItem
          blockItem={blockItem}
          key={blockItem?.overview?.headerHash}
        />
      ))}
      <Link
        style={{
          color: 'inherit',
          textAlign: 'center',
          textDecoration: 'none'
        }}
        to='/jam/list/extrinsic'
      >
        <Typography
          sx={{ '&:hover': { backgroundColor: '#f9f9f9' }, p: 2 }}
          variant='subtitle2'
        >
          View All Extrinsics
        </Typography>
      </Link>
    </Paper>
  );
}
