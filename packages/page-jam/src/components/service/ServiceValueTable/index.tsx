"use client";

import React from "react";
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ServiceValue } from "../../../types/index.js";
import { Hash } from "../../jamitem/index.js";
import { Link } from "react-router-dom";

interface ServiceValueTableProps {
  values: ServiceValue[];
  serviceId: number;
}

export function ServiceValueTable({
  values,
  serviceId,
}: ServiceValueTableProps) {

  return (
    <Paper variant="outlined" sx={{ p: 2, marginBlock: 3 }}>
      <Typography variant="h6" mb={3} fontWeight={"bold"}>
        Service Value Table
      </Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Hash</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Slot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((serviceValue, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {
                    <Link
                      to={`/jam/servicevalue/${serviceId}/${serviceValue.key}/${serviceValue.headerHash}`}
                    >
                      <Hash hash={serviceValue.key} />
                    </Link>
                  }
                </TableCell>
                <TableCell align="right">
                  {<Hash hash={serviceValue.hash} />}
                </TableCell>
                <TableCell align="right">
                  {<Hash hash={serviceValue.value} />}
                </TableCell>
                <TableCell align="right">{serviceValue.slot}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
