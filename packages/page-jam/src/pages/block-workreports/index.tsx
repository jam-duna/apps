// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import {useNavigate} from "react-router";
import { useParams, Link } from "react-router-dom";
import { Block } from "../../db/db.js";
import { Guarantee } from "../../types/index.js";
import { useWorkReportStatuses } from "../../hooks/useWorkReportStatuses.js";
import { fetchBlock } from "../../hooks/useFetchBlock.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import { pluralize, truncateHash } from "../../utils/helper.js";

export default function BlockWorkReportsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const headerHash = params.headerhash as string;

  const [workReports, setWorkReports] = useState<Guarantee[]>([]);
  const [blockRecord, setBlockRecord] = useState<Block | null>(null);

  // Fetch work reports from the block record.
  useEffect(() => {
    if (headerHash) {
      const prepareData = async () => {
        const data = await fetchBlock(
          headerHash,
          getRpcUrlFromWs(localStorage.getItem("jamUrl") || "dot-0.jamduna.org"),
          "hash"
        );
        setBlockRecord(data);
        const reports = data?.extrinsic.guarantees || [];
        setWorkReports(reports);
      };

      prepareData();
    }
  }, [headerHash]);

  // Prepare list of report package_spec hashes.
  const reportHashes = workReports.map(
    (reportData) => reportData.report.package_spec.hash
  );

  // Use custom hook to get statuses based on the current block slot.
  const currentSlot = blockRecord?.header.slot || 0;
  const statuses = useWorkReportStatuses(reportHashes, currentSlot);

  const handleRowClick = (pkgSpecHash: string) => {
    navigate(`/jam/block/${headerHash}/workreport/${pkgSpecHash}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, fontSize: "32px" }}>
        Work Report List
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 3 }}
      >
        <Typography variant="body1" gutterBottom>
          A total of {workReports.length} work{" "}
          {pluralize("report", workReports.length)} found on block{" "}
          <Link
            to={`/jam/block/${headerHash}?type=hash`}
          >
            {headerHash}
          </Link>
        </Typography>
      </Box>
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Report Hash</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Core Index</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Header Hash</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Report Slot</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Service ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Accumulate Gas
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Signatures</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workReports.length > 0 ? (
                workReports.map((reportData, index) => {
                  const pkgSpecHash = reportData.report.package_spec.hash;
                  const coreIndex = reportData.report.core_index;
                  const slot = reportData.slot;
                  const serviceId = reportData.report.results?.[0]?.service_id;
                  const accumulateGas =
                    reportData.report.results?.[0]?.accumulate_gas;
                  const signatures = reportData.signatures;
                  const shortReportHash = truncateHash(pkgSpecHash, "small");

                  return (
                    <TableRow
                      key={index}
                      hover
                      onClick={() => handleRowClick(pkgSpecHash)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell sx={{ color: "blue" }}>
                        {shortReportHash}
                      </TableCell>
                      <TableCell>{coreIndex ?? "N/A"}</TableCell>
                      <TableCell sx={{ color: "blue" }}>
                        <Link
                          to={`/jam/block/${headerHash}?type=hash`}
                        >
                          {truncateHash(headerHash, "small")}
                        </Link>
                      </TableCell>
                      <TableCell>{slot ?? "N/A"}</TableCell>
                      <TableCell>{serviceId ?? "N/A"}</TableCell>
                      <TableCell>{accumulateGas ?? "N/A"}</TableCell>
                      <TableCell>{signatures.length}</TableCell>
                      <TableCell>
                        {statuses[pkgSpecHash] ? statuses[pkgSpecHash] : "N/A"}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No work reports available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
