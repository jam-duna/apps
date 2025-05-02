// [object Object]
// SPDX-License-Identifier: Apache-2.0

import type { CoreStatistics } from '../../../types/index.js';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import React from 'react';

import { formatDate } from '../../../utils/helper.js';
import { StatisticsIcon } from '../../Icons/index.js';

const GraphCompoment = ({ axis,
  series,
  title }: {
  title: string;
  axis: string[];
  series: number[];
}) => {
  const yAxisFormatter = (value: number): string => {
    if (value >= 1_000_000) {
      return `${Math.floor(value / 1_000_000)}M`;
    }

    if (value >= 1_000) {
      return `${Math.floor(value / 1_000)}k`;
    }

    return value.toString();
  };

  return (
    <Grid
      key={title}
      size={{ xs: 12, sm: 6, md: 3 }}
    >
      <Paper
        elevation={3}
        sx={{ paddingY: 2, height: 250 }}
      >
        <Typography
          fontSize='15px'
          gutterBottom
          textAlign='center'
          variant='h6'
        >
          {title}
        </Typography>
        <div style={{ height: '180px', marginLeft: '-30px' }}>
          <LineChart
            height={200}
            series={[{ data: series.reverse() }]}
            xAxis={[{
              scaleType: 'band', data: axis, reverse: true
            }]}
            yAxis={[{ valueFormatter: yAxisFormatter }]}
          />
        </div>
      </Paper>
    </Grid>
  );
};

export const CoreStatsGrid: React.FC<{
  stats: Record<number, CoreStatistics>;
}> = ({ stats }) => {
  const getGasUsedSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];
    const array = Object.entries(stats);

    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.gas_used);
      axis.push(formatDate(Number.parseInt(slot)));
    });

    return { axis, result };
  };

  const getNumImportedSegmentsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];
    const array = Object.entries(stats);

    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.imports);
      axis.push(formatDate(Number.parseInt(slot)));
    });

    return { axis, result };
  };

  const getNumExtrinsicsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];
    const array = Object.entries(stats);

    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.extrinsic_count);
      axis.push(formatDate(Number.parseInt(slot)));
    });

    return { axis, result };
  };

  const getNumBytesExtrinsicsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];
    const array = Object.entries(stats);

    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.extrinsic_size);
      axis.push(formatDate(Number.parseInt(slot)));
    });

    return { axis, result };
  };

  const getNumExportedSegmentsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];
    const array = Object.entries(stats);

    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.exports);
      axis.push(formatDate(Number.parseInt(slot)));
    });

    return { axis, result };
  };

  const getTotalBundleLengthSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];
    const array = Object.entries(stats);

    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.bundle_size);
      axis.push(formatDate(Number.parseInt(slot)));
    });

    return { axis, result };
  };

  const getDALoadSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];
    const array = Object.entries(stats);

    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.da_load);
      axis.push(formatDate(Number.parseInt(slot)));
    });

    return { axis, result };
  };

  const getNumAssurancesSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];
    const array = Object.entries(stats);

    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.popularity);
      axis.push(formatDate(Number.parseInt(slot)));
    });

    return { axis, result };
  };

  return (
    <>
      <Box
        alignItems='center'
        display='flex'
        gap='10px'
        justifyContent='center'
        marginBottom='10px'
        width='100%'
      >
        <StatisticsIcon
          color={'#444'}
          size={24}
        />
        <Typography
          fontSize='24px'
          variant='h5'
        >
          Core Statistics
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
      >
        <GraphCompoment
          axis={getGasUsedSeries().axis}
          series={getGasUsedSeries().result}
          title={'Gas Used'}
        />
        <GraphCompoment
          axis={getNumImportedSegmentsSeries().axis}
          series={getNumImportedSegmentsSeries().result}
          title={'Num Imported Segments'}
        />
        <GraphCompoment
          axis={getNumExtrinsicsSeries().axis}
          series={getNumExtrinsicsSeries().result}
          title={'Num Extrinsics'}
        />
        <GraphCompoment
          axis={getNumBytesExtrinsicsSeries().axis}
          series={getNumBytesExtrinsicsSeries().result}
          title={'Num Bytes Extrinsics'}
        />
        <GraphCompoment
          axis={getNumExportedSegmentsSeries().axis}
          series={getNumExportedSegmentsSeries().result}
          title={'Num Exported Segments'}
        />
        <GraphCompoment
          axis={getTotalBundleLengthSeries().axis}
          series={getTotalBundleLengthSeries().result}
          title={'Total Bundle Length'}
        />
        <GraphCompoment
          axis={getDALoadSeries().axis}
          series={getDALoadSeries().result}
          title={'DA Load'}
        />
        <GraphCompoment
          axis={getNumAssurancesSeries().axis}
          series={getNumAssurancesSeries().result}
          title={'Num Assurances'}
        />
      </Grid>
    </>
  );
};
