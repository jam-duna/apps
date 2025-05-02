// [object Object]
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { ServiceInfoDetail } from '../../../types/index.js';
import type { ReportWithTime } from '../workpackage/list.js';

import { Paper, Typography } from '@mui/material';
import React from 'react';

import { ItemMode } from '../index.js';
import { Service } from './index.js';

interface ListServicesProps {
  services: ServiceInfoDetail[];
  core?: number;
  reports?: ReportWithTime[];
}

export function ListServices (param: ListServicesProps) {
  const displayServices = param.services;

  const filterServices = () => {
    const filteredResult: ServiceInfoDetail[] = [];

    if (param.reports !== undefined && param.core !== undefined) {
      param.reports.forEach((item) => {
        if (item.report.core_index === param.core) {
          item.report.results.forEach((result) => {
            const index = param.services.findIndex(
              (service) => service.service === result.service_id
            );

            if (index !== -1) {
              filteredResult.push(param.services[index]);
            }
          });
        }
      });
    }

    const unique = filteredResult.filter(
      (item, index, self) =>
        index === self.findIndex((u) => u.service === item.service)
    );

    return unique;
  };

  const normalRender = (
    <Paper variant='outlined'>
      <Typography
        gutterBottom
        sx={{ mb: 2, px: 1.5, py: 2, borderBottom: '1px solid #ccc', m: 0 }}
        variant='h6'
      >
        {param.core === undefined ? 'List of Services' : 'Recent Services'}
      </Typography>
      {param.services && param.services.length > 0
        ? (
          displayServices.map((item, itemIndex) => {
            return (
              <Service
                key={itemIndex}
                mode={ItemMode.Medium}
                name={item.service.toString()}
                service={item}
              ></Service>
            );
          })
        )
        : (
          <Typography
            sx={{ p: 2, '&:hover': { backgroundColor: '#f9f9f9' } }}
            variant='subtitle2'
          >
          No service listed
          </Typography>
        )}
    </Paper>
  );
  const recentRender = (
    <Paper variant='outlined'>
      <Typography
        gutterBottom
        sx={{ mb: 2, px: 1.5, py: 2, borderBottom: '1px solid #ccc', m: 0 }}
        variant='h6'
      >
        {param.core === undefined ? 'List of Services' : 'Recent Services'}
      </Typography>
      {filterServices().length > 0
        ? (
          filterServices()
            .slice(0, 8)
            .map((item, itemIndex) => {
              return (
                <Service
                  key={itemIndex}
                  mode={ItemMode.Medium}
                  name={item.service.toString()}
                  service={item}
                ></Service>
              );
            })
        )
        : (
          <Typography
            sx={{ p: 2, '&:hover': { backgroundColor: '#f9f9f9' } }}
            variant='subtitle2'
          >
          No service listed
          </Typography>
        )}
    </Paper>
  );

  return <>{param.core === undefined ? normalRender : recentRender}</>;
}
