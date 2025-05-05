// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { BlockIcon } from '../../Icons/index.js';

export function Blocks () {
  return (
    <Tooltip
      arrow
      placement='top'
      title='Link to all listed blocks'
    >
      <Link to='/jam/list/block'>
        <Box
          alignItems='center'
          display='flex'
          gap={0.5}
          justifyContent='center'
          sx={{
            ':hover': {
              color: '#224444D0'
            },
            color: '#444444',
            cursor: 'pointer',
            height: '100%',
            transition: 'all 0.3s ease-in-out',
            width: '100%'
          }}
        >
          <BlockIcon
            color={'#224444D0'}
            size={16}
          />
          <Typography
            fontWeight='bold'
            marginTop='5px'
            variant='subtitle1'
          >
            Blocks
          </Typography>
        </Box>
      </Link>
    </Tooltip>
  );
}
