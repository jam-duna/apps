// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';

import { truncateHash } from '../../../utils/helper.js';

// Helper function to safely convert an unknown value to a ReactNode
function renderCellValue (value: unknown): React.ReactNode {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  } else if (typeof value === 'boolean') {
    return value.toString();
  } else if (React.isValidElement(value)) {
    return value;
  }

  // Fallback: convert object to JSON string
  return JSON.stringify(value);
}

interface TableFormat1Props {
  data: Record<string, unknown>[];
}

export default function TableFormat1 ({ data }: TableFormat1Props) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <Typography>No data available.</Typography>;
  }

  // Assume that all objects have the same keys.
  const keys = Object.keys(data[0]);

  const handleRowClick = (idx: number) => {
    setExpandedRow(expandedRow === idx ? null : idx);
  };

  return (
    <Box sx={{ my: 1 }}>
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
              {/* New column for row index */}
              <TableCell
                sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
              >
                #
              </TableCell>
              {keys.map((key) => (
                <TableCell
                  key={key}
                  sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
                >
                  {key.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                hover
                key={idx}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => handleRowClick(idx)}
                sx={{ cursor: 'pointer' }}
              >
                {/* Row index */}
                <TableCell>{idx}</TableCell>
                {keys.map((key) => (
                  <TableCell key={key}>
                    {typeof row[key] === 'string'
                      ? row[key].startsWith('0x')
                        ? expandedRow === idx
                          ? row[key]
                          : truncateHash(row[key], 'long')
                        : row[key]
                      : renderCellValue(row[key])}
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
