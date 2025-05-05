// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import { Box, Container } from '@mui/material';
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: '20px',
          paddingBlock: '10px'
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
            width: '640px',
            height: '54px',
            paddingInline: '25px'
          }}
        >
          <SearchBar />
        </Box>
      </Container>
    </Box>
  );
}
