// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import { Check, ContentCopy } from "@mui/icons-material";
import DetailToggleButtons from "../../components/block/DetailToggleButtons.js";
import { BlockTab } from "../../components/block/tabs/BlockTab.js";
import { StateTab } from "../../components/block/tabs/StateTab.js";
import { useBlockOverview } from "../../hooks/useBlockOverview.js";
import { BlockIcon } from "../../components/Icons/index.js";
import { fetchTraceBlock } from "../../hooks/useFetchTraceBlock.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import { fallbackCopyTextToClipboard } from "../../utils/clipboard.js";

export default function BlockOverviewPage() {
  const params = useParams();
  const headerHash = params.headerhash as string;
  const [searchParams, setSearchParams] = useSearchParams();
  const queryType = searchParams.get("type") as "hash" | "slot";

  const { blockRecord, stateRecord, prevHash, nextHash } = useBlockOverview(
    headerHash,
    queryType
  );

  const [selectedTab, setSelectedTab] = useState<"block" | "state">("block");

  const [traceData, setTraceData] = useState<any[] | null>(null);
  const fetchTrace = async () => {
    const data = await fetchTraceBlock(
      headerHash,
      getRpcUrlFromWs(localStorage.getItem("jamUrl") || "dot-0.jamduna.org")
    );
    setTraceData(data);
  };

  const [copied, setCopied] = useState(false);
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(JSON.stringify(traceData));
      } else {
        fallbackCopyTextToClipboard(JSON.stringify(traceData));
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!blockRecord) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
        <Box sx={{ display: "inline-flex", alignItems: "center", mb: 5 }}>
          <BlockIcon size={24} color={"#555"} />
          <Typography variant="h2" sx={{ fontWeight: "bold", fontSize:"32px" }}>
            Block Details
          </Typography>
        </Box>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="body1">Loading block details...</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
      <Box
        sx={{ display: "inline-flex", gap: "5px", alignItems: "center", mb: 5 }}
      >
        <BlockIcon size={24} color={"#555"} />
        <Typography variant="h2" sx={{ fontWeight: "bold", fontSize:"32px" }}>
          Block
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "20px", marginTop: "6px" }}>
          {blockRecord.header.slot}
        </Typography>
      </Box>

      <DetailToggleButtons
        selectedTab={selectedTab}
        onTabChange={(tab) => setSelectedTab(tab)}
      />

      {selectedTab === "block" && (
        <BlockTab
          blockRecord={blockRecord}
          hash={headerHash}
          type={queryType}
          prevHash={prevHash}
          nextHash={nextHash}
        />
      )}

      {selectedTab === "state" && stateRecord && (
        <StateTab stateRecord={stateRecord} />
      )}

      {selectedTab === "state" && !stateRecord && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="body2">No state data available.</Typography>
        </Paper>
      )}

      <Paper variant="outlined" sx={{ p: 3, marginBlock: 3 }}>
        <Button variant="contained" onClick={fetchTrace}>
          Trace Block
        </Button>

        {traceData !== null && (
          <Box sx={{ maxWidth: "100%", margin: "0 auto", p: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
              sx={{ position: "relative" }}
            >
              <Typography variant="h6">Trace Block Result</Typography>
              <Tooltip
                title={copied ? "Copied!" : "Copy"}
                placement="top"
                arrow
              >
                <IconButton
                  onClick={handleCopy}
                  sx={{
                    position: "absolute",
                    border: "1px solid #888",
                    borderRadius: "4px",
                    p: "6px",
                    right: "6px",
                    top: "6px",
                  }}
                >
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
            <TextField
              multiline
              fullWidth
              maxRows={15}
              variant="outlined"
              value={JSON.stringify(traceData, null, 2)}
              InputProps={{ readOnly: true }}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
}
