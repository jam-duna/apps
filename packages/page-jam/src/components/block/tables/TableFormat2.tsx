// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';

import { truncateHash } from '../../../utils/helper.js';

interface TableFormat2Props {
  data: string[][];
}

// Helper function to transpose a 2D array.
function transpose<T> (matrix: T[][]): T[][] {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export default function TableFormat2 ({ data }: TableFormat2Props) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <Typography>No data available.</Typography>;
  }

  // Transpose the data so that columns become rows.
  const transposedData = transpose(data);
  // Now, the number of header columns equals the number of rows in the original data.
  const numHeaders = data.length;
  const headerCells = Array.from(
    { length: numHeaders },
    (_, idx) => `Value ${idx}`
  );

  const handleRowClick = (rowIndex: number) => {
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
  };

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
              {/* Index header for transposed rows */}
              <TableCell
                sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
              >
                #
              </TableCell>
              {headerCells.map((header, idx) => (
                <TableCell
                  key={idx}
                  sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transposedData.map((row, rowIndex) => (
              <TableRow
                hover
                key={rowIndex}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => handleRowClick(rowIndex)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{rowIndex}</TableCell>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {typeof cell === 'string' && cell.startsWith('0x')
                      ? expandedRow === rowIndex
                        ? cell
                        : truncateHash(cell, 'long')
                      : cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
