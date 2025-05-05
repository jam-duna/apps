// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type{ GuaranteeSignature, Report } from '../../../types/index.js';

import { Accordion, AccordionDetails, AccordionSummary, Box, Link as MuiLink, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Guarantee {
  report: Report;
  slot: number;
  signatures: GuaranteeSignature[];
}

interface GuaranteeItemProps {
  guarantee: Guarantee;
  idx: number;
  expanded: boolean;
  headerHash: string;
}

export default function GuaranteeItem ({ guarantee,
  headerHash,
  idx }: GuaranteeItemProps) {
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
          <Typography variant='body2'>Guarantee {idx}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, pb: 2 }}>
          <Typography
            color='textSecondary'
            sx={{ mb: 1 }}
            variant='body2'
          >
            Work Report:{' '}
            <MuiLink
              component={Link}
              sx={{ textDecoration: 'underline' }}
              to={`/jam/block/${headerHash}/workreport/${guarantee.report.package_spec.hash}`}
            >
              {guarantee.report.package_spec.hash}
            </MuiLink>
          </Typography>
          <Typography
            color='textSecondary'
            sx={{ mb: 1 }}
            variant='body2'
          >
            Slot: {guarantee.slot}
          </Typography>
          <Typography
            color='textSecondary'
            sx={{ mb: 1 }}
            variant='body2'
          >
            Signatures:
          </Typography>
          {guarantee.signatures.map((sig, i) => (
            <Link
              key={`signature-${i}`}
              to={`/jam/validator/${sig.validator_index}/${headerHash}`}
            >
              <Typography
                color='textSecondary'
                gutterBottom
                key={`signature-${i}`}
                sx={{ ml: 2 }}
                variant='body2'
              >
                Validator {sig.validator_index}: {sig.signature}
              </Typography>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
