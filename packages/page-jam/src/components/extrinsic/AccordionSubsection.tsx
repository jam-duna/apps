// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { AssuranceIcon, DisputeIcon, GuaranteeIcon, PreimageIcon, TicketIcon } from '../Icons/index.js';

interface AccordionSubsectionProps {
  icon: string;
  title: string;
  count: number;
  emptyMessage: string;
  children: React.ReactNode;
}

export default function AccordionSubsection ({ children,
  count,
  emptyMessage,
  icon,
  title }: AccordionSubsectionProps) {
  return (
    <Accordion
      disableGutters
      sx={{
        py: 1,
        border: 'none',
        boxShadow: 'none',
        '&:before': { display: 'none' }
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          px: 0,
          py: 0,
          minHeight: 'auto',
          '& .MuiAccordionSummary-content': { m: 0, p: 0 }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={`${title} details`}>
            <IconButton
              component='span'
              size='small'
              sx={{ mr: 1 }}
            >
              {icon === 'ticket' && <TicketIcon
                color={'#555'}
                size={18}
              />}
              {icon === 'dispute' && <DisputeIcon
                color={'#555'}
                size={18}
              />}
              {icon === 'guarantee' && <GuaranteeIcon
                color={'#555'}
                size={18}
              />}
              {icon === 'assurance' && <AssuranceIcon
                color={'#555'}
                size={18}
              />}
              {icon === 'preimage' && <PreimageIcon
                color={'#555'}
                size={18}
              />}
            </IconButton>
          </Tooltip>
          <Typography variant='subtitle1'>
            {title} ({count})
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 5, m: 0 }}>
        {count > 0
          ? (
            children
          )
          : (
            <Box sx={{ py: 1 }}>
              <Typography variant='body2'>{emptyMessage}</Typography>
            </Box>
          )}
      </AccordionDetails>
    </Accordion>
  );
}
