// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import { Box, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../home/SearchBar.js';

export default function Navbar () {
  return (
    <Box
      component='header'
      position='static'
      sx={{
        backgroundColor: '#F8F9FA',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          paddingBlock: '10px',
          paddingInline: '20px'
        }}
      >
        <Link to='/'>
          <Box
            alt='JAM logo'
            component='img'
            height='54px'
            src='https://graypaper.com/static/a21b59cd32bc41e89bb89db43380ced9/d4652/jam-pen-polkadot.webp'
            sx={{
              cursor: 'pointer',
              filter: 'invert(100%)'
            }}
            width='100px'
          />
        </Link>
        <Box
          alignItems='center'
          display='flex'
          justifyContent='end'
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: '54px',
            justifyContent: 'end',
            paddingInline: '25px',
            width: '640px'
          }}
        >
          <SearchBar />
        </Box>
      </Container>
    </Box>
  );
}
