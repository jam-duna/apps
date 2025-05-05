// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { PsiItem } from '../../../types/index.js'; // Ensure PsiItem is defined as shown

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';

import { truncateHash } from '../../../utils/helper.js';

interface PsiTableRow {
  category: string;
  hash: string;
}

interface PsiTableProps {
  data: PsiItem;
}

export default function PsiTable ({ data }: PsiTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Convert PsiItem into an array of rows.
  const rows: PsiTableRow[] = [];
  const categories: (keyof PsiItem)[] = [
    'good',
    'bad',
    'wonky',
    'offenders'
  ];

  categories.forEach((category) => {
    const arr = data[category];

    if (arr && arr.length > 0) {
      arr.forEach((hash) => {
        rows.push({ category, hash });
      });
    }
  });

  if (rows.length === 0) {
    return <Typography>No Psi data available.</Typography>;
  }

  const handleRowClick = (idx: number) => {
    setExpandedRow(expandedRow === idx ? null : idx);
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        sx={{ mb: 2 }}
        variant='h5'
      >
        Psi Data
      </Typography>
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
              <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              const expanded = expandedRow === idx;

              return (
                <TableRow
                  hover
                  key={idx}
                  // eslint-disable-next-line react/jsx-no-bind, brace-style
                  onClick={() => handleRowClick(idx)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{idx}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    {expanded ? row.hash : truncateHash(row.hash, 'long')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
