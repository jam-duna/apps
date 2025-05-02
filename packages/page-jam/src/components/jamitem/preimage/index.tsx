import React, { useState } from "react";
import { ItemMode } from "../index.js";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { truncateHash } from "../../../utils/helper.js";
import { Check, ContentCopy } from "@mui/icons-material";
import { fallbackCopyTextToClipboard } from "../../../utils/clipboard.js";
import { PreimageIcon, WorkPackageIcon } from "../../Icons/index.js";
import {Link} from "react-router-dom";

interface PreimageProps {
  mode: ItemMode;
  hash: string;
  service: string;
}

export function Preimage({ mode, hash, service }: PreimageProps) {

  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(hash);
      } else {
        fallbackCopyTextToClipboard(hash);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const smallRender = (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      gap="2px"
      sx={{
        cursor: "pointer",
        paddingInline: "5px",
        paddingBlock: "2px",
        transition: "all 0.3s ease-in-out",
        color: "#444444",
        ":hover": {
          color: "#1b5e20",
        },
      }}
    >
      <WorkPackageIcon size={16} color={"#1b5e20"} />
      <Tooltip title={`WorkPackageHash: ${hash}`} placement="top" arrow>
        <Link to={`/jam/workpackage/${hash}`}>
          <Typography variant="subtitle2" fontSize="12px">
            {truncateHash(hash, "short")}
          </Typography>
        </Link>
      </Tooltip>
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
            <Check sx={{ width: "12px", height: "12px", color: "#444444" }} />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );

  const mediumRender = (
    <Link
      key={hash}
      to={`/jam/preimage/${service}/${hash}/`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        gap="2px"
        sx={{
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          color: "#444444",
          textDecoration: "none",
          ":hover": {
            color: "#311b92c0",
            textDecoration: "underline",
          },
        }}
      >
        <Tooltip
          title={`Link to: /jam/preimage/${service}/${hash}/`}
          placement="top"
          arrow
        >
          <Typography variant="subtitle2" fontSize="15px">
            {hash}
          </Typography>
        </Tooltip>
        <Tooltip
          title={copied ? "Copied!" : "Copy preimage hash"}
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
    </Link>
  );

  const largeRender = (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      gap="5px"
      sx={{
        cursor: "pointer",
        paddingInline: "5px",
        transition: "all 0.3s ease-in-out",
        color: "#444444",
      }}
    >
      <PreimageIcon size={24} color={"#444"} />
      <Typography variant="subtitle2" fontSize="32px">
        Preimage
      </Typography>
    </Box>
  );

  return (
    <>
      {mode == ItemMode.Small && smallRender}
      {mode == ItemMode.Medium && mediumRender}
      {mode == ItemMode.Large && largeRender}
    </>
  );
}
