import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import type { CoreStatistics } from "../../../types/index.js";
import { LineChart } from "@mui/x-charts";
import { formatDate } from "../../../utils/helper.js";
import { StatisticsIcon } from "../../Icons/index.js";

const GraphCompoment = ({
  title,
  axis,
  series,
}: {
  title: string;
  axis: string[];
  series: number[];
}) => {
  const yAxisFormatter = (value: number): string => {
    if (value >= 1_000_000) return `${Math.floor(value / 1_000_000)}M`;
    if (value >= 1_000) return `${Math.floor(value / 1_000)}k`;
    return value.toString();
  };
  return (
    <Grid key={title} size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper elevation={3} sx={{ paddingY: 2, height: 250 }}>
        <Typography
          variant="h6"
          textAlign="center"
          fontSize="15px"
          gutterBottom
        >
          {title}
        </Typography>
        <div style={{ height: "180px", marginLeft: "-30px" }}>
          <LineChart
            xAxis={[{
              scaleType: "band", data: axis, reverse: true
            }]}
            yAxis={[{ valueFormatter: yAxisFormatter }]}
            series={[{ data: series.reverse() }]}
            height={200}
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
    let result: number[] = [];
    let axis: string[] = [];
    const array = Object.entries(stats);
    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.gas_used);
      axis.push(formatDate(Number.parseInt(slot)));
    });
    return { axis, result };
  };
  const getNumImportedSegmentsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    const array = Object.entries(stats);
    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.imports);
      axis.push(formatDate(Number.parseInt(slot)));
    });
    return { axis, result };
  };
  const getNumExtrinsicsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    const array = Object.entries(stats);
    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.extrinsic_count);
      axis.push(formatDate(Number.parseInt(slot)));
    });
    return { axis, result };
  };
  const getNumBytesExtrinsicsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    const array = Object.entries(stats);
    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.extrinsic_size);
      axis.push(formatDate(Number.parseInt(slot)));
    });
    return { axis, result };
  };
  const getNumExportedSegmentsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    const array = Object.entries(stats);
    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.exports);
      axis.push(formatDate(Number.parseInt(slot)));
    });
    return { axis, result };
  };
  const getTotalBundleLengthSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    const array = Object.entries(stats);
    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.bundle_size);
      axis.push(formatDate(Number.parseInt(slot)));
    });
    return { axis, result };
  };
  const getDALoadSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    const array = Object.entries(stats);
    (array.length > 9 ? array.slice(0, 8) : array).forEach(([slot, stat]) => {
      result.push(stat.da_load);
      axis.push(formatDate(Number.parseInt(slot)));
    });
    return { axis, result };
  };
  const getNumAssurancesSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
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
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        width="100%"
        marginBottom="10px"
      >
        <StatisticsIcon size={24} color={"#444"} />
        <Typography variant="h5" fontSize="24px">
          Core Statistics
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <GraphCompoment
          title={"Gas Used"}
          axis={getGasUsedSeries().axis}
          series={getGasUsedSeries().result}
        />
        <GraphCompoment
          title={"Num Imported Segments"}
          axis={getNumImportedSegmentsSeries().axis}
          series={getNumImportedSegmentsSeries().result}
        />
        <GraphCompoment
          title={"Num Extrinsics"}
          axis={getNumExtrinsicsSeries().axis}
          series={getNumExtrinsicsSeries().result}
        />
        <GraphCompoment
          title={"Num Bytes Extrinsics"}
          axis={getNumBytesExtrinsicsSeries().axis}
          series={getNumBytesExtrinsicsSeries().result}
        />
        <GraphCompoment
          title={"Num Exported Segments"}
          axis={getNumExportedSegmentsSeries().axis}
          series={getNumExportedSegmentsSeries().result}
        />
        <GraphCompoment
          title={"Total Bundle Length"}
          axis={getTotalBundleLengthSeries().axis}
          series={getTotalBundleLengthSeries().result}
        />
        <GraphCompoment
          title={"DA Load"}
          axis={getDALoadSeries().axis}
          series={getDALoadSeries().result}
        />
        <GraphCompoment
          title={"Num Assurances"}
          axis={getNumAssurancesSeries().axis}
          series={getNumAssurancesSeries().result}
        />
      </Grid>
    </>
  );
};
