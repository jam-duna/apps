// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LabeledRow } from '../../components/display/LabeledRow.js';
import Loading from '../../components/home/Loading.js';
import { ItemMode, Segment, WorkPackage } from '../../components/jamitem/index.js';
import { fetchSegment } from '../../hooks/useFetchSegment.js';
import { getRpcUrlFromWs } from '../../utils/ws.js';

export default function SegmentDetailPage () {
  const params = useParams();
  const hash = params.workPackageHash!;
  const index = params.index!;

  const [segmentData, setSegmentData] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreimage = async () => {
      const data = await fetchSegment(
        hash,
        Number.parseInt(index),
        getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org')
      );

      setSegmentData(data || '0x___');
      setLoading(false);
    };

    fetchPreimage();
  }, [hash, index]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 2 }}>
        <Segment
          hash={hash}
          index={Number.parseInt(index)}
          mode={ItemMode.Large}
        />
      </Box>
      <Paper
        sx={{ p: 3, marginBlock: 3 }}
        variant='outlined'
      >
        <LabeledRow
          icon='workpackage'
          label='Work Package'
          tooltip='Work Package'
          value={
            <WorkPackage
              hash={hash}
              mode={ItemMode.Grid}
              report={null}
              timestamp={0}
            />
          }
        />
        <LabeledRow
          label='Index'
          tooltip='Segment Index'
          value={
            <Typography
              color='#444'
              fontSize='16px'
              pl='10px'
              variant='body2'
            >
              {index}
            </Typography>
          }
        />
        <LabeledRow
          icon='segment'
          label='Data'
          tooltip='Segment Data'
          value={
            <Segment
              data={segmentData}
              hash={hash}
              index={Number.parseInt(index)}
              mode={ItemMode.Table}
            />
          }
        />
      </Paper>
    </Container>
  );
}
