// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Block } from '../../db/db.js';

import { Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LabeledRow } from '../../components/display/LabeledRow.js'; // For non-extrinsic rows
import ExtrinsicAccordion from '../../components/extrinsic/ExtrinsicAccordion.js';
import { db } from '../../db/db.js';

export default function ExtrinsicDetailsPage () {
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const headerHash = params.headerhash!;

  const [blockRecord, setBlockRecord] = useState<Block | null>(null);

  useEffect(() => {
    if (headerHash) {
      db.blocks
        .where('overview.headerHash')
        .equals(headerHash)
        .first()
        .then((record) => {
          console.log('Block record loaded from DB:', record);
          setBlockRecord(record || null);
        })
        .catch((error) => {
          console.error('Error loading block record:', error);
        });
    }
  }, [headerHash]);

  if (!blockRecord) {
    return (
      <Container
        maxWidth='lg'
        sx={{ mt: 4 }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography variant='h4'>Extrinsics Details</Typography>
          <Typography variant='body1'>Loading extrinsics details...</Typography>
        </Paper>
      </Container>
    );
  }

  // Use blockRecord.block based on the new DB scheme.
  const extrinsic = blockRecord.extrinsic;

  // Mapping for non-extrinsic details
  const detailsMapping = [
    {
      label: 'Header Hash:',
      tooltip: 'The unique hash of the block header.',
      value: (
        <Link
          to={`/jam/block/${blockRecord?.overview?.headerHash}?type=hash`}
        >
          {blockRecord?.overview?.headerHash}
        </Link>
      )
    }
  ];

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Paper
        sx={{ p: 3 }}
        variant='outlined'
      >
        <Typography
          gutterBottom
          sx={{ fontSize: '32px', fontWeight: 'bold', mb: 3 }}
          variant='h2'
        >
          Extrinsics Details
        </Typography>
        {detailsMapping.map((item, idx) => (
          <LabeledRow
            key={idx}
            label={item.label}
            tooltip={item.tooltip}
            value={<Typography variant='body1'>{item.value}</Typography>}
          />
        ))}
        <ExtrinsicAccordion
          extrinsic={extrinsic || null}
          headerHash={headerHash}
          initialExtrinsicExpanded={true}
        />
      </Paper>
    </Container>
  );
}
