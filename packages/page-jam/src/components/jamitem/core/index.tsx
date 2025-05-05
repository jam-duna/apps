// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { CoreIcon } from '../../Icons/index.js';
import { ItemMode } from '../index.js';

interface CoreProps {
  mode: ItemMode;
  index: number;
}

export function Core (param: CoreProps) {
  const smallRender = (
    <Tooltip
      arrow
      placement='top'
      title={`Core index : ${param.index}`}
    >
      <Link
        style={{ textDecoration: 'none' }}
        to={`/jam/core/${param.index}`}
      >
        <Box
          alignItems='center'
          display='flex'
          gap={0.5}
          justifyContent='center'
          sx={{
            ':hover': {
              backgroundColor: '#e91e6380'
            },
            backgroundColor: '#e91e63a0',
            color: '#ffffff',
            cursor: 'pointer',
            height: '100%',
            transition: 'all 0.3s ease-in-out',
            width: '100%'
          }}
        >
          <CoreIcon
            color='#fff'
            size={20}
          />
          <Typography
            fontSize={'13px'}
            fontWeight={'bold'}
            variant='subtitle2'
          >
            Core {param.index}
          </Typography>
        </Box>
      </Link>
    </Tooltip>
  );
  const mediumRender = (
    <Tooltip
      arrow
      placement='top'
      title={`Core index : ${param.index}`}
    >
      <Link
        style={{ textDecoration: 'none' }}
        to={`/jam/core/${param.index}`}
      >
        <Box
          alignItems='center'
          display='flex'
          gap={1}
          justifyContent='start'
          sx={{
            ':hover': {
              backgroundColor: '#ffffff'
            },
            backgroundColor: '#ffffff',
            color: '#444444',
            cursor: 'pointer',
            paddingInline: '5px',
            transition: 'all 0.3s ease-in-out',
            width: '70px'
          }}
        >
          <Typography
            fontSize={'16px'}
            variant='subtitle2'
          >
            Core {param.index}
          </Typography>
        </Box>
      </Link>
    </Tooltip>
  );
  const largeRender = (
    <Link
      style={{ textDecoration: 'none' }}
      to={`/jam/core/${param.index}`}
    >
      <Box
        alignItems='center'
        display='flex'
        gap={0.5}
        justifyContent='center'
        sx={{
          ':hover': {
            backgroundColor: '#0000'
          },
          backgroundColor: '#0000',
          color: '#444444',
          cursor: 'pointer',
          height: '100%',
          transition: 'all 0.3s ease-in-out',
          width: '100%'
        }}
      >
        <CoreIcon
          color='#555'
          size={24}
        />
        <Typography
          fontSize={'32px'}
          fontWeight={'bold'}
          variant='subtitle2'
        >
          Core {param.index}
        </Typography>
      </Box>
    </Link>
  );

  return (
    <>
      {param.mode === ItemMode.Small && smallRender}
      {param.mode === ItemMode.Medium && mediumRender}
      {param.mode === ItemMode.Large && largeRender}
    </>
  );
}
