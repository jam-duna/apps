// [object Object]
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { State } from '../../../db/db.js';
import type { Report } from '../../../types/index.js';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Box, Paper, Typography } from '@mui/material'; // Report icon
import React from 'react';
import { Link } from 'react-router-dom';

import { truncateHash } from '../../../utils/helper.js';

interface RecentWorkPackageProps {
  states: State[];
  coreIndex: number;
}

interface WorkPackageListItemProps {
  state: State;
  coreIndex: number;
}

type RhoItem = { report: Report; timeout: number } | null;

function WorkPackageListItem ({ coreIndex, state }: WorkPackageListItemProps) {
  const createdAt = state.overview?.createdAt || 0;

  const exportsCount = () => {
    let count = -1;

    try {
      state.rho.forEach((item: RhoItem) => {
        if (item?.report.core_index === coreIndex) {
          count = item.report.package_spec.exports_count;
        }
      });
    } catch (err) {}

    return count;
  };

  const packageHash = () => {
    let hash = '0x00';

    try {
      state.rho.forEach((item: RhoItem) => {
        if (item?.report.core_index === coreIndex) {
          hash = item.report.package_spec.hash;
        }
      });
    } catch (err) {}

    return hash;
  };

  const results = () => {
    let results = '';

    try {
      state.rho.forEach((item: RhoItem) => {
        if (item?.report.core_index === coreIndex) {
          item.report.results.forEach((result) => {
            results += result.result.ok ? 'ok ' : 'error ';
          });
        }
      });
    } catch (err) {}

    return results;
  };

  return (
    <Link
      key={packageHash()}
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/jam/workpackage/${packageHash()}/`}
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
            exports count {exportsCount()}
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
            sx={{ color: '#1976d2', textDecoration: 'underline' }}
            variant='body2'
          >
            {truncateHash(packageHash(), 'long')}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            results {results()}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

export function RecentWorkPackages ({ coreIndex,
  states }: RecentWorkPackageProps) {
  const displayStates = states.slice(0, 8);

  return (
    <Paper variant='outlined'>
      <Typography
        gutterBottom
        sx={{ mb: 2, px: 1.5, py: 2, borderBottom: '1px solid #ccc', m: 0 }}
        variant='h6'
      >
        Recent Work Packages
      </Typography>
      {displayStates && displayStates.length > 0
        ? (
          displayStates.map((state) => {
            return (
              <WorkPackageListItem
                coreIndex={coreIndex}
                key={state.overview?.headerHash}
                state={state}
              />
            );
          })
        )
        : (
          <Typography
            sx={{ p: 2, '&:hover': { backgroundColor: '#f9f9f9' } }}
            variant='subtitle2'
          >
          No work packages
          </Typography>
        )}
    </Paper>
  );
}
