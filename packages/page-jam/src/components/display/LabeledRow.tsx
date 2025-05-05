// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TypographyProps } from '@mui/material/Typography';

import { Autorenew, RawOn } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

import { AccumulateIcon, AuthorIcon, AvailabilityIcon, BlockIcon, CoreIcon, DisputeIcon, EntropyIcon, EntropySourceIcon, EpochIcon, PreimageIcon, RefineIcon, SealIcon, SegmentIcon, ServiceIcon, SlotIcon, StatisticsIcon, ValidatorIcon, WorkPackageIcon, WorkReportIcon, WorkResultsIcon } from '../Icons/index.js';

interface LabeledRowProps {
  label: string;
  tooltip: string;
  value: React.ReactNode;
  labelWidth?: number;
  mti?: string;
  mtl?: string;
  labelVariant?: TypographyProps['variant'];
  icon?: string;
}

export function LabeledRow ({ icon = 'info',
  label,
  labelVariant = 'body1',
  labelWidth = 200,
  mti = '0px',
  mtl = '4px',
  tooltip,
  value }: LabeledRowProps) {
  return (
    <Box sx={{ display: 'flex', marginBlock: '10px' }}>
      {/* Fixed-width label + tooltip */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          minWidth: labelWidth,
          maxWidth: labelWidth,
          flexShrink: 0
        }}
      >
        <Tooltip title={tooltip}>
          <IconButton
            size='small'
            sx={{ mr: 1, mt: mti }}
          >
            {icon === 'info' && <InfoOutlinedIcon fontSize='small' />}
            {icon === 'raw' && <RawOn fontSize='small' />}
            {icon === 'status' && <Autorenew fontSize='small' />}
            {icon === 'core' && <CoreIcon
              color='#555'
              size={18}
            />}
            {icon === 'slot' && <SlotIcon
              color='#555'
              size={18}
            />}
            {icon === 'service' && <ServiceIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'workpackage' && <WorkPackageIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'preimage' && <PreimageIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'segment' && <SegmentIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'availability' && <AvailabilityIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'refine' && <RefineIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'work_results' && <WorkResultsIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'work_report' && <WorkReportIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'author' && <AuthorIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Seal:' && <SealIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Entropy Source:' && <EntropySourceIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Parent:' && <InfoOutlinedIcon fontSize='small' />}
            {icon === 'Parent State Root:' && <InfoOutlinedIcon fontSize='small' />}
            {icon === 'Authorizations Pool (C1)' && <AuthorIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Recent Blocks (C3)' && <BlockIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Privileged Service Indices (C12)' && <ServiceIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Entropy (C6)' && <EntropyIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Validator Statistics (C13)' && <StatisticsIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Disputes State (C5)' && <DisputeIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Availability Assignments (C10)' && <AvailabilityIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Current Epoch (C11)' && <EpochIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Accumulation Queue (C14)' && <AccumulateIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Authorization Queue (C2)' && <AuthorIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Accumulation History (C15)' && <AccumulateIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'Accounts' && <InfoOutlinedIcon fontSize='small' />}
            {icon === 'Safrole State Gamma (C4)' && <InfoOutlinedIcon fontSize='small' />}
            {icon === 'Iota Data (C7)' && <InfoOutlinedIcon fontSize='small' />}
            {icon === 'Kappa Data (C8)' && <InfoOutlinedIcon fontSize='small' />}
            {icon === 'Lambda Data (C9)' && <InfoOutlinedIcon fontSize='small' />}
            {icon === 'validator' && <ValidatorIcon
              color={'#555'}
              size={18}
            />}
            {icon === 'block' && <BlockIcon
              color={'#555'}
              size={18}
            />}
          </IconButton>
        </Tooltip>
        <Typography
          sx={{
            whiteSpace: 'nowrap', // keep the label on one line
            marginTop: mtl
          }}
          variant={labelVariant}
        >
          {label}
        </Typography>
      </Box>
      {/* Value area (wraps text) */}
      <Box
        sx={{
          flex: 1,
          ml: 1,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
          alignSelf: 'center'
        }}
      >
        {value}
      </Box>
    </Box>
  );
}
