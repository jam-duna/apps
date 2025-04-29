import React, { useState } from "react";
import { ItemMode } from "../index.js";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { getRelativeTime, truncateHash } from "../../../utils/helper.js";
import { Check, ContentCopy } from "@mui/icons-material";
import { Report, ServiceInfoDetail } from "../../../types/index.js";
import { Service } from "../service/index.js";
import { fallbackCopyTextToClipboard } from "../../../utils/clipboard.js";
import { WorkPackageIcon } from "../../Icons/index.js";
import {Link} from "react-router-dom";

interface WorkPackageProps {
  mode: ItemMode;
  hash: string;
  report: Report | null;
  timestamp: number;
  services?: ServiceInfoDetail[];
}

export function WorkPackage({
  mode,
  hash,
  report,
  timestamp = 0,
  services = [],
}: WorkPackageProps) {

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

  const getService = (name: number) => {
    let result: ServiceInfoDetail | undefined = undefined;
    services.forEach((service) => {
      if (service.service === name) {
        result = service;
      }
    });
    return result;
  };

  const gridRender = (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      gap="2px"
      sx={{
        cursor: "pointer",
        paddingInline: "10px",
        transition: "all 0.3s ease-in-out",
        color: "#444444",
        ":hover": {
          color: "#444444",
        },
      }}
    >
      <Tooltip title={`WorkPackageHash: ${hash}`} placement="top" arrow>
        <Link to={`/workpackage/${hash}`}>
          <Typography variant="subtitle2" fontSize="16px">
            {hash}
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
        <Link to={`/workpackage/${hash}`}>
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
      to={`/workpackage/${hash}/`}
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
            color: "#1b5e20",
            border: "1px solid #ddd",
            mr: 2,
          }}
        >
          <WorkPackageIcon size={24} color={"#1b5e20"} />
        </Box>

        {/* Middle: Report count and relative time */}
        <Box sx={{ flex: 1 }}>
          <Box
            display="flex"
            flexDirection="row"
            gap="2px"
            justifyContent="start"
            alignItems="center"
            marginLeft="-5px"
          >
            {report?.results.map((item, itemIndex) => {
              return (
                <Service
                  key={itemIndex}
                  mode={ItemMode.Small}
                  name={item.service_id.toString()}
                  service={getService(item.service_id)}
                />
              );
            })}
          </Box>
          <Typography variant="body2" color="textSecondary">
            {getRelativeTime(timestamp)} ago
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
            <Tooltip title={`WorkPackageHash: ${hash}`} placement="top" arrow>
              <Typography
                variant="subtitle2"
                fontSize="13px"
                sx={{
                  color: "#444444",
                  transition: "all 0.3s ease-in-out",
                  ":hover": {
                    color: "#1b5e20",
                  },
                }}
              >
                hash {truncateHash(hash, "long")}
              </Typography>
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
                  <Check
                    sx={{ width: "12px", height: "12px", color: "#444444" }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body2" fontSize="12px" color="#444444">
            exports count {report?.package_spec.exports_count}
          </Typography>
        </Box>
      </Box>
    </Link>
  );

  const largeRender = (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      gap="10px"
      sx={{
        cursor: "pointer",
        paddingInline: "5px",
        paddingBlock: "2px",
        transition: "all 0.3s ease-in-out",
        color: "#444444",
        ":hover": {
          color: "#444444",
        },
      }}
    >
      <WorkPackageIcon size={24} color={"#444"} />
      <Typography variant="subtitle2" fontSize="28px">
        Work Package
      </Typography>
      <Typography variant="subtitle2" fontSize="16px" mt={1}>
        {hash}
      </Typography>
    </Box>
  );

  return (
    <>
      {mode == ItemMode.Small && smallRender}
      {mode == ItemMode.Grid && gridRender}
      {mode == ItemMode.Medium && mediumRender}
      {mode == ItemMode.Large && largeRender}
    </>
  );
}