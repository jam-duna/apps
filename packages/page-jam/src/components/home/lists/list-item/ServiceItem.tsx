// [object Object]
// SPDX-License-Identifier: Apache-2.0

'use client';

import CropSquareIcon from '@mui/icons-material/CropSquare';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { truncateHash } from '../../../../utils/helper.js';

export interface ServiceListItemProps {
  serviceItem: {
    code_hash: string;
    balance: number;
    min_item_gas: number;
    min_memo_gas: number;
    bytes: number;
    items: number;
  };
}

export default function ServiceListItem ({ serviceItem }: ServiceListItemProps) {
  const { balance, bytes, code_hash, items, min_item_gas, min_memo_gas } =
    serviceItem;
  const shortHash = truncateHash(code_hash, 'long');

  return (
    <Link
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/jam/service/${code_hash}`}
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
        {/* Left Icon */}
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
          <CropSquareIcon fontSize='small' />
        </Box>
        {/* Middle: Service Details */}
        <Box sx={{ flex: 1 }}>
          <Typography variant='subtitle1'>Balance: {balance}</Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            min_item_gas: {min_item_gas} | min_memo_gas: {min_memo_gas}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            Bytes: {bytes} | Items: {items}
          </Typography>
        </Box>
        {/* Right: Truncated Code Hash */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            sx={{ color: '#1976d2', textDecoration: 'underline' }}
            variant='body2'
          >
            {shortHash}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            code hash
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
