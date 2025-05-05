// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { Block } from '../../../db/db.js';

import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { pluralize } from '../../../utils/helper.js';
import { basicInfoMapping } from '../../../utils/tooltipDetails.js';
import { LabeledRow } from '../../display/LabeledRow.js';
import ExtrinsicAccordion from '../../extrinsic/ExtrinsicAccordion.js';
import { Hash } from '../../jamitem/index.js';
import BlockNavigationButtons from '../BlockNavigationButtons.js';
import MoreDetailsAccordion from '../MoreDetailsAccordion.js';

interface BlockTabProps {
  blockRecord: Block; // Use your actual BlockRecord type here.
  hash: string;
  type: string;
  prevHash: string | null;
  nextHash: string | null;
}

export function BlockTab ({ blockRecord,
  hash,
  nextHash,
  prevHash,
  type }: BlockTabProps) {
  const navigate = useNavigate();
  const header = blockRecord.header;
  const extrinsic = blockRecord.extrinsic;
  const headerHash = blockRecord.header_hash;
  const blockHash = blockRecord?.overview?.blockHash;
  const createdAt = Number.parseInt(blockRecord.timestamp);
  const finalized = blockRecord?.overview?.finalized;

  return (
    <>
      <Paper
        sx={{ p: 3 }}
        variant='outlined'
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <LabeledRow
            label={basicInfoMapping.blockHeight.label}
            tooltip={basicInfoMapping.blockHeight.tooltip}
            value={
              <Typography variant='body1'>{blockRecord.header.slot}</Typography>
            }
          />
          {type === 'headerHash' && (
            <BlockNavigationButtons
              nextHash={nextHash}
              onNext={() => {
                if (nextHash) {
                  navigate(`/jam/block/${nextHash}?type=hash`);
                }
              }}
              onPrev={() => {
                if (prevHash) {
                  navigate(`/jam/block/${prevHash}?type=hash`);
                }
              }}
              prevHash={prevHash}
            />
          )}
        </Box>
        <LabeledRow
          label='Finalized'
          tooltip='Block Finalized'
          value={
            <Typography variant='body1'>
              {(finalized || false).toString()}
            </Typography>
          }
        />
        {blockHash && (
          <LabeledRow
            label={basicInfoMapping.blockHash.label}
            tooltip={basicInfoMapping.blockHash.tooltip}
            value={<Hash hash={blockHash} />}
          />
        )}
        {headerHash && (
          <LabeledRow
            label={basicInfoMapping.headerHash.label}
            tooltip={basicInfoMapping.headerHash.tooltip}
            value={<Hash hash={headerHash} />}
          />
        )}
        {createdAt && (
          <LabeledRow
            icon='slot'
            label={basicInfoMapping.createdDate.label}
            tooltip={basicInfoMapping.createdDate.tooltip}
            value={
              <Typography variant='body1'>
                {new Date(createdAt * 1000).toLocaleString()}
              </Typography>
            }
          />
        )}
        <LabeledRow
          icon='author'
          label={basicInfoMapping.authorIndex.label}
          tooltip={basicInfoMapping.authorIndex.tooltip}
          value={
            <Link to={`/jam/validator/${header.author_index}/${hash}`}>
              <Typography variant='body1'>{header.author_index}</Typography>
            </Link>
          }
        />
        <LabeledRow
          icon='work_report'
          label={basicInfoMapping.workReport.label}
          tooltip={basicInfoMapping.workReport.tooltip}
          value={
            <Typography
              sx={{
                textDecoration: 'underline',
                color: '#1976d2',
                textDecorationColor: '#1976d2'
              }}
              variant='body1'
            >
              {extrinsic.guarantees?.length
                ? (
                  <Link to={`/jam/block/${headerHash}/workreport`}>
                    {extrinsic.guarantees.length}
                    {pluralize(' report', extrinsic.guarantees.length)} in this
                  block
                  </Link>
                )
                : (
                  '0 report in this block'
                )}
            </Typography>
          }
        />
        <ExtrinsicAccordion
          extrinsic={extrinsic || null}
          headerHash={hash}
        />
      </Paper>
      <MoreDetailsAccordion header={header} />
    </>
  );
}
