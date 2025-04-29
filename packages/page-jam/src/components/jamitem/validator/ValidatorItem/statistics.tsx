import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PiEntry } from "../../../../types/index.js";
import React from "react";

interface Props {
  title: string;
  current: PiEntry;
  last: PiEntry;
}

export function ValidatorStatisticsTable({ title, current, last }: Props) {

  return (
    <Paper
      sx={{
        px: 2,
        py: 1,
        my: 4,
        boxShadow: "none",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="start" gap="10px">
        <Typography variant="h6" fontWeight={"bold"}>
          {title}
        </Typography>
      </Box>

      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ fontWeight: "bold" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Header</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Blocks</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ticket</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Preimages</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Preimages Size</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Guarantees</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Assurances</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Current Epoch
              </TableCell>
              <TableCell>{current.blocks}</TableCell>
              <TableCell>{current.tickets}</TableCell>
              <TableCell>{current.pre_images}</TableCell>
              <TableCell>{current.pre_images_size}</TableCell>
              <TableCell>{current.guarantees}</TableCell>
              <TableCell>{current.assurances}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Last Epoch
              </TableCell>
              <TableCell>{last.blocks}</TableCell>
              <TableCell>{last.tickets}</TableCell>
              <TableCell>{last.pre_images}</TableCell>
              <TableCell>{last.pre_images_size}</TableCell>
              <TableCell>{last.guarantees}</TableCell>
              <TableCell>{last.assurances}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
