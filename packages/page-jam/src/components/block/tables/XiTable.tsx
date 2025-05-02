// [object Object]
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
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  width: '100px'
                }}
              >
                Index
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
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
