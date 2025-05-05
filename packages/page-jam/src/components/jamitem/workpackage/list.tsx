// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { Report, ServiceInfoDetail } from '../../../types/index.js';

import { Paper, Typography } from '@mui/material';
import React from 'react';

import { ItemMode, WorkPackage } from '../index.js';

export interface ReportWithTime {
  report: Report;
  timestamp: number;
}

interface RecentWorkPackageProps {
  reports: ReportWithTime[];
  services: ServiceInfoDetail[];
}

export function RecentWorkPackages (param: RecentWorkPackageProps) {
  const displayReports = param.reports.slice(0, 8);

  return (
    <Paper variant='outlined'>
      <Typography
        gutterBottom
        sx={{ mb: 2, px: 1.5, py: 2, borderBottom: '1px solid #ccc', m: 0 }}
        variant='h6'
      >
                Recent Work Packages
      </Typography>
      {(displayReports && displayReports.length > 0)
        ? (displayReports.map((item, itemIndex) => {
          return (
            <WorkPackage
              hash={item.report.package_spec.hash}
              key={itemIndex}
              mode={ItemMode.Medium}
              report={item.report}
              services={param.services}
              timestamp={item.timestamp}
            />
          );
        }))
        : (<Typography
          sx={{ p: 2, '&:hover': { backgroundColor: '#f9f9f9' } }}
          variant='subtitle2'
        >
                    No work packages
        </Typography>)}
    </Paper>
  );
}
