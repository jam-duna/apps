// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ServiceStatistics } from '../../../types/index.js';

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
      container
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
            series={[{ data: series }]}
            xAxis={[{ scaleType: 'band', data: axis, reverse: true }]}
            yAxis={[{ valueFormatter: yAxisFormatter }]}
          />
        </div>
      </Paper>
    </Grid>
  );
};

export const ServiceStatsGrid: React.FC<{
  stats: { time: number; stat: ServiceStatistics }[];
}> = ({ stats }) => {
  const getNumPreimagesSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.provided_count);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getNumBytesPreimagesSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.provided_size);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getNumResultsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.refinement_count);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getRefineGasUsedSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.refinement_gas_used);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getNumImportedSegmentsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.imports);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getNumExportedSegmentsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.exports);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getNumBytesExtrinsicsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.extrinsic_size);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getNumExtrinsicsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.extrinsic_count);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getAccumulateNumWorkReportsSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.accumulate_count);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getAccumulateGasUsedSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.accumulate_gas_used);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getTransferNumTransfersSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.on_transfers_count);
      axis.push(formatDate(stat.time));
    });

    return { axis, result };
  };

  const getTransferGasUsedSeries = () => {
    const result: number[] = [];
    const axis: string[] = [];

    stats.forEach((stat) => {
      result.push(stat.stat.on_transfers_gas_used);
      axis.push(formatDate(stat.time));
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
          Service Statistics
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
      >
        <GraphCompoment
          axis={getNumPreimagesSeries().axis}
          series={getNumPreimagesSeries().result}
          title={'Num Preimages'}
        />
        <GraphCompoment
          axis={getNumBytesPreimagesSeries().axis}
          series={getNumBytesPreimagesSeries().result}
          title={'Num Bytes Preimages'}
        />
        <GraphCompoment
          axis={getNumResultsSeries().axis}
          series={getNumResultsSeries().result}
          title={'Num Results'}
        />
        <GraphCompoment
          axis={getRefineGasUsedSeries().axis}
          series={getRefineGasUsedSeries().result}
          title={'Refine Gas Used'}
        />
        <GraphCompoment
          axis={getNumImportedSegmentsSeries().axis}
          series={getNumImportedSegmentsSeries().result}
          title={'Num Imported Segments'}
        />
        <GraphCompoment
          axis={getNumExportedSegmentsSeries().axis}
          series={getNumExportedSegmentsSeries().result}
          title={'Num Exported Segments'}
        />
        <GraphCompoment
          axis={getNumBytesExtrinsicsSeries().axis}
          series={getNumBytesExtrinsicsSeries().result}
          title={'Num Bytes Extrinsics'}
        />
        <GraphCompoment
          axis={getNumExtrinsicsSeries().axis}
          series={getNumExtrinsicsSeries().result}
          title={'Num Extrinsics'}
        />
        <GraphCompoment
          axis={getAccumulateNumWorkReportsSeries().axis}
          series={getAccumulateNumWorkReportsSeries().result}
          title={'Accumulate Num WorkReports'}
        />
        <GraphCompoment
          axis={getAccumulateGasUsedSeries().axis}
          series={getAccumulateGasUsedSeries().result}
          title={'Accumulate Gas Used'}
        />
        <GraphCompoment
          axis={getTransferNumTransfersSeries().axis}
          series={getTransferNumTransfersSeries().result}
          title={'Transfer Num Transfers'}
        />
        <GraphCompoment
          axis={getTransferGasUsedSeries().axis}
          series={getTransferGasUsedSeries().result}
          title={'Transfer Gas Used'}
        />
      </Grid>
    </>
  );
};
