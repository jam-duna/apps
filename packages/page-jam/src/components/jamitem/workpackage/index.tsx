// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Report, ServiceInfoDetail } from '../../../types/index.js';

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fallbackCopyTextToClipboard } from '../../../utils/clipboard.js';
import { getRelativeTime, truncateHash } from '../../../utils/helper.js';
import { WorkPackageIcon } from '../../Icons/index.js';
import { ItemMode } from '../index.js';
import { Service } from '../service/index.js';

interface WorkPackageProps {
  mode: ItemMode;
  hash: string;
  report: Report | null;
  timestamp: number;
  services?: ServiceInfoDetail[];
}

export function WorkPackage ({ hash,
  mode,
  report,
  services = [],
  timestamp = 0 }: WorkPackageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(hash);
      } else {
        fallbackCopyTextToClipboard(hash);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getService = (name: number) => {
    let result: ServiceInfoDetail | undefined;

    services.forEach((service) => {
      if (service.service === name) {
        result = service;
      }
    });

    return result;
  };

  const gridRender = (
    <Box
      alignItems='center'
      display='flex'
      gap='2px'
      justifyContent='start'
      sx={{
        cursor: 'pointer',
        paddingInline: '10px',
        transition: 'all 0.3s ease-in-out',
        color: '#444444',
        ':hover': {
          color: '#444444'
        }
      }}
    >
      <Tooltip
        arrow
        placement='top'
        title={`WorkPackageHash: ${hash}`}
      >
        <Link to={`/jam/workpackage/${hash}`}>
          <Typography
            fontSize='16px'
            variant='subtitle2'
          >
            {hash}
          </Typography>
        </Link>
      </Tooltip>
      <Tooltip
        arrow
        placement='top'
        title={copied ? 'Copied!' : 'Copy workpackage hash'}
      >
        <IconButton onClick={handleCopy}>
          {!copied
            ? (
              <ContentCopy
                sx={{ width: '12px', height: '12px', color: '#444444' }}
              />
            )
            : (
              <Check sx={{ width: '12px', height: '12px', color: '#444444' }} />
            )}
        </IconButton>
      </Tooltip>
    </Box>
  );

  const smallRender = (
    <Box
      alignItems='center'
      display='flex'
      gap='2px'
      justifyContent='start'
      sx={{
        cursor: 'pointer',
        paddingInline: '5px',
        paddingBlock: '2px',
        transition: 'all 0.3s ease-in-out',
        color: '#444444',
        ':hover': {
          color: '#1b5e20'
        }
      }}
    >
      <WorkPackageIcon
        color={'#1b5e20'}
        size={16}
      />
      <Tooltip
        arrow
        placement='top'
        title={`WorkPackageHash: ${hash}`}
      >
        <Link to={`/jam/workpackage/${hash}`}>
          <Typography
            fontSize='12px'
            variant='subtitle2'
          >
            {truncateHash(hash, 'short')}
          </Typography>
        </Link>
      </Tooltip>
      <Tooltip
        arrow
        placement='top'
        title={copied ? 'Copied!' : 'Copy workpackage hash'}
      >
        <IconButton onClick={handleCopy}>
          {!copied
            ? (
              <ContentCopy
                sx={{ width: '12px', height: '12px', color: '#444444' }}
              />
            )
            : (
              <Check sx={{ width: '12px', height: '12px', color: '#444444' }} />
            )}
        </IconButton>
      </Tooltip>
    </Box>
  );

  const mediumRender = (
    <Link
      key={hash}
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/jam/workpackage/${hash}/`}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          borderRadius: 1,
          transition: 'background-color 0.2s',
          '&:hover': { backgroundColor: '#f9f9f9' },
          borderBottom: '1px solid #ddd'
        }}
      >
        {/* Left icon */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            color: '#1b5e20',
            border: '1px solid #ddd',
            mr: 2
          }}
        >
          <WorkPackageIcon
            color={'#1b5e20'}
            size={24}
          />
        </Box>
        {/* Middle: Report count and relative time */}
        <Box sx={{ flex: 1 }}>
          <Box
            alignItems='center'
            display='flex'
            flexDirection='row'
            gap='2px'
            justifyContent='start'
            marginLeft='-5px'
          >
            {report?.results.map((item, itemIndex) => {
              return (
                <Service
                  key={itemIndex}
                  mode={ItemMode.Small}
                  name={item.service_id.toString()}
                  service={getService(item.service_id)}
                />
              );
            })}
          </Box>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            {getRelativeTime(timestamp)} ago
          </Typography>
        </Box>
        {/* Right: truncated header hash */}
        <Box sx={{ textAlign: 'right' }}>
          <Box
            alignItems='center'
            display='flex'
            flexDirection='row'
            gap='2px'
            justifyContent='end'
            marginRight='-5px'
          >
            <Tooltip
              arrow
              placement='top'
              title={`WorkPackageHash: ${hash}`}
            >
              <Typography
                fontSize='13px'
                sx={{
                  color: '#444444',
                  transition: 'all 0.3s ease-in-out',
                  ':hover': {
                    color: '#1b5e20'
                  }
                }}
                variant='subtitle2'
              >
                hash {truncateHash(hash, 'long')}
              </Typography>
            </Tooltip>
            <Tooltip
              arrow
              placement='top'
              title={copied ? 'Copied!' : 'Copy workpackage hash'}
            >
              <IconButton onClick={handleCopy}>
                {!copied
                  ? (
                    <ContentCopy
                      sx={{ width: '12px', height: '12px', color: '#444444' }}
                    />
                  )
                  : (
                    <Check
                      sx={{ width: '12px', height: '12px', color: '#444444' }}
                    />
                  )}
              </IconButton>
            </Tooltip>
          </Box>
          <Typography
            color='#444444'
            fontSize='12px'
            variant='body2'
          >
            exports count {report?.package_spec.exports_count}
          </Typography>
        </Box>
      </Box>
    </Link>
  );

  const largeRender = (
    <Box
      alignItems='center'
      display='flex'
      gap='10px'
      justifyContent='start'
      sx={{
        cursor: 'pointer',
        paddingInline: '5px',
        paddingBlock: '2px',
        transition: 'all 0.3s ease-in-out',
        color: '#444444',
        ':hover': {
          color: '#444444'
        }
      }}
    >
      <WorkPackageIcon
        color={'#444'}
        size={24}
      />
      <Typography
        fontSize='28px'
        variant='subtitle2'
      >
        Work Package
      </Typography>
      <Typography
        fontSize='16px'
        mt={1}
        variant='subtitle2'
      >
        {hash}
      </Typography>
    </Box>
  );

  return (
    <>
      {mode == ItemMode.Small && smallRender}
      {mode == ItemMode.Grid && gridRender}
      {mode == ItemMode.Medium && mediumRender}
      {mode == ItemMode.Large && largeRender}
    </>
  );
}
