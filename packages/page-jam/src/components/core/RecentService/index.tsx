// [object Object]
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { State } from '../../../db/db.js';
import type { Result } from '../../../types/index.js';

import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Paper, Typography } from '@mui/material'; // Report icon
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

function ServiceListItem ({ createdAt, result }: ServiceListItemProps) {
  return (
    <Link
      key={result.service_id}
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/jam/service/${result.service_id}/`}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          borderRadius: 1,
          transition: 'background-color 0.2s',
          '&:hover': { backgroundColor: '#f9f9f9' },
          borderBottom: '1px solid #ddd'
        }}
      >
        {/* Left icon */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            mr: 2
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

  const workResults = () => {
    const results: { item: Result; createdAt: number | undefined }[] = [];

    displayStates.forEach((state) => {
      state.rho.forEach((rhoItem: any) => {
        if (rhoItem?.report.core_index === coreIndex) {
          rhoItem.report.results.forEach((item: Result) => {
            results.push({ item, createdAt: state.overview?.createdAt });
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
        sx={{ mb: 2, px: 1.5, py: 2, borderBottom: '1px solid #ccc', m: 0 }}
        variant='h6'
      >
        Recent Services
      </Typography>
      {displayStates && displayStates.length > 0
        ? (
          workResults().map((result, resultIndex) => {
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
            sx={{ p: 2, '&:hover': { backgroundColor: '#f9f9f9' } }}
            variant='subtitle2'
          >
          No recent services
          </Typography>
        )}
    </Paper>
  );
}
