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
            ':hover': {
              backgroundColor: '#64b5f6'
            },
            backgroundColor: '#90caf9',
            color: '#ffffff',
            cursor: 'pointer',
            height: '100%',
            paddingInline: '10px',
            transition: 'all 0.3s ease-in-out',
            width: '100%'
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
