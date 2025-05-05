// Copyright 2017-2025 @polkadot/app-jamm author & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React from 'react';

import { moreDetailsMapping } from '../../utils/tooltipDetails.js';
import { LabeledRow } from '../display/LabeledRow.js';
import { DetailsIcon } from '../Icons/index.js';
import { Hash } from '../jamitem/index.js';

interface HeaderProps {
  parent: string;
  parent_state_root: string;
  seal: string;
  entropy_source: string;
}

interface MoreDetailsAccordionProps {
  header: HeaderProps;
}

export default function MoreDetailsAccordion ({ header }: MoreDetailsAccordionProps) {
  return (
    <Accordion sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          alignItems='center'
          display='flex'
          gap='5px'
          sx={{ px: 2 }}
        >
          <DetailsIcon
            color={'#555'}
            size={16}
          />
          <Typography
            mt='2px'
            variant='body1'
          >
            {'More Details'}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 3 }}>
        {Object.entries(moreDetailsMapping).map(([key, { label, tooltip }]) => (
          <LabeledRow
            icon={label}
            key={key}
            label={label}
            tooltip={tooltip}
            value={
              <Hash hash={header[key as keyof HeaderProps]} />
            }
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
