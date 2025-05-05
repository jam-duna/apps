// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react/jsx-no-bind */

import type { ValidatorShowCase } from '../../../../types/index.js';

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fallbackCopyTextToClipboard } from '../../../../utils/clipboard.js';
import { formatDate, truncateHash } from '../../../../utils/helper.js';
import { ValidatorIcon } from '../../../Icons/index.js';

interface ValidatorProps {
  mode: string;
  validator: ValidatorShowCase;
}

export function Validator (param: ValidatorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(param.validator.hash);
        } else {
          fallbackCopyTextToClipboard(param.validator.hash);
        }

        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    })();
  };

  const mediumRender = (
    <Link
      key={param.validator.index}
      style={{ color: 'inherit', textDecoration: 'none' }}
      to={`/jam/validator/${param.validator.index}/${param.validator.hash}`}
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
            color: '#311b92',
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            mr: 2,
            width: 40
          }}
        >
          <ValidatorIcon
            color={'#31927b'}
            size={20}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box
            alignItems='center'
            display='flex'
            flexDirection='row'
            gap='2px'
            justifyContent='start'
            marginLeft='-5px'
          >
            <Tooltip
              arrow
              placement='top'
              title={`Validator Index: ${param.validator.index}`}
            >
              <Typography
                color='#444444'
                fontSize='16px'
                ml='5px'
                sx={{
                  ':hover': {
                    color: '#31927b'
                  }
                }}
                variant='body2'
              >
                Validator {param.validator.index}
              </Typography>
            </Tooltip>
          </Box>
          <Typography
            color='#444444'
            variant='body2'
          >
            {formatDate(param.validator.lastSeenTime, 'short')}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Box
            alignItems='center'
            display='flex'
            flexDirection='row'
            justifyContent='end'
            marginRight='-5px'
          >
            <Tooltip
              arrow
              placement='top'
              title={`Headerhash: ${param.validator.hash}`}
            >
              <Typography
                fontSize='13px'
                sx={{
                  color: '#444444',
                  transition: 'all 0.3s ease-in-out'
                }}
                variant='subtitle2'
              >
                hash {truncateHash(param.validator.hash, 'long')}
              </Typography>
            </Tooltip>
            <Tooltip
              arrow
              placement='top'
              title={copied ? 'Copied!' : 'Copy headerhash'}
            >
              <IconButton onClick={handleCopy}>
                {!copied
                  ? (
                    <ContentCopy
                      sx={{ color: '#444444', height: '12px', width: '12px' }}
                    />
                  )
                  : (
                    <Check
                      sx={{ color: '#444444', height: '12px', width: '12px' }}
                    />
                  )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Link>
  );

  return <>{param.mode === 'medium' && mediumRender}</>;
}
