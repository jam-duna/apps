// [object Object]
// SPDX-License-Identifier: Apache-2.0

import type { ValidatorShowCase } from '../../../../types/index.js';

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fallbackCopyTextToClipboard } from '../../../../utils/clipboard.js';
import { formatDate, truncateHash } from '../../../../utils/helper.js';
import { ValidatorIcon } from '../../../Icons/index.js';
import { ItemMode } from '../../index.js';

interface ValidatorProps {
  mode: string;
  validator: ValidatorShowCase;
}

export function Validator (param: ValidatorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

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
  };

  const mediumRender = (
    <Link
      key={param.validator.index}
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/jam/validator/${param.validator.index}/${param.validator.hash}`}
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
            color: '#311b92',
            border: '1px solid #ddd',
            mr: 2
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
        </Box>
      </Box>
    </Link>
  );

  return <>{param.mode === ItemMode.Medium && mediumRender}</>;
}
