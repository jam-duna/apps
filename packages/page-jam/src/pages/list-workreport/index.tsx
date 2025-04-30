// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { db, Block } from "../../db/db.js";
import { filterWorkReportBlocks } from "../../utils/extrinsics.js";
import WorkReportListItem from "../../components/home/lists/list-item/WorkReportListItem.js";
import { pluralize } from "../../utils/helper.js";
import Loading from "../../components/home/Loading.js";

export default function WorkReportListPage() {
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
        console.error("Error loading blocks from DB:", error);
      });
  }, []);

  useEffect(() => {
    const data = filterWorkReportBlocks(latestBlocks);
    setFilteredBlocks(data);
    setLoading(false);
  }, [latestBlocks]);

  if (loading) return <Loading />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, py:4 }} className="hasOwnMaxWidth">
      <Box sx={{ display: "flex-col", alignItems: "center", mb: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", fontSize: "28px" }}>
          All Work Reports List
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          There are {filteredBlocks.length}{" "}
          {pluralize(" report", filteredBlocks.length)} found in the page
        </Typography>
      </Box>
      <Paper variant="outlined">
        {filteredBlocks.map((blockItem) => (
          <WorkReportListItem
            key={blockItem?.overview?.headerHash}
            blockItem={blockItem}
          />
        ))}
      </Paper>
    </Container>
  );
}
