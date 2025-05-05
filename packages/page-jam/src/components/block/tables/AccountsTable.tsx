// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { AccountItem } from '../../../types/index.js';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Accordion, AccordionDetails, AccordionSummary, Box, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { LabeledRow } from '../../../components/display/LabeledRow.js';
import ToggleHash from '../ToggleHashText.js';

interface AccountAccordionProps {
  accounts: AccountItem[];
}

export default function AccountAccordion ({ accounts }: AccountAccordionProps) {
  console.log('Accounts: ', accounts);
  // Reusable custom AccordionSummary style (similar to your ReportTable example)
  const customAccordionSummary = (title: string, tooltipText: string) => (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={{
        px: 0,
        py: 0.75,
        minHeight: 'auto',
        '& .MuiAccordionSummary-content': { m: 0, p: 0 },
        cursor: 'default'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Tooltip
          sx={{ ml: 0.5, mr: 1.5 }}
          title={tooltipText}
        >
          <InfoOutlinedIcon fontSize='small' />
        </Tooltip>
        <Typography
          sx={{ whiteSpace: 'nowrap', minWidth: '170px' }}
          variant='body1'
        >
          {title}
        </Typography>
      </Box>
    </AccordionSummary>
  );

  return (
    <Box>
      {accounts.map((account) => {
        const { data, id } = account;
        const { lookup_meta, preimages, service, storage } = data;

        return (
          <Accordion
            key={id}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='body1'>Account {id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Service Section */}
              <Accordion
                sx={{
                  border: 'none',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  mb: 2,
                  px: 0
                }}
              >
                {customAccordionSummary('Service', 'Service details')}
                <AccordionDetails sx={{ px: 0 }}>
                  <LabeledRow
                    label='Code Hash:'
                    tooltip='Unique identifier for the service'
                    value={<ToggleHash hash={service.code_hash} />}
                  />
                  <LabeledRow
                    label='Balance:'
                    tooltip='Account balance'
                    value={service.balance.toString()}
                  />
                  <LabeledRow
                    label='Min Item Gas:'
                    tooltip='Minimum gas for items'
                    value={service.min_item_gas.toString()}
                  />
                  <LabeledRow
                    label='Min Memo Gas:'
                    tooltip='Minimum gas for memo'
                    value={service.min_memo_gas.toString()}
                  />
                  <LabeledRow
                    label='Bytes:'
                    tooltip='Bytes used'
                    value={service.bytes.toString()}
                  />
                  <LabeledRow
                    label='Items:'
                    tooltip='Number of items'
                    value={service.items.toString()}
                  />
                </AccordionDetails>
              </Accordion>
              {/* Preimages Section */}
              <Accordion
                sx={{
                  border: 'none',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  mb: 2,
                  px: 0
                }}
              >
                {customAccordionSummary('Preimages', 'Preimages details')}
                <AccordionDetails sx={{ px: 0 }}>
                  {preimages && preimages.length > 0
                    ? (
                      preimages.map((preimage, idx) => (
                        <LabeledRow
                          key={idx}
                          label={`Preimage ${idx + 1}:`}
                          tooltip='Preimage details'
                          value={
                            <>
                              <Box>
                              Hash: <ToggleHash hash={preimage.hash} />
                              </Box>
                              <Box>
                              Blob: <ToggleHash hash={preimage.blob} />
                              </Box>
                            </>
                          }
                        />
                      ))
                    )
                    : (
                      <Typography variant='body2'>
                      No preimages available.
                      </Typography>
                    )}
                </AccordionDetails>
              </Accordion>
              {/* Lookup Meta Section */}
              <Accordion
                sx={{
                  border: 'none',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  mb: 2,
                  px: 0
                }}
              >
                {customAccordionSummary('Lookup Meta', 'Lookup meta details')}
                <AccordionDetails sx={{ px: 0 }}>
                  {lookup_meta && lookup_meta.length > 0
                    ? (
                      lookup_meta.map((lookup, idx) => (
                        <LabeledRow
                          key={idx}
                          label={`Lookup Meta ${idx + 1}:`}
                          tooltip='Lookup meta details'
                          value={
                            <>
                              <Box>
                              Key Hash: <ToggleHash hash={lookup.key.hash} />
                              </Box>
                              <Box>Key Length: {lookup.key.length}</Box>
                              <Box>Value: {lookup.value.join(', ')}</Box>
                            </>
                          }
                        />
                      ))
                    )
                    : (
                      <Typography variant='body2'>
                      No lookup meta available.
                      </Typography>
                    )}
                </AccordionDetails>
              </Accordion>
              {/* Storage Section */}
              <Accordion
                sx={{
                  border: 'none',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  mb: 2,
                  px: 0
                }}
              >
                {customAccordionSummary('Storage', 'Storage details')}
                <AccordionDetails sx={{ px: 0 }}>
                  {storage
                    ? (
                      <LabeledRow
                        label='Storage:'
                        tooltip='Storage data'
                        value={JSON.stringify(storage)}
                      />
                    )
                    : (
                      <Typography variant='body2'>
                      No storage available.
                      </Typography>
                    )}
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
