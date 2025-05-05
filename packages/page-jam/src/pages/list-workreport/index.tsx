// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Block } from '../../db/db.js';

import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import WorkReportListItem from '../../components/home/lists/list-item/WorkReportListItem.js';
import Loading from '../../components/home/Loading.js';
import { db } from '../../db/db.js';
import { filterWorkReportBlocks } from '../../utils/extrinsics.js';
import { pluralize } from '../../utils/helper.js';

export default function WorkReportListPage () {
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.blocks
      .toArray()
      .then((blocks) => {
        const sorted = blocks.sort((a, b) => {
          const aCreatedAt = a?.overview?.createdAt;
          const bCreatedAt = b?.overview?.createdAt;

          if (aCreatedAt == null && bCreatedAt == null) {
            return 0;
          }

          if (aCreatedAt == null) {
            return 1;
          }

          if (bCreatedAt == null) {
            return -1;
          }

          return bCreatedAt - aCreatedAt;
        });

        setLatestBlocks(sorted);
      })
      .catch((error) => {
        console.error('Error loading blocks from DB:', error);
      });
  }, []);

  useEffect(() => {
    const data = filterWorkReportBlocks(latestBlocks);

    setFilteredBlocks(data);
    setLoading(false);
  }, [latestBlocks]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4, py: 4 }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex-col', mb: 2 }}>
        <Typography
          sx={{ fontSize: '28px', fontWeight: 'bold' }}
          variant='h2'
        >
          All Work Reports List
        </Typography>
        <Typography
          sx={{ mt: 2 }}
          variant='body1'
        >
          There are {filteredBlocks.length}{' '}
          {pluralize(' report', filteredBlocks.length)} found in the page
        </Typography>
      </Box>
      <Paper variant='outlined'>
        {filteredBlocks.map((blockItem) => (
          <WorkReportListItem
            blockItem={blockItem}
            key={blockItem?.overview?.headerHash}
          />
        ))}
      </Paper>
    </Container>
  );
}
