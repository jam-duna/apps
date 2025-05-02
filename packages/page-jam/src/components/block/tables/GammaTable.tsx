// [object Object]
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { GammaItem } from '../../../types/index.js'; // Ensure GammaItem and related types are defined

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';

import { LabeledRow } from '../../../components/display/LabeledRow.js';
import { truncateHash } from '../../../utils/helper.js';
import TableFormat1 from '../tables/TableFormat1.js'; // Adjust the path as needed

interface GammaTableProps {
  data: GammaItem[];
}

export default function GammaTable ({ data }: GammaTableProps) {
  // Use an array of booleans to track expansion state for each gamma item.
  const [expandedStates, setExpandedStates] = useState<boolean[]>(
    data.map(() => false)
  );

  const toggleExpanded = (idx: number) => {
    setExpandedStates((prev) => {
      const newStates = [...prev];

      newStates[idx] = !newStates[idx];

      return newStates;
    });
  };

  if (!data || data.length === 0) {
    return <Typography>No gamma items available.</Typography>;
  }

  return (
    <Box sx={{ my: 2 }}>
      {data.map((item, idx) => (
        <Box
          key={idx}
          sx={{ mb: 4, p: 2 }}
        >
          {/* 1. Separate Gamma Z out of table */}
          <Box sx={{ mb: 2, pb: 3, borderBottom: '1px solid #aaa' }}>
            <LabeledRow
              label={'Gamma Z'}
              labelVariant='h6'
              tooltip={'Gamma Z Description'}
              value={
                <Typography
                  onClick={() => toggleExpanded(idx)}
                  sx={{ cursor: 'pointer' }}
                  variant='body1'
                >
                  {expandedStates[idx]
                    ? item.gamma_z
                    : truncateHash(item.gamma_z, 'long')}
                </Typography>
              }
            />
          </Box>
          {/* 2. Table only containing Gamma S Tickets and Gamma A */}

          <Box sx={{ my: 2, pt: 3, pb: 7, borderBottom: '1px solid #aaa' }}>
            <LabeledRow
              label={'Gamma S Tickets & Gamma A'}
              labelVariant='h6'
              tooltip={'Gamma S Tickets & Gamma A Description'}
              value={<></>}
            />
            <TableContainer
              component={Paper}
              sx={{ mt: 3 }}
            >
              <Table
                size='small'
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', minWidth: '80px' }}>
                      #
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      Gamma S Keys
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: "bold" }}>Gamma A</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({
                    length:
                      item.gamma_s && item.gamma_s.keys
                        ? item.gamma_s.keys.length
                        : 0
                  }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>{i}</TableCell>
                      <TableCell>
                        {item.gamma_s &&
                        item.gamma_s.keys &&
                        item.gamma_s.keys[i]
                          ? `${item.gamma_s.keys[i]}`
                          : 'N/A'}
                      </TableCell>
                      {/* <TableCell>
                        {item.gamma_a && item.gamma_a[i]
                          ? expandedStates[idx]
                            ? `${item.gamma_a[i].id} (attempt: ${item.gamma_a[i].attempt})`
                            : `${truncateHash(
                                item.gamma_a[i].id,
                                "long"
                              )} (attempt: ${item.gamma_a[i].attempt})`
                          : "N/A"}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/* 3. Display gamma_k using TableFormat1 */}
          <Box sx={{ mt: 5 }}>
            <LabeledRow
              label={'Gamma K Table'}
              labelVariant='h6'
              tooltip={'Gamma K Tickets Description'}
              value={<></>}
            />
            <Box>
              {' '}
              {item.gamma_k && item.gamma_k.length > 0
                ? (
                  <TableFormat1 data={item.gamma_k} />
                )
                : (
                  <Typography variant='body2'>
                  No Gamma K data available.
                  </Typography>
                )}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
