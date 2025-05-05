// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { ServiceValue } from '../../../types/index.js';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { Hash } from '../../jamitem/index.js';

interface ServiceValueTableProps {
  values: ServiceValue[];
  serviceId: number;
}

export function ServiceValueTable ({ serviceId,
  values }: ServiceValueTableProps) {
  return (
    <Paper
      sx={{ marginBlock: 3, p: 2 }}
      variant='outlined'
    >
      <Typography
        fontWeight={'bold'}
        mb={3}
        variant='h6'
      >
        Service Value Table
      </Typography>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Hash</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Slot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((serviceValue, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component='th'
                  scope='row'
                >
                  {
                    <Link
                      to={`/jam/servicevalue/${serviceId}/${serviceValue.key}/${serviceValue.headerHash}`}
                    >
                      <Hash hash={serviceValue.key} />
                    </Link>
                  }
                </TableCell>
                <TableCell align='right'>
                  {<Hash hash={serviceValue.hash} />}
                </TableCell>
                <TableCell align='right'>
                  {<Hash hash={serviceValue.value} />}
                </TableCell>
                <TableCell align='right'>{serviceValue.slot}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
