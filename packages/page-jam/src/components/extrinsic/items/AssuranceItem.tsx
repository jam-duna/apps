// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Assurance } from '../../../types/index.js';

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React from 'react';

interface AssurancesItemProps {
  assurances: Assurance;
  idx: number;
  expanded: boolean;
}

export default function AssurancesItem ({ assurances,
  idx }: AssurancesItemProps) {
  return (
    <Box
      sx={{
        borderTop: '1px solid #ccc',
        overflowWrap: 'anywhere',
        whiteSpace: 'normal',
        wordBreak: 'break-word'
      }}
    >
      <Accordion
        disableGutters
        sx={{
          '&:before': { display: 'none' },
          boxShadow: 'none'
        }}
      >
        <AccordionSummary sx={{ p: 0 }}>
          <Typography variant='body2'>Assurances {idx}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, pb: 2 }}>
          {Object.entries(assurances).map(([key, value]) => (
            <Typography
              color='textSecondary'
              gutterBottom
              key={key}
              variant='body2'
            >
              {key}: {value}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
