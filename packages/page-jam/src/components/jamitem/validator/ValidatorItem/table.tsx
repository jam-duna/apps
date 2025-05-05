// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyedItem } from '../../../../types/index.js';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { truncateHash } from '../../../../utils/helper.js';
import { LabeledRow } from '../../../display/LabeledRow.js';
import { Hash } from '../../hash/index.js';

interface Props {
  validator: KeyedItem;
  title: string;
  badge: string;
  hash: string;
}

export function ValidatorTable ({ badge, hash, title, validator }: Props) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Only set default expanded state on initial render
    setExpanded(badge === '');
  }, [badge]);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        px: 2,
        py: 1,
        my: 1,
        boxShadow: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px'
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
        <Box
          alignItems='center'
          display='flex'
          gap='10px'
          justifyContent='start'
        >
          <Typography
            fontWeight={'bold'}
            variant='h6'
          >
            {title}
          </Typography>
          <Typography
            fontSize='12px'
            sx={{
              px: '4px',
              py: '0px',
              backgroundColor: '#888',
              color: '#fff',
              borderRadius: '4px'
            }}
            variant='body2'
          >
            {badge}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <LabeledRow
          label='Bandersnatch:'
          tooltip='Bandersnatch'
          value={
            <Link
              to={
                hash === 'latest'
                  ? `/jam/validator/key/${validator.bandersnatch}`
                  : `/jam/validator/key/${validator.bandersnatch}/${hash}`
              }
            >
              <Hash hash={validator.bandersnatch} />
            </Link>
          }
        />
        <LabeledRow
          label='Ed25519:'
          tooltip='Ed25519'
          value={
            <Link
              to={
                hash === 'latest'
                  ? `/jam/validator/key/${validator.ed25519}`
                  : `/jam/validator/key/${validator.ed25519}/${hash}`
              }
            >
              <Hash hash={validator.ed25519} />
            </Link>
          }
        />
        <LabeledRow
          label='Bls:'
          tooltip='Bls'
          value={
            <Link
              to={
                hash === 'latest'
                  ? `/jam/validator/key/${validator.bls}`
                  : `/jam/validator/key/${validator.bls}/${hash}`
              }
            >
              <Hash hash={validator.bls} />
            </Link>
          }
        />
        <LabeledRow
          label='Metadata:'
          tooltip='Metadata'
          value={
            truncateHash(validator.metadata, 'long') !== '0x000000...000000'
              ? (
                <Hash hash={validator.metadata} />
              )
              : (
                '-'
              )
          }
        />
      </AccordionDetails>
    </Accordion>
  );
}
