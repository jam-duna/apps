// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { Block } from '../../../../db/db.js';

import { Paper, Typography } from '@mui/material'; // Report icon
import React from 'react';
import { Link } from 'react-router-dom';

import { filterWorkReportBlocks } from '../../../../utils/extrinsics.js';
import WorkReportListItem from '../list-item/WorkReportListItem.js';

interface LatestReportsProps {
  latestBlocks: Block[];
}

export default function LatestReports ({ latestBlocks }: LatestReportsProps) {
  const filteredBlocks = filterWorkReportBlocks(latestBlocks).slice(0, 5);

  return (
    <Paper variant='outlined'>
      <Typography
        gutterBottom
        sx={{ borderBottom: '1px solid #ccc', m: 0, mb: 2, px: 1.5, py: 2 }}
        variant='h6'
      >
        Latest Work Reports
      </Typography>
      {filteredBlocks.map((blockItem) => {
        return (
          <WorkReportListItem
            blockItem={blockItem}
            key={blockItem?.overview?.headerHash}
          />
        );
      })}
      <Link
        style={{
          color: 'inherit',
          textAlign: 'center',
          textDecoration: 'none'
        }}
        to='/jam/list/workreport'
      >
        <Typography
          sx={{ '&:hover': { backgroundColor: '#f9f9f9' }, p: 2 }}
          variant='subtitle2'
        >
          View All Reports
        </Typography>
      </Link>
    </Paper>
  );
}
