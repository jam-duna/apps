"use client";

import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { LabeledRow } from "../../display/LabeledRow.js";
import { ServiceInfo } from "../../../types/index.js";
import { ItemMode, Preimage } from "../../jamitem/index.js";

interface ServiceInfoTableProps {
  serviceInfo: ServiceInfo;
  metadata: String;
}

export function ServiceInfoTable({
  serviceInfo,
  metadata,
}: ServiceInfoTableProps) {

  return (
    <Paper variant="outlined" sx={{ p: 2, marginBlock: 3 }}>
      <Typography variant="h6" mb={3} fontWeight={"bold"}>
        Service Info
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <LabeledRow
          label="Metadata:"
          tooltip="Metadata of service"
          value={metadata}
        />
        <LabeledRow
          label="Service ID:"
          tooltip="Service ID"
          value={serviceInfo.service_index}
        />
        <LabeledRow
          label="Balance:"
          tooltip="Account balance"
          value={serviceInfo.balance.toString()}
        />
        <LabeledRow
          label="Code Hash:"
          tooltip="Unique identifier for the service"
          value={
            <Preimage
              mode={ItemMode.Medium}
              hash={serviceInfo.code_hash}
              service={serviceInfo.service_index.toString()}
            />
          }
        />
        <LabeledRow
          label="Code Size:"
          tooltip="Code Size"
          value={serviceInfo.code_size.toString()}
        />
        <LabeledRow
          label="Min Item Gas:"
          tooltip="Minimum gas for items"
          value={serviceInfo.min_item_gas.toString()}
        />
        <LabeledRow
          label="Min Memo Gas:"
          tooltip="Minimum gas for memo"
          value={serviceInfo.min_memo_gas.toString()}
        />
        <LabeledRow
          label="Items:"
          tooltip="Number of items"
          value={serviceInfo.items.toString()}
        />
      </Box>
    </Paper>
  );
}
