// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Report } from "../../types/index.js";
import {fetchAuditWorkPackage} from "../../hooks/useFetchAuditWorkpackage.js";
import {fetchWorkPackage} from "../../hooks/useFetchWorkpackage.js";
import {useSubscribeWorkpackage} from "../../hooks/subscribeWorkpackage.js";
import { DEFAULT_WS_URL } from "../../utils/helper.js";
import { LabeledRow } from "../../components/display/LabeledRow.js";
import { githubLightTheme, JsonEditor } from "json-edit-react";
import {
  Core,
  ItemMode,
  Segment,
  Service,
  WorkPackage,
} from "../../components/jamitem/index.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import { Check, ContentCopy } from "@mui/icons-material";
import { fallbackCopyTextToClipboard } from "../../utils/clipboard.js";
import { Link } from "react-router-dom";
import Loading from "../../components/home/Loading.js";

export default function WorkPackageDetailPage() {
  const params = useParams();
  const workPackageHash = params.workPackageHash as string;

  const [workPackageStatus, setWorkPackageStatus] = useState<string>("-");
  const [auditData, setAuditData] = useState<any[] | null>(null);
  const [workPackageInfo, setWorkPackageInfo] =
    useState<Report | null>(null);
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(JSON.stringify(auditData));
      } else {
        fallbackCopyTextToClipboard(JSON.stringify(auditData));
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await fetchWorkPackage(
        workPackageHash,
        getRpcUrlFromWs(DEFAULT_WS_URL)
      );
      if (!!data) {
        setWorkPackageInfo(data);
      }
    })();
  }, [workPackageHash]);

  const fetchAudit = async () => {
    const data = await fetchAuditWorkPackage(
      workPackageHash,
      getRpcUrlFromWs(DEFAULT_WS_URL)
    );
    setAuditData(data);
  };

  useSubscribeWorkpackage({
    endpoint: DEFAULT_WS_URL,
    hash: workPackageHash,
    setStatus: (status: string) => {
      setWorkPackageStatus(status);
    },
  });

  if (!workPackageInfo) return <Loading />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
      <Box sx={{ display: "inline-flex", alignItems: "center", mb: 4 }}>
        <WorkPackage
          mode={ItemMode.Large}
          hash={workPackageHash}
          report={null}
          timestamp={0}
        />
      </Box>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <LabeledRow
          label="Core"
          tooltip="Core Index"
          icon="core"
          value={
            <Core mode={ItemMode.Medium} index={workPackageInfo.core_index} />
          }
        />
        <LabeledRow
          label="Services"
          tooltip="Services Used"
          icon="service"
          value={
            <Box display="flex" gap={2}>
              {workPackageInfo.results.map((item, itemIndex) => (
                <Service
                  key={itemIndex}
                  mode={ItemMode.Table}
                  name={item.service_id.toString()}
                />
              ))}
            </Box>
          }
        />
        <LabeledRow
          label="Status"
          tooltip="Workpackage Status"
          icon="status"
          value={<Typography marginLeft="5px">{workPackageStatus}</Typography>}
        />
        {workPackageInfo.context.prerequisites !== undefined &&
          workPackageInfo.context.prerequisites.length > 0 && (
            <LabeledRow
              label="Prereqs"
              tooltip="prerequisites"
              icon="workpackage"
              value={workPackageInfo.context.prerequisites.map(
                (item, itemIndex) => (
                  <WorkPackage
                    key={itemIndex}
                    mode={ItemMode.Grid}
                    hash={item}
                    report={null}
                    timestamp={0}
                  />
                )
              )}
            />
          )}
        <LabeledRow
          label="Availability"
          tooltip="Availability Spec"
          icon="availability"
          mti="8px"
          mtl="12px"
          value={
            <JsonEditor
              data={workPackageInfo.package_spec}
              rootName=""
              viewOnly={true}
              collapse={false}
              theme={githubLightTheme}
              minWidth={"100%"}
              rootFontSize={"13px"}
              showCollectionCount="when-closed"
            />
          }
        />
        <LabeledRow
          label="Refinement"
          tooltip="Refinement Context"
          icon="refine"
          mti="8px"
          mtl="12px"
          value={
            <JsonEditor
              data={workPackageInfo.context}
              rootName=""
              viewOnly={true}
              collapse={false}
              theme={githubLightTheme}
              minWidth={"100%"}
              rootFontSize={"13px"}
              showCollectionCount="when-closed"
            />
          }
        />
        <LabeledRow
          label="Results"
          tooltip="Results"
          icon="work_results"
          mti="8px"
          mtl="12px"
          value={
            <Box display="flex" flexDirection="column">
              {workPackageInfo.results.map((item, itemIndex) => (
                <JsonEditor
                  data={item}
                  key={itemIndex}
                  rootName={`Work Item ${itemIndex + 1}`}
                  viewOnly={true}
                  collapse={true}
                  theme={githubLightTheme}
                  minWidth={"100%"}
                  rootFontSize={"13px"}
                  showCollectionCount="when-closed"
                />
              ))}
            </Box>
          }
        />
        <LabeledRow
          label="Segments"
          tooltip="Segment results"
          icon="segment"
          value={
            <Box display="flex" flexWrap="wrap">
              {Array.from(
                { length: workPackageInfo.package_spec.exports_count },
                (_, i) => i
              ).map((item, itemIndex) => (
                <Segment
                  key={itemIndex}
                  mode={ItemMode.Medium}
                  hash={workPackageHash}
                  index={itemIndex}
                />
              ))}

              {workPackageInfo.package_spec.exports_count === 9 && (
                <Link
                  to={`/jam/game-of-life-viwer?hash=${workPackageHash}`}
                >
                  <Typography
                    sx={{
                      ml: 1,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Game of Life Viewer
                  </Typography>
                </Link>
              )}
            </Box>
          }
        />
        <LabeledRow label="Dependents" tooltip="Dependents" value=" TODO" />
      </Paper>
      <Paper variant="outlined" sx={{ p: 3, marginBlock: 3 }}>
        <Button variant="contained" onClick={fetchAudit}>
          Audit Work Package
        </Button>

        {auditData !== null && (
          <Box sx={{ maxWidth: "100%", margin: "0 auto", p: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
              sx={{ position: "relative" }}
            >
              <Typography variant="h6">Audit Workpackage Result</Typography>
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
              value={JSON.stringify(auditData, null, 2)}
              InputProps={{ readOnly: true }}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
}
