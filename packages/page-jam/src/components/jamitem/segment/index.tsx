import React, { useState } from "react";
import { ItemMode } from "../index.js";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Check, ContentCopy } from "@mui/icons-material";
import { fallbackCopyTextToClipboard } from "../../../utils/clipboard.js";
import { SegmentIcon } from "../../Icons/index.js";
import {Link} from "react-router-dom";

interface SegmentProps {
  mode: ItemMode;
  hash: string;
  index: number;
  data?: string;
}

export function Segment(param: SegmentProps) {

  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(param.data || "0x___");
      } else {
        fallbackCopyTextToClipboard(param.data || "0x___");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const tableRender = (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      paddingLeft="10px"
      gap={0.5}
      sx={{
        cursor: "pointer",
        color: "#444444",
      }}
    >
      <Tooltip
        title={`Segment data : ${param.data || "0x___"}`}
        placement="top"
        arrow
      >
        <Typography variant="subtitle2" fontSize={"13px"}>
          {param.data || "0x___"}
        </Typography>
      </Tooltip>
      <Tooltip
        title={copied ? "Copied!" : "Copy segment data"}
        placement="top"
        arrow
      >
        <IconButton onClick={handleCopy}>
          {!copied ? (
            <ContentCopy
              sx={{ width: "12px", height: "12px", color: "#444444" }}
            />
          ) : (
            <Check sx={{ width: "12px", height: "12px", color: "#444444" }} />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
  const mediumRender = (
    <Tooltip title={`Segment index : ${param.index}`} placement="top" arrow>
      <Link
        to={`/segment/${param.hash}/${param.index}`}
        style={{
          width: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography variant="subtitle2" fontSize={"14px"}>
          {param.index}
        </Typography>
      </Link>
    </Tooltip>
  );
  const largeRender = (
    <Link
      to={`/segment/${param.hash}/${param.index}`}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={0.5}
        sx={{
          cursor: "pointer",
          width: "100%",
          height: "100%",
          transition: "all 0.3s ease-in-out",
          backgroundColor: "#ffffff",
          color: "#444444",
          ":hover": {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <SegmentIcon size={24} color={"#444"} />
        <Typography variant="subtitle2" fontSize={"32px"} fontWeight={"bold"}>
          Segment
        </Typography>
      </Box>
    </Link>
  );

  return (
    <>
      {param.mode === ItemMode.Table && tableRender}
      {param.mode === ItemMode.Medium && mediumRender}
      {param.mode === ItemMode.Large && largeRender}
    </>
  );
}
