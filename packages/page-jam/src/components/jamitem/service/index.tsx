import React, { useEffect, useState } from "react";
import { ItemMode } from "../index.js";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Check, ContentCopy } from "@mui/icons-material";
import type { ServiceInfoDetail, ServiceStatistics } from "../../../types/index.js";
import {
  getServiceLastSeenTime,
} from "../../../utils/blockAnalyzer.js";
import { fallbackCopyTextToClipboard } from "../../../utils/clipboard.js";
import { ServiceIcon } from "../../Icons/index.js";
import {Link} from "react-router-dom";

interface ServiceProps {
  mode: ItemMode;
  name: string;
  service?: ServiceInfoDetail;
}

export function Service(param: ServiceProps) {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [lastTime, setLastTime] = useState("");
  const statistics: ServiceStatistics | null =
    param.service?.statistics || null;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(param.name);
      } else {
        fallbackCopyTextToClipboard(param.name);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    (async () => {
      const time = await getServiceLastSeenTime(Number.parseInt(param.name));
      setLastTime(time);
    })();
  }, [param.name]);

  const gridRender = (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      gap="2px"
      sx={{
        cursor: "pointer",
        paddingInline: "5px",
        transition: "all 0.3s ease-in-out",
        color: "#444444",
        ":hover": {
          color: "#311b92",
        },
      }}
    >
      <ServiceIcon size={16} color={"#311b92"} />
      <Tooltip title={`ServiceId: ${param.name}`} placement="top" arrow>
        <Typography
          variant="subtitle2"
          fontSize="12px"
          onClick={() => {
            navigate(`/service/${param.name}`);
          }}
        >
          {param.service === undefined
            ? param.name
            : param.service.metadata.length === 0
            ? param.name
            : param.service.metadata}
        </Typography>
      </Tooltip>
      <Tooltip
        title={copied ? "Copied!" : "Copy service id"}
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

  const tableRender = (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      gap="2px"
      sx={{
        cursor: "pointer",
        paddingInline: "5px",
        transition: "all 0.3s ease-in-out",
        color: "#444444",
        ":hover": {
          color: "#311b92",
        },
      }}
    >
      <Tooltip title={`ServiceId: ${param.name}`} placement="top" arrow>
        <Typography
          variant="subtitle2"
          fontSize="16px"
          onClick={() => {
            navigate(`/service/${param.name}`);
          }}
        >
          {param.service === undefined
            ? param.name
            : param.service?.metadata.length === 0
            ? param.name
            : param.service?.metadata}
        </Typography>
      </Tooltip>
      <Tooltip
        title={copied ? "Copied!" : "Copy service id"}
        placement="top"
        arrow
      >
        <IconButton onClick={handleCopy}>
          {!copied ? (
            <ContentCopy
              sx={{ width: "13px", height: "13px", color: "#444444" }}
            />
          ) : (
            <Check sx={{ width: "13px", height: "13px", color: "#444444" }} />
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
        transition: "all 0.3s ease-in-out",
        color: "#444444",
        ":hover": {
          color: "#311b92",
        },
      }}
    >
      <Tooltip title={`ServiceId: ${param.name}`} placement="top" arrow>
        <Typography
          variant="subtitle2"
          fontSize="12px"
          sx={{ maxWidth: "70px" }}
          onClick={() => {
            navigate(`/service/${param.name}`);
          }}
        >
          {param.service === undefined
            ? param.name
            : param.service?.metadata.length === 0
            ? param.name
            : param.service?.metadata}
        </Typography>
      </Tooltip>
      <Tooltip
        title={copied ? "Copied!" : "Copy service id"}
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
      key={param.name}
      to={`/service/${param.name}/`}
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
          <ServiceIcon size={20} color={"#311b92"} />
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
            <Tooltip title={`ServiceId: ${param.name}`} placement="top" arrow>
              <Typography
                variant="body2"
                color="#444444"
                fontSize="16px"
                ml="5px"
                sx={{
                  ":hover": {
                    color: "#311b92",
                  },
                }}
              >
                {param.service === undefined ||
                param.service.metadata.length === 0
                  ? param.name
                  : param.service.metadata + " (" + param.name + ")"}
              </Typography>
            </Tooltip>
          </Box>
          <Typography variant="body2" color="#444444">
            {lastTime}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="end"
          alignItems="center"
          gap="2px"
        >
          {!!statistics && statistics.provided_count !== 0 && (
            <Tooltip
              title={`Provided Count: ${statistics.provided_count}`}
              placement="top"
              arrow
            >
              <Typography
                variant="subtitle2"
                fontSize="12px"
                sx={{
                  color: "#444444",
                  backgroundColor: "#00000030",
                  paddingInline: "2px",
                  borderRadius: "4px",
                  paddingTop: "2px",
                }}
              >
                PC-{statistics?.provided_count}
              </Typography>
            </Tooltip>
          )}
          {!!statistics && statistics.exports !== 0 && (
            <Tooltip
              title={`Exports: ${statistics.exports}`}
              placement="top"
              arrow
            >
              <Typography
                variant="subtitle2"
                fontSize="12px"
                sx={{
                  color: "#444444",
                  backgroundColor: "#00000030",
                  paddingInline: "2px",
                  borderRadius: "4px",
                  paddingTop: "2px",
                }}
              >
                ES-{statistics?.exports}
              </Typography>
            </Tooltip>
          )}
          {!!statistics && statistics.extrinsic_count !== 0 && (
            <Tooltip
              title={`Extrinsic Count: ${statistics.extrinsic_count}`}
              placement="top"
              arrow
            >
              <Typography
                variant="subtitle2"
                fontSize="12px"
                sx={{
                  color: "#444444",
                  backgroundColor: "#00000030",
                  paddingInline: "2px",
                  borderRadius: "4px",
                  paddingTop: "2px",
                }}
              >
                EC-{statistics?.extrinsic_count}
              </Typography>
            </Tooltip>
          )}
          {!!statistics && statistics.accumulate_count !== 0 && (
            <Tooltip
              title={`Accumulate Count: ${statistics.accumulate_count}`}
              placement="top"
              arrow
            >
              <Typography
                variant="subtitle2"
                fontSize="12px"
                sx={{
                  color: "#444444",
                  backgroundColor: "#00000030",
                  paddingInline: "2px",
                  borderRadius: "4px",
                  paddingTop: "2px",
                }}
              >
                AC-{statistics?.accumulate_count}
              </Typography>
            </Tooltip>
          )}
          {!!statistics && statistics.on_transfers_count !== 0 && (
            <Tooltip
              title={`Transfers Count: ${statistics.on_transfers_count}`}
              placement="top"
              arrow
            >
              <Typography
                variant="subtitle2"
                fontSize="12px"
                sx={{
                  color: "#444444",
                  backgroundColor: "#00000030",
                  paddingInline: "2px",
                  borderRadius: "4px",
                  paddingTop: "2px",
                }}
              >
                TC-{statistics?.on_transfers_count}
              </Typography>
            </Tooltip>
          )}
        </Box>
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
      <ServiceIcon size={24} color={"#444"} />
      <Typography variant="subtitle2" fontSize="32px">
        Service
      </Typography>
      <Typography variant="subtitle2" fontSize="24px" mt={1}>
        {param.name}
      </Typography>
    </Box>
  );

  return (
    <>
      {param.mode === ItemMode.Grid && gridRender}
      {param.mode === ItemMode.Small && smallRender}
      {param.mode === ItemMode.Medium && mediumRender}
      {param.mode === ItemMode.Large && largeRender}
      {param.mode === ItemMode.Table && tableRender}
    </>
  );
}
