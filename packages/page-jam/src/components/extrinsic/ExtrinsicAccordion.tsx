// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { Extrinsic } from '../../types/index.js';

import { Accordion, AccordionDetails, AccordionSummary, Box, Link as MuiLink, Typography } from '@mui/material';
import React, { useCallback } from 'react';

import { calculateExtrinsicCounts } from '../../utils/extrinsics.js';
import { pluralize } from '../../utils/helper.js';
import { ExtrinsicIcon } from '../Icons/index.js';
import AssurancesItem from './items/AssuranceItem.js';
import GuaranteeItem from './items/GuaranteeItem.js';
import PreimageItem from './items/PreimageItem.js';
import TicketItem from './items/TicketItem.js'; // adjust path accordingly
import AccordionSubsection from './AccordionSubsection.js';

export interface ExtrinsicAccordionProps {
  initialExtrinsicExpanded?: boolean;
  headerHash: string;
  extrinsic: Extrinsic;
}

export default function ExtrinsicAccordion ({ extrinsic,
  headerHash,
  initialExtrinsicExpanded = false }: ExtrinsicAccordionProps) {
  const { assurances, disputes, guarantees, preimages, tickets } = extrinsic;

  const { assurancesCount,
    disputesCount,
    guaranteesCount,
    preimagesCount,
    ticketsCount,
    totalExtrinsics } = calculateExtrinsicCounts(extrinsic);

  // Main accordion expansion state.
  const [extrinsicExpanded, setExtrinsicExpanded] = React.useState<boolean>(
    initialExtrinsicExpanded
  );

  const handlePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const handleAccordionChange = useCallback((_: React.SyntheticEvent, isExpanded: boolean) => {
    setExtrinsicExpanded(isExpanded);
  }, []);

  return (
    <Accordion
      disableGutters
      expanded={extrinsicExpanded}
      onChange={handleAccordionChange}
      sx={{
        '&:before': { display: 'none' },
        border: 'none',
        boxShadow: 'none'
      }}
    >
      <AccordionSummary
        sx={{
          '& .MuiAccordionSummary-content': { m: 0, p: 0 },
          cursor: 'default',
          minHeight: 'auto',
          px: 0
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', flexShrink: 0, gap: 1.5, ml: 0.5 }}>
          <ExtrinsicIcon
            color={'#555'}
            size={18}
          />
          <Typography
            sx={{ minWidth: '170px', whiteSpace: 'nowrap' }}
            variant='body1'
          >
            Extrinsic Count:
          </Typography>
          <MuiLink
            onClick={handlePreventDefault}
            sx={{
              color: '#1976d2',
              cursor: 'pointer',
              ml: -1,
              textDecoration: 'none'
            }}
          >
            <Typography variant='body1'>
              {totalExtrinsics} {pluralize('extrinsic', totalExtrinsics)}
            </Typography>
          </MuiLink>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: 1, p: 0, pl: 26 }}>
        <AccordionSubsection
          count={ticketsCount}
          emptyMessage='No tickets'
          icon='ticket'
          title='Tickets'
        >
          {tickets.map((ticket, idx) => (
            <TicketItem
              expanded={extrinsicExpanded}
              idx={idx}
              key={idx}
              ticket={ticket}
            />
          ))}
        </AccordionSubsection>
        <AccordionSubsection
          count={disputesCount}
          emptyMessage='No disputes'
          icon='dispute'
          title='Disputes'
        >
          <>
            <Typography variant='body2'>
              Verdicts: {disputes?.verdicts?.length || 0}
            </Typography>
            <Typography variant='body2'>
              Culprits: {disputes?.culprits?.length || 0}
            </Typography>
            <Typography variant='body2'>
              Faults: {disputes?.faults?.length || 0}
            </Typography>
          </>
        </AccordionSubsection>
        <AccordionSubsection
          count={assurancesCount}
          emptyMessage='No assurances'
          icon='assurance'
          title='Assurances'
        >
          {assurances.map((assurance, idx) => (
            <AssurancesItem
              assurances={assurance}
              expanded={extrinsicExpanded}
              idx={idx}
              key={idx}
            />
          ))}
        </AccordionSubsection>
        <AccordionSubsection
          count={guaranteesCount}
          emptyMessage='No guarantees'
          icon='guarantee'
          title='Guarantees'
        >
          {guarantees.map((guarantee, idx) => (
            <GuaranteeItem
              expanded={extrinsicExpanded}
              guarantee={guarantee}
              headerHash={headerHash}
              idx={idx}
              key={idx}
            />
          ))}
        </AccordionSubsection>
        <AccordionSubsection
          count={preimagesCount}
          emptyMessage='No preimages'
          icon='preimage'
          title='Preimages'
        >
          {preimages.map((preimage, idx) => (
            <PreimageItem
              expanded={extrinsicExpanded}
              idx={idx}
              key={idx}
              preimage={preimage}
            />
          ))}
        </AccordionSubsection>
      </AccordionDetails>
    </Accordion>
  );
}
