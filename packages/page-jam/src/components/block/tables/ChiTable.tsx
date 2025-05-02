// [object Object]
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { ChiItem } from '../../../types/index.js'; // Adjust the import path if needed

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

interface ChiTableProps {
  data: ChiItem[];
}

export default function ChiTable ({ data }: ChiTableProps) {
  if (!data || data.length === 0) {
    return <Typography>No chi items available.</Typography>;
  }

  return (
    <Box sx={{ my: 4 }}>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400 }}
      >
        <Table
          size='small'
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Chi M</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Chi A</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Chi V</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Chi G</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow
                hover
                key={idx}
              >
                <TableCell>{item.chi_m}</TableCell>
                <TableCell>{item.chi_a}</TableCell>
                <TableCell>{item.chi_v}</TableCell>
                <TableCell>{JSON.stringify(item.chi_g)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
