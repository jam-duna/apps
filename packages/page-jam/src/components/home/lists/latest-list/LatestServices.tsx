// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import ServiceListItem from '../list-item/ServiceItem.js';

// Define the Service type (adjust as needed)
export interface Service {
  code_hash: string;
  balance: number;
  min_item_gas: number;
  min_memo_gas: number;
  bytes: number;
  items: number;
}

interface LatestServicesProps {
  latestServices: Service[];
}

export default function LatestServices ({ latestServices }: LatestServicesProps) {
  return (
    <Paper
      sx={{ mt: 5 }}
      variant='outlined'
    >
      <Typography
        gutterBottom
        sx={{ px: 1.5, py: 2, borderBottom: '1px solid #ccc', m: 0 }}
        variant='h6'
      >
        Latest Services (Mock Data)
      </Typography>
      {latestServices.map((serviceItem) => (
        <ServiceListItem
          key={serviceItem.code_hash}
          serviceItem={serviceItem}
        />
      ))}
      <Link
        style={{
          textDecoration: 'none',
          color: 'inherit',
          textAlign: 'center'
        }}
        to={'/list/service'}
      >
        <Typography
          sx={{ p: 2, '&:hover': { backgroundColor: '#f9f9f9' } }}
          variant='subtitle2'
        >
          View All Services
        </Typography>
      </Link>
    </Paper>
  );
}
