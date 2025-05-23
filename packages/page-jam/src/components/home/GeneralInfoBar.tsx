// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function GeneralInfoBar () {
  const [dotPrice, setDotPrice] = useState<string>('Loading...');
  const [blockTime, setBlockTime] = useState<string>('N/A');
  const [validators, setValidators] = useState<number>(0);

  useEffect(() => {
    // Fetch DOT price from CoinGecko
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=polkadot&vs_currencies=usd'
    )
      .then((res) => res.json())
      .then((data: { polkadot?: { usd: number } }) => {
        if (data?.polkadot?.usd) {
          setDotPrice(`$${data.polkadot.usd}`);
        } else {
          setDotPrice('N/A');
        }
      })
      .catch((err) => {
        console.error(err);
        setDotPrice('N/A');
      });

    // Optionally, fetch average block time and active validators from a Polkadot API.
    // For demonstration, we use dummy values:
    setBlockTime('6 secs');
    setValidators(297);
  }, []);

  return (
    <Paper
      sx={{ mb: 4, p: 2 }}
      variant='outlined'
    >
      <Grid
        container
        spacing={2}
      >
        <Grid columns={{ sm: 4, xs: 12 }}>
          <Typography variant='h6'>DOT Price</Typography>
          <Typography variant='subtitle1'>{dotPrice}</Typography>
        </Grid>
        <Grid columns={{ sm: 4, xs: 12 }}>
          <Typography variant='h6'>Average Block Time</Typography>
          <Typography variant='subtitle1'>{blockTime}</Typography>
        </Grid>
        <Grid columns={{ sm: 4, xs: 12 }}>
          <Typography variant='h6'>Active Validators</Typography>
          <Typography variant='subtitle1'>{validators}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
