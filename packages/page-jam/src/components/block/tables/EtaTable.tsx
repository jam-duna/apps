// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { truncateHash } from '../../../utils/helper.js';

interface EtaTableProps {
  data: string[];
}

export default function EtaTable ({ data }: EtaTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleRowClick = useCallback((idx: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    setExpandedRow(expandedRow === idx ? null : idx);
  }, [expandedRow]);

  if (!data || data.length === 0) {
    return <Typography>No eta data available.</Typography>;
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
              <TableCell sx={{ fontWeight: 'bold' }}>Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((hash, idx) => {
              const expanded = expandedRow === idx;

              return (
                <TableRow
                  hover
                  key={idx}
                  onClick={handleRowClick(idx)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{idx}</TableCell>
                  <TableCell>
                    {expanded ? hash : truncateHash(hash, 'long')}
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
