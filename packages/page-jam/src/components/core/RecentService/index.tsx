// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { State } from '../../../db/db.js';
import type { Result } from '../../../types/index.js';

import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface RecentServiceProps {
  states: State[];
  coreIndex: number;
}

interface ServiceListItemProps {
  result: Result;
  createdAt: number;
}

interface WorkResult {
  createdAt: number | undefined;
  item: Result;
}

function ServiceListItem ({ createdAt, result }: ServiceListItemProps) {
  return (
    <Link
      key={result.service_id}
      style={{ color: 'inherit', textDecoration: 'none' }}
      to={`/jam/service/${result.service_id}/`}
    >
      <Box
        sx={{
          '&:hover': { backgroundColor: '#f9f9f9' },
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
          borderRadius: 1,
          display: 'flex',
          p: 1.5,
          transition: 'background-color 0.2s'
        }}
      >
        {/* Left icon */}
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: 1,
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            mr: 2,
            width: 40
          }}
        >
          <AssignmentIcon fontSize='small' />
        </Box>
        {/* Middle: Report count and relative time */}
        <Box sx={{ flex: 1 }}>
          <Typography variant='subtitle1'>
            service id {result.service_id}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            {Math.floor((Date.now() - createdAt) / 1000)} seconds ago
          </Typography>
        </Box>
        {/* Right: truncated header hash */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            sx={{ color: '#1976d2' }}
            variant='body2'
          >
            {result.result.ok
              ? (
                <CheckCircleIcon color='success'></CheckCircleIcon>
              )
              : (
                <ErrorIcon color='error'></ErrorIcon>
              )}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

export function RecentServices ({ coreIndex, states }: RecentServiceProps) {
  const displayStates = states.slice(0, 8);

  const workResults = (): WorkResult[] => {
    const results: WorkResult[] = [];

    displayStates.forEach((state) => {
      state.rho.forEach((rhoItem) => {
        if (rhoItem && rhoItem.report.core_index === coreIndex) {
          rhoItem.report.results.forEach((item: Result) => {
            results.push({ createdAt: state.overview?.createdAt, item });
          });
        }
      });
    });

    return results;
  };

  return (
    <Paper variant='outlined'>
      <Typography
        gutterBottom
        sx={{
          borderBottom: '1px solid #ccc',
          m: 0,
          mb: 2,
          px: 1.5,
          py: 2
        }}
        variant='h6'
      >
        Recent Services
      </Typography>
      {displayStates && displayStates.length > 0
        ? (
          workResults().map((result: WorkResult, resultIndex: number) => {
            return (
              <ServiceListItem
                createdAt={result.createdAt || 0}
                key={resultIndex}
                result={result.item}
              ></ServiceListItem>
            );
          })
        )
        : (
          <Typography
            sx={{
              '&:hover': { backgroundColor: '#f9f9f9' },
              p: 2
            }}
            variant='subtitle2'
          >
          No recent services
          </Typography>
        )}
    </Paper>
  );
}
