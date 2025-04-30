import React, { useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Check, ContentCopy } from "@mui/icons-material";
import type { ValidatorShowCase } from "../../../../types/index.js";
import { fallbackCopyTextToClipboard } from "../../../../utils/clipboard.js";
import { ValidatorIcon } from "../../../Icons/index.js";
import { formatDate, truncateHash } from "../../../../utils/helper.js";
import { ItemMode } from "../../index.js";
import {Link} from "react-router-dom";

interface ValidatorProps {
  mode: string;
  validator: ValidatorShowCase;
}

export function Validator(param: ValidatorProps) {

  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(param.validator.hash);
      } else {
        fallbackCopyTextToClipboard(param.validator.hash);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const mediumRender = (
    <Link
      key={param.validator.index}
      to={`/jam/validator/${param.validator.index}/${param.validator.hash}`}
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
            color: "#311b92",
            border: "1px solid #ddd",
            mr: 2,
          }}
        >
          <ValidatorIcon size={20} color={"#31927b"} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box
            display="flex"
            flexDirection="row"
            gap="2px"
            justifyContent="start"
            alignItems="center"
            marginLeft="-5px"
          >
            <Tooltip
              title={`Validator Index: ${param.validator.index}`}
              placement="top"
              arrow
            >
              <Typography
                variant="body2"
                color="#444444"
                fontSize="16px"
                ml="5px"
                sx={{
                  ":hover": {
                    color: "#31927b",
                  },
                }}
              >
                Validator {param.validator.index}
              </Typography>
            </Tooltip>
          </Box>
          <Typography variant="body2" color="#444444">
            {formatDate(param.validator.lastSeenTime, "short")}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
            marginRight="-5px"
          >
            <Tooltip
              title={`Headerhash: ${param.validator.hash}`}
              placement="top"
              arrow
            >
              <Typography
                variant="subtitle2"
                fontSize="13px"
                sx={{
                  color: "#444444",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                hash {truncateHash(param.validator.hash, "long")}
              </Typography>
            </Tooltip>
            <Tooltip
              title={copied ? "Copied!" : "Copy headerhash"}
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
        </Box>
      </Box>
    </Link>
  );

  return <>{param.mode === ItemMode.Medium && mediumRender}</>;
}
