// src/components/BlockListItem.tsx

"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Block } from "../../../../db/db.js";
import { truncateHash, getRelativeTime } from "../../../../utils/helper.js";
import { Check, ContentCopy } from "@mui/icons-material";
import { ExtrA, ExtrD, ExtrG, ExtrP, ExtrT } from "../../../jamitem/index.js";
import { calculateExtrinsicCounts } from "../../../../utils/extrinsics.js";
import { fallbackCopyTextToClipboard } from "../../../../utils/clipboard.js";
import { BlockIcon, SlotIcon } from "../../../Icons/index.js";

export interface BlockListItemProps {
  blockItem: Block;
}

export default function BlockListItem({ blockItem }: BlockListItemProps) {
  const slot = blockItem.header.slot;
  const createdAt = blockItem?.overview?.createdAt;
  const relativeTime = createdAt ? getRelativeTime(createdAt) : "N/A";
  const headerHash = blockItem?.overview?.headerHash || "";
  const shortHash = truncateHash(headerHash, "long");

  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(headerHash);
      } else {
        fallbackCopyTextToClipboard(headerHash);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Link
      key={headerHash}
      to={`/jam/block/${headerHash}?type=hash`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1.5,
          borderRadius: 1,
          transition: "background-color 0.2s",
          "&:hover": { backgroundColor: "#f9f9f9" },
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* Left icon */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            mr: 2,
          }}
        >
          <BlockIcon size={16} color={"#224444D0"} />
        </Box>

        {/* Middle: Slot info */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "5px",
            }}
          >
            <SlotIcon size={16} color={"#444"} />
            <Typography variant="subtitle1">Slot {slot}</Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            {relativeTime} ago
          </Typography>
        </Box>

        {/* Right: truncated block hash */}
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
            gap="2px"
            marginRight="-5px"
          >
            <Typography
              variant="body2"
              fontSize="13px"
              sx={{ color: "#444444" }}
            >
              hash
            </Typography>
            <Tooltip
              title={`Block header_hash: ${headerHash}`}
              placement="top"
              arrow
            >
              <Typography
                variant="body2"
                fontSize="13px"
                sx={{ color: "#444444" }}
              >
                {shortHash}
              </Typography>
            </Tooltip>
            <Tooltip
              title={copied ? "Copied!" : "Copy block header_hash"}
              placement="top"
              arrow
            >
              <IconButton onClick={handleCopy}>
                {!copied ? (
                  <ContentCopy
                    sx={{ width: "12px", height: "12px", color: "#444444" }}
                  />
                ) : (
                  <Check
                    sx={{ width: "12px", height: "12px", color: "#444444" }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
            gap="2px"
          >
            {calculateExtrinsicCounts(blockItem.extrinsic).guaranteesCount >
              0 && (
              <ExtrG
                mode="tiny"
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).guaranteesCount
                }
              />
            )}
            {calculateExtrinsicCounts(blockItem.extrinsic).assurancesCount >
              0 && (
              <ExtrA
                mode="tiny"
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).assurancesCount
                }
              />
            )}
            {calculateExtrinsicCounts(blockItem.extrinsic).ticketsCount > 0 && (
              <ExtrT
                mode="tiny"
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).ticketsCount
                }
              />
            )}
            {calculateExtrinsicCounts(blockItem.extrinsic).disputesCount >
              0 && (
              <ExtrD
                mode="tiny"
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).disputesCount
                }
              />
            )}
            {calculateExtrinsicCounts(blockItem.extrinsic).preimagesCount >
              0 && (
              <ExtrP
                mode="tiny"
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).preimagesCount
                }
              />
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
