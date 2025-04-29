"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@mui/material"; // Report icon
import { Block } from "../../../../db/db.js";
import { filterWorkReportBlocks } from "../../../../utils/extrinsics.js";
import WorkReportListItem from "../list-item/WorkReportListItem.js";

type LatestReportsProps = {
  latestBlocks: Block[];
};

export default function LatestReports({ latestBlocks }: LatestReportsProps) {
  const filteredBlocks = filterWorkReportBlocks(latestBlocks).slice(0, 5);

  return (
    <Paper variant="outlined">
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 2, px: 1.5, py: 2, borderBottom: "1px solid #ccc", m: 0 }}
      >
        Latest Work Reports
      </Typography>

      {filteredBlocks.map((blockItem) => {
        return (
          <WorkReportListItem
            key={blockItem?.overview?.headerHash}
            blockItem={blockItem}
          />
        );
      })}

      <Link
        to="/list/workReport"
        style={{
          textDecoration: "none",
          color: "inherit",
          textAlign: "center",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ p: 2, "&:hover": { backgroundColor: "#f9f9f9" } }}
        >
          View All Reports
        </Typography>
      </Link>
    </Paper>
  );
}
