// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { ValidatorShowCase } from '../../../../types/index.js';

import { Paper, Typography } from '@mui/material';
import React from 'react';

import { ItemMode } from '../../index.js';
import { Validator } from '../ValidatorItem/index.js';

interface ActiveValidatorsProps {
  validators: ValidatorShowCase[];
}

export function ActiveValidators (param: ActiveValidatorsProps) {
  return (
    <Paper variant='outlined'>
      <Typography
        gutterBottom
        sx={{ borderBottom: '1px solid #ccc', m: 0, mb: 2, px: 1.5, py: 2 }}
        variant='h6'
      >
        Active Validators
      </Typography>
      {(param.validators.length > 0)
        ? (param.validators.map((item, itemIndex) => {
          return (
            <Validator
              key={itemIndex}
              mode={ItemMode.Medium}
              validator={item}
            />
          );
        }))
        : (<Typography
          sx={{ '&:hover': { backgroundColor: '#f9f9f9' }, p: 2 }}
          variant='subtitle2'
        >
                    No active validators
        </Typography>)}
    </Paper>
  );
}
