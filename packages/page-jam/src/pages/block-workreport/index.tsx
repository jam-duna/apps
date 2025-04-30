// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Paper, Typography, Divider, Box } from "@mui/material";
import { LabeledRow } from "../../components/display/LabeledRow.js"; // adjust the import path as needed
import { Block } from "../../db/db.js";
import { Guarantee } from "../../types/index.js";
import { workReportMapping } from "../../utils/tooltipDetails.js"; // Import the new mapping bundle
import { useWorkReportStatuses } from "../../hooks/useWorkReportStatuses.js";
import { WorkReportIcon } from "../../components/Icons/index.js";
import { Hash } from "../../components/jamitem/index.js";
import { fetchBlock } from "../../hooks/useFetchBlock.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import { DEFAULT_WS_URL } from "../../utils/helper.js";

export default function WorkReportDetailPage() {
  const params = useParams();
  const headerHash = params.headerhash as string;
  const workReportHash = params.workPackageHash as string;

  const [workReport, setWorkReport] = useState<Guarantee | null>(null);
  const [blockRecord, setBlockRecord] = useState<Block | null>(null);

  // Fetch block record (to extract current slot) based on headerHash.
  useEffect(() => {
    if (headerHash) {
      const prepareData = async () => {
        const data = await fetchBlock(
          headerHash,
          getRpcUrlFromWs(DEFAULT_WS_URL),
          "hash"
        );
        setBlockRecord(data);
      };

      prepareData();
    }
  }, [headerHash]);

  // Fetch the work report from the current block's guarantees.
  useEffect(() => {
    if (headerHash && workReportHash) {
      if (blockRecord && blockRecord.header && blockRecord.extrinsic) {
        const reports = blockRecord.extrinsic.guarantees || [];
        const found = reports.find(
          (r: Guarantee) => r.report.package_spec.hash === workReportHash
        );
        setWorkReport(found ?? null);
      }
    }
  }, [blockRecord]);

  // Use the custom hook to get the status for the single work report.
  // const reportHash = workReport?.report?.package_spec?.hash;
  const reportHashArray = useMemo(
    () => (workReportHash ? [workReportHash] : []),
    [workReportHash]
  );
  const currentSlot = blockRecord?.overview?.slot || 0;
  const statuses = useWorkReportStatuses(reportHashArray, currentSlot);

  if (!workReport) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
        <Paper sx={{ p: 3 }}>
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, fontSize: "32px" }}>
            Work Report Details
          </Typography>
          <Typography variant="body1">
            Loading work report details...
          </Typography>
        </Paper>
      </Container>
    );
  }

  // Destructure fields from the work report.
  const { report, slot, signatures } = workReport;
  const { package_spec, context, core_index, authorizer_hash, auth_output } =
    report;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        gap={0.5}
        sx={{
          cursor: "pointer",
          width: "100%",
          height: "100%",
          color: "#444444",
          my: "10px",
        }}
      >
        <WorkReportIcon size={24} color="#555" />
        <Typography variant="subtitle2" fontSize={"32px"} fontWeight={"bold"}>
          Work Report Details
        </Typography>
      </Box>
      <Paper variant="outlined" sx={{ p: 3 }}>
        {/* SECTION 1: Basic Info */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Basic Info
        </Typography>
        {workReportMapping.basicInfo.map((item, idx) => (
          <LabeledRow
            key={idx}
            label={item.label}
            tooltip={item.tooltip}
            value={
              item.label === "Header Hash:" ? (
                <Link
                  to={`/jam/block/${headerHash}?type=hash`}
                >
                  <Hash hash={headerHash} />
                </Link>
              ) : item.label === "Slot:" ? (
                slot ?? "N/A"
              ) : item.label === "Core Index:" ? (
                core_index ?? "N/A"
              ) : item.label === "Report Status:" ? (
                statuses[package_spec.hash] || "N/A"
              ) : (
                package_spec.hash
              )
            }
          />
        ))}
        <Divider sx={{ my: 2 }} />

        {/* SECTION 2: Package Spec */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Package Spec
        </Typography>
        {workReportMapping.packageSpec.map((item, idx) => (
          <LabeledRow
            key={idx}
            label={item.label}
            tooltip={item.tooltip}
            value={
              item.label === "Length:" ? (
                package_spec.length ?? "N/A"
              ) : item.label === "Erasure Root:" ? (
                <Hash hash={package_spec.erasure_root}></Hash>
              ) : item.label === "Exports Root:" ? (
                <Hash hash={package_spec.exports_root}></Hash>
              ) : item.label === "Exports Count:" ? (
                package_spec.exports_count
              ) : (
                <Hash hash={package_spec.hash}></Hash>
              )
            }
          />
        ))}
        <Divider sx={{ my: 2 }} />

        {/* SECTION 3: Context */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Context
        </Typography>
        {workReportMapping.context.map((item, idx) => (
          <LabeledRow
            key={idx}
            label={item.label}
            tooltip={item.tooltip}
            value={
              item.label === "Anchor:" ? (
                <Hash hash={context.anchor}></Hash>
              ) : item.label === "State Root:" ? (
                <Hash hash={context.state_root}></Hash>
              ) : item.label === "Beefy Root:" ? (
                <Hash hash={context.beefy_root}></Hash>
              ) : item.label === "Lookup Anchor:" ? (
                <Hash hash={context.lookup_anchor}></Hash>
              ) : item.label === "Lookup Anchor Slot:" ? (
                context.lookup_anchor_slot
              ) : item.label === "Prerequisites:" ? (
                context.prerequisites && context.prerequisites.length > 0 ? (
                  context.prerequisites.map((p: string, idx: number) => (
                    <Hash key={idx} hash={p}></Hash>
                  ))
                ) : (
                  "None"
                )
              ) : (
                "N/A"
              )
            }
          />
        ))}
        <Divider sx={{ my: 2 }} />

        {/* SECTION 4: Authorization */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Authorization
        </Typography>
        {workReportMapping.authorization.map((item, idx) => (
          <LabeledRow
            key={idx}
            label={item.label}
            tooltip={item.tooltip}
            value={
              item.label === "Authorizer Hash:" ? (
                <Hash hash={authorizer_hash}></Hash>
              ) : item.label === "Auth Output:" ? (
                auth_output || "0x"
              ) : (
                "N/A"
              )
            }
          />
        ))}
        <Divider sx={{ my: 2 }} />

        {/* SECTION 5: Signatures */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Signatures
        </Typography>
        {signatures && signatures.length > 0 ? (
          signatures.map(
            (
              sig: { validator_index: number; signature: string },
              idx: number
            ) => (
              <LabeledRow
                key={idx}
                icon="validator"
                label={`Validator ${sig.validator_index}:`}
                tooltip="Validator signature for this work report."
                value={<Hash hash={sig.signature}></Hash>}
              />
            )
          )
        ) : (
          <Typography>No signatures found.</Typography>
        )}
      </Paper>
    </Container>
  );
}
