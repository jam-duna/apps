import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { ServiceStatistics } from "../../../types/index.js";
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
    <Grid container key={title} size={{ xs: 12, sm: 6, md: 3 }}>
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
            xAxis={[{ scaleType: "band", data: axis, reverse: true }]}
            yAxis={[{ valueFormatter: yAxisFormatter }]}
            series={[{ data: series }]}
            height={200}
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
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.provided_count);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getNumBytesPreimagesSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.provided_size);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getNumResultsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.refinement_count);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getRefineGasUsedSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.refinement_gas_used);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getNumImportedSegmentsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.imports);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getNumExportedSegmentsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.exports);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getNumBytesExtrinsicsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.extrinsic_size);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getNumExtrinsicsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.extrinsic_count);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getAccumulateNumWorkReportsSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.accumulate_count);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getAccumulateGasUsedSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.accumulate_gas_used);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getTransferNumTransfersSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.on_transfers_count);
      axis.push(formatDate(stat.time));
    });
    return { axis, result };
  };
  const getTransferGasUsedSeries = () => {
    let result: number[] = [];
    let axis: string[] = [];
    stats.forEach((stat) => {
      result.push(stat.stat.on_transfers_gas_used);
      axis.push(formatDate(stat.time));
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
          Service Statistics
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <GraphCompoment
          title={"Num Preimages"}
          axis={getNumPreimagesSeries().axis}
          series={getNumPreimagesSeries().result}
        />
        <GraphCompoment
          title={"Num Bytes Preimages"}
          axis={getNumBytesPreimagesSeries().axis}
          series={getNumBytesPreimagesSeries().result}
        />
        <GraphCompoment
          title={"Num Results"}
          axis={getNumResultsSeries().axis}
          series={getNumResultsSeries().result}
        />
        <GraphCompoment
          title={"Refine Gas Used"}
          axis={getRefineGasUsedSeries().axis}
          series={getRefineGasUsedSeries().result}
        />
        <GraphCompoment
          title={"Num Imported Segments"}
          axis={getNumImportedSegmentsSeries().axis}
          series={getNumImportedSegmentsSeries().result}
        />
        <GraphCompoment
          title={"Num Exported Segments"}
          axis={getNumExportedSegmentsSeries().axis}
          series={getNumExportedSegmentsSeries().result}
        />
        <GraphCompoment
          title={"Num Bytes Extrinsics"}
          axis={getNumBytesExtrinsicsSeries().axis}
          series={getNumBytesExtrinsicsSeries().result}
        />
        <GraphCompoment
          title={"Num Extrinsics"}
          axis={getNumExtrinsicsSeries().axis}
          series={getNumExtrinsicsSeries().result}
        />
        <GraphCompoment
          title={"Accumulate Num WorkReports"}
          axis={getAccumulateNumWorkReportsSeries().axis}
          series={getAccumulateNumWorkReportsSeries().result}
        />
        <GraphCompoment
          title={"Accumulate Gas Used"}
          axis={getAccumulateGasUsedSeries().axis}
          series={getAccumulateGasUsedSeries().result}
        />
        <GraphCompoment
          title={"Transfer Num Transfers"}
          axis={getTransferNumTransfersSeries().axis}
          series={getTransferNumTransfersSeries().result}
        />
        <GraphCompoment
          title={"Transfer Gas Used"}
          axis={getTransferGasUsedSeries().axis}
          series={getTransferGasUsedSeries().result}
        />
      </Grid>
    </>
  );
};
