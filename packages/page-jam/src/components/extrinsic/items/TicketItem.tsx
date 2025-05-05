// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { Ticket } from '../../../types/index.js';

import { Accordion, AccordionDetails, AccordionSummary, Box, Link as MuiLink, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';

interface DecodedTicket {
  vrf_output: string;
}

interface TicketItemProps {
  ticket: Ticket;
  idx: number;
  expanded: boolean;
}

export default function TicketItem ({ expanded, idx, ticket }: TicketItemProps) {
  const [decoded, setDecoded] = React.useState<DecodedTicket | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const decodeTicketSignature = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://jam.bayeseer.com/api/bandersnatch',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            objectType: 'GetTicketVRF',
            inputText: JSON.stringify(ticket)
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let result = data.result;

      if (typeof result === 'string') {
        try {
          result = JSON.parse(result);
        } catch (parseError) {
          console.error('Error parsing result string:', parseError);
        }
      }

      setDecoded(result);
      console.log('Decoded ticket result:', result);
    } catch (error) {
      console.error('Error decoding ticket:', error);
      setDecoded({ vrf_output: 'Error decoding ticket' });
    }

    setLoading(false);
  }, [ticket]);

  useEffect(() => {
    if (expanded && !decoded && !loading) {
      decodeTicketSignature();
    }
  }, [expanded, decoded, loading, decodeTicketSignature]);

  return (
    <Box
      sx={{
        borderTop: '1px solid #ccc',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere'
      }}
    >
      <Accordion
        disableGutters
        sx={{
          boxShadow: 'none',
          '&:before': { display: 'none' }
        }}
      >
        <AccordionSummary sx={{ p: 0 }}>
          <Typography variant='body2'>Ticket {idx}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, pb: 2 }}>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            Attempt: {ticket.attempt}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            {loading
              ? (
                'Decoding VRF...'
              )
              : decoded
                ? (
                  `VRF: ${decoded.vrf_output}`
                )
                : (
                  <MuiLink
                    component='button'
                    onClick={decodeTicketSignature}
                    sx={{ textDecoration: 'underline' }}
                  >
                    {`Signature: ${ticket.signature}`}
                  </MuiLink>
                )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
