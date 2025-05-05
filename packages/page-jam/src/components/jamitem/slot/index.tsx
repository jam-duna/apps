// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ItemMode } from '../index.js';

import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '../../../utils/helper.js';
import { SlotIcon } from '../../Icons/index.js';

interface SlotProps {
  mode: ItemMode;
  slot: number;
  timestamp: number;
  showmode: string;
}

export function Slot (param: SlotProps) {
  return (
    <Tooltip
      arrow
      placement='top'
      title={`Slot index : ${param.slot}`}
    >
      <Link to={`/jam/block/${param.slot}`}>
        <Box
          alignItems='center'
          display='flex'
          gap='5px'
          justifyContent='center'
          sx={{
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            paddingInline: '10px',
            transition: 'all 0.3s ease-in-out',
            color: '#ffffff',
            backgroundColor: '#90caf9',
            ':hover': {
              backgroundColor: '#64b5f6'
            }
          }}
        >
          <SlotIcon
            color={'#fff'}
            size={16}
          />
          <Typography
            paddingTop='2px'
            variant='subtitle2'
          >
            {formatDate(param.timestamp, param.showmode)}
          </Typography>
        </Box>
      </Link>
    </Tooltip>
  );
}
