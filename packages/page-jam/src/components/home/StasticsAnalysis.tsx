// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react/jsx-no-bind */

'use client';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React, { useState } from 'react';

interface StatsData {
  assurances: number;
  blocks: number;
  guarantees: number;
  pre_images: number;
  pre_images_size: number;
  tickets: number;
}

interface DataObject {
  current: StatsData[];
  last: StatsData[];
}

const sampleData: DataObject = {
  current: [
    {
      assurances: 2,
      blocks: 0,
      guarantees: 1,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 0
    },
    {
      assurances: 2,
      blocks: 1,
      guarantees: 2,
      pre_images: 1,
      pre_images_size: 1175,
      tickets: 0
    },
    {
      assurances: 2,
      blocks: 2,
      guarantees: 2,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 3
    },
    {
      assurances: 2,
      blocks: 2,
      guarantees: 1,
      pre_images: 1,
      pre_images_size: 1041,
      tickets: 3
    },
    {
      assurances: 2,
      blocks: 1,
      guarantees: 1,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 3
    },
    {
      assurances: 2,
      blocks: 2,
      guarantees: 2,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 3
    }
  ],
  last: [
    {
      assurances: 3,
      blocks: 3,
      guarantees: 1,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 3
    },
    {
      assurances: 3,
      blocks: 2,
      guarantees: 2,
      pre_images: 2,
      pre_images_size: 2245,
      tickets: 0
    },
    {
      assurances: 3,
      blocks: 0,
      guarantees: 2,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 0
    },
    {
      assurances: 3,
      blocks: 0,
      guarantees: 2,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 0
    },
    {
      assurances: 3,
      blocks: 6,
      guarantees: 1,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 6
    },
    {
      assurances: 3,
      blocks: 1,
      guarantees: 1,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 3
    }
  ]
};

function sumStats (data: StatsData[]): StatsData {
  return data.reduce(
    (acc, curr) => ({
      assurances: acc.assurances + curr.assurances,
      blocks: acc.blocks + curr.blocks,
      guarantees: acc.guarantees + curr.guarantees,
      pre_images: acc.pre_images + curr.pre_images,
      pre_images_size: acc.pre_images_size + curr.pre_images_size,
      tickets: acc.tickets + curr.tickets
    }),
    {
      assurances: 0,
      blocks: 0,
      guarantees: 0,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 0
    }
  );
}

export default function StatisticsAnalysis () {
  const [openDialog, setOpenDialog] = useState(false);

  const currentTotals = sumStats(sampleData.current);
  const lastTotals = sumStats(sampleData.last);

  // Compute differences: current - last.
  const diff = {
    assurances: currentTotals.assurances - lastTotals.assurances,
    blocks: currentTotals.blocks - lastTotals.blocks,
    guarantees: currentTotals.guarantees - lastTotals.guarantees,
    pre_images: currentTotals.pre_images - lastTotals.pre_images,
    pre_images_size: currentTotals.pre_images_size - lastTotals.pre_images_size,
    tickets: currentTotals.tickets - lastTotals.tickets
  };

  // Helper to format difference (prepend '+' if positive)
  const formatDiff = (value: number) => (value > 0 ? `+${value}` : `${value}`);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Box sx={{ border: '1px solid #ddd', borderRadius: 2, mt: 4, p: 2 }}>
      <Typography
        gutterBottom
        variant='h6'
      >
        Validator Statistics - Current Totals (vs Last)
      </Typography>
      <Typography>Blocks: {currentTotals.blocks}</Typography>
      <Typography>Tickets: {currentTotals.tickets}</Typography>
      <Typography>Pre Images: {currentTotals.pre_images}</Typography>
      <Typography>Pre Images Size: {currentTotals.pre_images_size}</Typography>
      <Typography>Guarantees: {currentTotals.guarantees}</Typography>
      <Typography>Assurances: {currentTotals.assurances}</Typography>
      <Button
        onClick={handleOpenDialog}
        sx={{ mt: 2 }}
        variant='outlined'
      >
        See Detailed Difference
      </Button>
      <Dialog
        onClose={handleCloseDialog}
        open={openDialog}
      >
        <DialogTitle>Difference Analysis (Current vs Last)</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Blocks: Current {currentTotals.blocks} vs Last {lastTotals.blocks} (
            {formatDiff(diff.blocks)})
          </Typography>
          <Typography>
            Tickets: Current {currentTotals.tickets} vs Last{' '}
            {lastTotals.tickets} ({formatDiff(diff.tickets)})
          </Typography>
          <Typography>
            Pre Images: Current {currentTotals.pre_images} vs Last{' '}
            {lastTotals.pre_images} ({formatDiff(diff.pre_images)})
          </Typography>
          <Typography>
            Pre Images Size: Current {currentTotals.pre_images_size} vs Last{' '}
            {lastTotals.pre_images_size} ({formatDiff(diff.pre_images_size)})
          </Typography>
          <Typography>
            Guarantees: Current {currentTotals.guarantees} vs Last{' '}
            {lastTotals.guarantees} ({formatDiff(diff.guarantees)})
          </Typography>
          <Typography>
            Assurances: Current {currentTotals.assurances} vs Last{' '}
            {lastTotals.assurances} ({formatDiff(diff.assurances)})
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
