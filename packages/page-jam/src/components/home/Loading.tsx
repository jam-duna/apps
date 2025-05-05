// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Container, Typography } from '@mui/material';
import React from 'react';

export default function Loading () {
  return (
    <Container
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Typography
        color='#444'
        fontSize='16px'
        fontWeight='bold'
        paddingTop={10}
        textAlign='center'
        variant='body2'
        width='100%'
      >
        Loading ...
      </Typography>
    </Container>
  );
}
