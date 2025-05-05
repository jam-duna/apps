// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

interface XiTableProps {
  data: string[][];
}

export default function XiTable ({ data }: XiTableProps) {
  // Map over data to keep the original index, then filter out empty rows.
  const nonEmptyRows = data
    .map((row, index) => ({ index, row }))
    .filter(({ row }) => row.length > 0);

  if (nonEmptyRows.length === 0) {
    return <Typography>No xi values found.</Typography>;
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
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5',
                  fontWeight: 'bold',
                  width: '100px'
                }}
              >
                Index
              </TableCell>
              <TableCell
                sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
              >
                Value(s)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nonEmptyRows.map(({ index, row }) => (
              <TableRow
                hover
                key={index}
              >
                <TableCell>{index}</TableCell>
                <TableCell sx={{ fontSize: '12px', letterSpacing: '0.04rem' }}>
                  {row.join(', ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
