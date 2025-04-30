// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";
import {
  ItemMode,
  Segment,
  WorkPackage,
} from "../../components/jamitem/index.js";
import { LabeledRow } from "../../components/display/LabeledRow.js";
import Loading from "../../components/home/Loading.js";
import { DEFAULT_WS_URL } from "../../utils/helper.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import { fetchSegment } from "../../hooks/useFetchSegment.js";

export default function SegmentDetailPage() {
  const params = useParams();
  const hash = params.workPackageHash as string;
  const index = params.index as string;

  const [segmentData, setSegmentData] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreimage = async () => {
      const data = await fetchSegment(
        hash,
        Number.parseInt(index),
        getRpcUrlFromWs(DEFAULT_WS_URL)
      );
      setSegmentData(data || "0x___");
      setLoading(false);
    };

    fetchPreimage();
  }, [hash, index]);

  if (loading) return <Loading />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
      <Box sx={{ display: "inline-flex", alignItems: "center", mb: 2 }}>
        <Segment
          mode={ItemMode.Large}
          hash={hash}
          index={Number.parseInt(index)}
        />
      </Box>

      <Paper variant="outlined" sx={{ p: 3, marginBlock: 3 }}>
        <LabeledRow
          label="Work Package"
          tooltip="Work Package"
          icon="workpackage"
          value={
            <WorkPackage
              mode={ItemMode.Grid}
              hash={hash}
              report={null}
              timestamp={0}
            />
          }
        />
        <LabeledRow
          label="Index"
          tooltip="Segment Index"
          value={
            <Typography variant="body2" fontSize="16px" color="#444" pl="10px">
              {index}
            </Typography>
          }
        />
        <LabeledRow
          label="Data"
          tooltip="Segment Data"
          icon="segment"
          value={
            <Segment
              mode={ItemMode.Table}
              hash={hash}
              index={Number.parseInt(index)}
              data={segmentData}
            />
          }
        />
      </Paper>
    </Container>
  );
}
