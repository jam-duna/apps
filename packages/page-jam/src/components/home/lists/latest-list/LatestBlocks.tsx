// [object Object]
// SPDX-License-Identifier: Apache-2.0

import type { Block } from '../../../../db/db.js';

import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import BlockListItem from '../list-item/BlockListItem.js';

interface LatestBlocksProps {
  latestBlocks: Block[];
}

export default function LatestBlocks ({ latestBlocks }: LatestBlocksProps) {
  return (
    <Paper variant='outlined'>
      <Typography
        gutterBottom
        sx={{ px: 1.5, py: 2, borderBottom: '1px solid #ccc', m: 0 }}
        variant='h6'
      >
        Latest Blocks
      </Typography>
      {latestBlocks.map((blockItem) => (
        <BlockListItem
          blockItem={blockItem}
          key={blockItem?.overview?.headerHash || blockItem.header.slot}
        />
      ))}
      <Link
        style={{
          textDecoration: 'none',
          color: 'inherit',
          textAlign: 'center'
        }}
        to={'/jam/list/block'}
      >
        <Typography
          sx={{ p: 2, '&:hover': { backgroundColor: '#f9f9f9' } }}
          variant='subtitle2'
        >
          View All Blocks
        </Typography>
      </Link>
    </Paper>
  );
}
