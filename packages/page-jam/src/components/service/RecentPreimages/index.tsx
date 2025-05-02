"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material"; // Report icon
import { getRelativeTime, truncateHash } from "../../../utils/helper.js";
import { PreimageProps } from "../../../utils/blockAnalyzer.js";
import { Check, ContentCopy } from "@mui/icons-material";
import { calculateHash } from "../../../utils/blake2.js";
import { fallbackCopyTextToClipboard } from "../../../utils/clipboard.js";
import { PreimageIcon } from "../../Icons/index.js";

function PreimageListItem(data: PreimageProps) {
  const createdAt = data.timestamp;
  const preimageHash = calculateHash(data.preimage.blob);
  const preimageSize = (data.preimage.blob.length - 2) / 2;

  const [copied, setCopied] = useState(false);
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(preimageHash);
      } else {
        fallbackCopyTextToClipboard(preimageHash);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Link
      key={preimageHash}
      to={`/preimages/${preimageHash}/${preimageSize}`}
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
          <PreimageIcon size={20} color={"#311b92c0"} />
        </Box>

        {/* Middle: Report count and relative time */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1">
            requester {data.preimage.requester}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {getRelativeTime(createdAt)} ago
          </Typography>
        </Box>

        {/* Right: truncated header hash */}
        <Box sx={{ textAlign: "right" }}>
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
              sx={{
                color: "#444444",
                textDecoration: "none",
                transition: "all 0.3s ease-in-out",
                ":hover": {
                  color: "#311b92c0",
                },
              }}
            >
              hash {truncateHash(preimageHash, "long")}
            </Typography>
            <Tooltip
              title={copied ? "Copied!" : "Copy workpackage hash"}
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
          <Typography variant="body2" color="textSecondary">
            {preimageSize} bytes
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

interface RecentPreimagesProps {
  preimages: PreimageProps[];
}

export function RecentPreimages(data: RecentPreimagesProps) {
  const displayPreimgs = data.preimages.slice(0, 8);

  return (
    <Paper variant="outlined">
      <Typography
        variant="h6"
        sx={{ mb: 2, px: 1.5, py: 2, borderBottom: "1px solid #ccc", m: 0 }}
      >
        Recent Preimages
      </Typography>

      {displayPreimgs && displayPreimgs.length > 0 ? (
        displayPreimgs.map((preimg, preimgIndex) => {
          return <PreimageListItem key={preimgIndex} {...preimg} />;
        })
      ) : (
        <Typography
          variant="subtitle2"
          sx={{ p: 2, "&:hover": { backgroundColor: "#f9f9f9" } }}
        >
          No recent preimages
        </Typography>
      )}
    </Paper>
  );
}
