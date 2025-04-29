"use client";

import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { LabeledRow } from "../../display/LabeledRow.js";
import ExtrinsicAccordion from "../../extrinsic/ExtrinsicAccordion.js";
import MoreDetailsAccordion from "../MoreDetailsAccordion.js";
import BlockNavigationButtons from "../BlockNavigationButtons.js";
import { basicInfoMapping } from "../../../utils/tooltipDetails.js";
import { useNavigate } from "react-router-dom";
import { pluralize } from "../../../utils/helper.js";
import { Block } from "../../../db/db.js";
import { Hash } from "../../jamitem/index.js";
import { Link } from "react-router-dom";

interface BlockTabProps {
  blockRecord: Block; // Use your actual BlockRecord type here.
  hash: string;
  type: string;
  prevHash: string | null;
  nextHash: string | null;
}

export function BlockTab({
  blockRecord,
  hash,
  type,
  prevHash,
  nextHash,
}: BlockTabProps) {
  const navigate = useNavigate();
  const header = blockRecord.header;
  const extrinsic = blockRecord.extrinsic;
  const headerHash = blockRecord.header_hash;
  const blockHash = blockRecord?.overview?.blockHash;
  const createdAt = Number.parseInt(blockRecord.timestamp);
  const finalized = blockRecord?.overview?.finalized;

  return (
    <>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <LabeledRow
            label={basicInfoMapping.blockHeight.label}
            tooltip={basicInfoMapping.blockHeight.tooltip}
            value={
              <Typography variant="body1">{blockRecord.header.slot}</Typography>
            }
          />
          {type === "headerHash" && (
            <BlockNavigationButtons
              prevHash={prevHash}
              nextHash={nextHash}
              onPrev={() => {
                if (prevHash) navigate(`/block/${prevHash}?type=hash`);
              }}
              onNext={() => {
                if (nextHash) navigate(`/block/${nextHash}?type=hash`);
              }}
            />
          )}
        </Box>

        <LabeledRow
          label="Finalized"
          tooltip="Block Finalized"
          value={
            <Typography variant="body1">
              {(finalized || false).toString()}
            </Typography>
          }
        />

        {blockHash && (
          <LabeledRow
            label={basicInfoMapping.blockHash.label}
            tooltip={basicInfoMapping.blockHash.tooltip}
            value={<Hash hash={blockHash} />}
          />
        )}

        {headerHash && (
          <LabeledRow
            label={basicInfoMapping.headerHash.label}
            tooltip={basicInfoMapping.headerHash.tooltip}
            value={<Hash hash={headerHash} />}
          />
        )}

        {createdAt && (
          <LabeledRow
            label={basicInfoMapping.createdDate.label}
            tooltip={basicInfoMapping.createdDate.tooltip}
            icon="slot"
            value={
              <Typography variant="body1">
                {new Date(createdAt * 1000).toLocaleString()}
              </Typography>
            }
          />
        )}

        <LabeledRow
          label={basicInfoMapping.authorIndex.label}
          tooltip={basicInfoMapping.authorIndex.tooltip}
          icon="author"
          value={
            <Link to={`/validator/${header.author_index}/${hash}`}>
              <Typography variant="body1">{header.author_index}</Typography>
            </Link>
          }
        />

        <LabeledRow
          label={basicInfoMapping.workReport.label}
          tooltip={basicInfoMapping.workReport.tooltip}
          icon="work_report"
          value={
            <Typography
              variant="body1"
              sx={{
                textDecoration: "underline",
                color: "#1976d2",
                textDecorationColor: "#1976d2",
              }}
            >
              {extrinsic.guarantees?.length ? (
                <Link to={`/block/${headerHash}/workReport`}>
                  {extrinsic.guarantees.length}
                  {pluralize(" report", extrinsic.guarantees.length)} in this
                  block
                </Link>
              ) : (
                "0 report in this block"
              )}
            </Typography>
          }
        />

        <ExtrinsicAccordion extrinsic={extrinsic || null} headerHash={hash} />
      </Paper>
      <MoreDetailsAccordion header={header} />
    </>
  );
}
