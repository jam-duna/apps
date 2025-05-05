// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { State } from '../../../db/db.js';

import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { githubLightTheme, JsonEditor } from 'json-edit-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { jamStateMapping as importedMapping } from '../../../utils/tooltipDetails.js';
import { LabeledRow } from '../../display/LabeledRow.js';
import { createJsonRedirectButtonDefinition } from '../createJsonRedirectButtonDefinition.js';
import { renderTable } from '../tables/RenderStateTable.js';

type JamStateMapping = Record<string, {
  label: string;
  tooltip: string;
}>;

const jamStateMapping: JamStateMapping = importedMapping;

type AllowedStateKey = keyof State;

interface StateTabProps {
  stateRecord: State;
}

export function StateTab ({ stateRecord }: StateTabProps) {
  const { headerHash } = useParams() as { headerHash: string };

  // Example test data.
  const testData = [
    {
      data: {
        lookup_meta: [
          {
            key: {
              hash: '0x8c30f2c101674af1da31769e96ce72e81a4a44c89526d7d3ff0a1a511d5f3c9f',
              length: 25
            },
            value: [0]
          },
          {
            key: {
              hash: '0xbd87fb6de829abf2bb25a15b82618432c94e82848d9dd204f5d775d4b880ae0d',
              length: 970
            },
            value: [0]
          }
        ],
        preimages: [
          {
            blob: '0x00000000000000000020000a00000000000628023307320015',
            hash: '0x8c30f2c101674af1da31769e96ce72e81a4a44c89526d7d3ff0a1a511d5f3c9f'
          },
          {
            blob: '0x0000000000000200002000bb030000040283464001e2017d02b00228ab...',
            hash: '0xbd87fb6de829abf2bb25a15b82618432c94e82848d9dd204f5d775d4b880ae0d'
          }
        ],
        service: {
          balance: 10000000000,
          bytes: 1157,
          code_hash: '0xbd87fb6de829abf2bb25a15b82618432c94e82848d9dd204f5d775d4b880ae0d',
          items: 4,
          min_item_gas: 100,
          min_memo_gas: 100
        },
        storage: null
      },
      id: 0
    }
  ];

  // console.log(stateRecord);
  const jamState = { ...stateRecord, accounts: testData };
  const [viewMode, setViewMode] = useState<'json' | 'table'>('json');

  console.log('jamState', jamState);

  const toggleView = () =>
    setViewMode((prev) => (prev === 'json' ? 'table' : 'json'));

  return (
    <Paper
      sx={{ p: 3 }}
      variant='outlined'
    >
      <Button
        // eslint-disable-next-line react/jsx-no-bind
        onClick={toggleView}
        sx={{ mb: 2 }}
        variant='contained'
      >
        {viewMode === 'json' ? 'table' : 'json'} View
      </Button>
      {Object.entries(jamStateMapping).map(([key, { label, tooltip }]) => {
        const stateKey = key as AllowedStateKey;
        const rawValue = jamState[stateKey];

        console.log('jamState key', rawValue, stateKey);
        let displayValue: React.ReactNode;

        if (typeof rawValue === 'object') {
          displayValue =
            viewMode === 'json'
              ? (
                <JsonEditor
                  collapse={true}
                  customButtons={[createJsonRedirectButtonDefinition(headerHash)]}
                  data={rawValue}
                  theme={githubLightTheme}
                  viewOnly={true}
                />
              )
              : (
                renderTable(jamState, key as keyof State, headerHash) ?? (
                  <Typography variant='body2'>
                    {`Table view not available for key '${key}'`}
                  </Typography>
                )
              );
        } else {
          displayValue = rawValue ?? 'N/A';
        }

        return (
          <React.Fragment key={key}>
            <LabeledRow
              icon={label}
              label={label}
              labelWidth={300}
              tooltip={tooltip}
              value={<Box component='div'>{displayValue}</Box>}
            />
            <Divider sx={{ my: 3 }} />
          </React.Fragment>
        );
      })}
    </Paper>
  );
}
