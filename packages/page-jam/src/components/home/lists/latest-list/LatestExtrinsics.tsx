"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import { Block } from "../../../../db/db.js"
import ExtrinsicListItem from "../list-item/ExtrinsicListItem.js";
import { filterExtrinsicBlocks } from "../../../../utils/extrinsics.js"; // Example icon

type ExtrinsicListsProps = {
  latestBlocks: Block[];
};

export default function ExtrinsicLists({ latestBlocks }: ExtrinsicListsProps) {
  // Filter blocks that have at least one extrinsic event

  const filteredBlocks = filterExtrinsicBlocks(latestBlocks).slice(0, 5);

  return (
    <Paper sx={{ px: 0 }} variant="outlined">
      <Typography
        variant="h6"
        sx={{ px: 1.5, py: 2, borderBottom: "1px solid #ccc" }}
      >
        Extrinsic Lists
      </Typography>

      {filteredBlocks.map((blockItem) => (
        <ExtrinsicListItem
          key={blockItem?.overview?.headerHash}
          blockItem={blockItem}
        />
      ))}

      <Link
        to="/list/extrinsic"
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
          View All Extrinsics
        </Typography>
      </Link>
    </Paper>
  );
}
