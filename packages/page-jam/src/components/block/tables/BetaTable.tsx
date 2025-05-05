// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { BetaItem } from '../../../types/index.js'; // Adjust the import path if needed

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { truncateHash } from '../../../utils/helper.js';

interface BetaTableProps {
  data: BetaItem[];
}

export default function BetaTable ({ data }: BetaTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleRowClick = useCallback((idx: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    setExpandedRow(expandedRow === idx ? null : idx);
  }, [expandedRow]);

  if (!data || data.length === 0) {
    return <Typography>No beta items available.</Typography>;
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
              <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Header Hash</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>MMR Peaks</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>State Root</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Reported Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow
                hover
                key={idx}
                onClick={handleRowClick(idx)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{idx}</TableCell>
                <TableCell>
                  {expandedRow === idx
                    ? item.header_hash
                    : truncateHash(item.header_hash, 'long')}
                </TableCell>
                <TableCell>
                  {(() => {
                    const peaks = item.mmr.peaks
                      .filter((p) => p !== null)
                      .join('\n');

                    return expandedRow === idx
                      ? peaks
                      : truncateHash(peaks, 'long');
                  })()}
                </TableCell>
                <TableCell>
                  {expandedRow === idx
                    ? item.state_root
                    : truncateHash(item.state_root, 'long')}
                </TableCell>
                <TableCell sx={{ minWidth: '100px', whiteSpace: 'nowrap' }}>
                  {item.reported.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
