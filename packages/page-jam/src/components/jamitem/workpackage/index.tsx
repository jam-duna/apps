// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react/jsx-no-bind */

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

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    const copyToClipboard = async () => {
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

    // eslint-disable-next-line no-void
    void copyToClipboard();
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
        ':hover': {
          color: '#444444'
        },
        color: '#444444',
        cursor: 'pointer',
        paddingInline: '10px',
        transition: 'all 0.3s ease-in-out'
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
                sx={{
                  color: '#444444',
                  height: '12px',
                  width: '12px'
                }}
              />
            )
            : (
              <Check
                sx={{
                  color: '#444444',
                  height: '12px',
                  width: '12px'
                }}
              />
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
        ':hover': {
          color: '#1b5e20'
        },
        color: '#444444',
        cursor: 'pointer',
        paddingBlock: '2px',
        paddingInline: '5px',
        transition: 'all 0.3s ease-in-out'
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
                sx={{
                  color: '#444444',
                  height: '12px',
                  width: '12px'
                }}
              />
            )
            : (
              <Check
                sx={{
                  color: '#444444',
                  height: '12px',
                  width: '12px'
                }}
              />
            )}
        </IconButton>
      </Tooltip>
    </Box>
  );

  const mediumRender = (
    <Link
      key={hash}
      style={{ color: 'inherit', textDecoration: 'none' }}
      to={`/jam/workpackage/${hash}/`}
    >
      <Box
        sx={{
          '&:hover': { backgroundColor: '#f9f9f9' },
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
          borderRadius: 1,
          display: 'flex',
          p: 1.5,
          transition: 'background-color 0.2s'
        }}
      >
        {/* Left icon */}
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: 1,
            color: '#1b5e20',
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            mr: 2,
            width: 40
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
                  ':hover': {
                    color: '#1b5e20'
                  },
                  color: '#444444',
                  transition: 'all 0.3s ease-in-out'
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
                      sx={{
                        color: '#444444',
                        height: '12px',
                        width: '12px'
                      }}
                    />
                  )
                  : (
                    <Check
                      sx={{
                        color: '#444444',
                        height: '12px',
                        width: '12px'
                      }}
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
        ':hover': {
          color: '#444444'
        },
        color: '#444444',
        cursor: 'pointer',
        paddingBlock: '2px',
        paddingInline: '5px',
        transition: 'all 0.3s ease-in-out'
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
      {mode === ItemMode.Small && smallRender}
      {mode === ItemMode.Grid && gridRender}
      {mode === ItemMode.Medium && mediumRender}
      {mode === ItemMode.Large && largeRender}
    </>
  );
}
