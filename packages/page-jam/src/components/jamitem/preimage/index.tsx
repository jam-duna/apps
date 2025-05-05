// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fallbackCopyTextToClipboard } from '../../../utils/clipboard.js';
import { truncateHash } from '../../../utils/helper.js';
import { PreimageIcon, WorkPackageIcon } from '../../Icons/index.js';
import { ItemMode } from '../index.js';

interface PreimageProps {
  mode: ItemMode;
  hash: string;
  service: string;
}

export function Preimage ({ hash, mode, service }: PreimageProps) {
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
      to={`/jam/preimage/${service}/${hash}/`}
    >
      <Box
        alignItems='center'
        display='flex'
        gap='2px'
        justifyContent='start'
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          color: '#444444',
          textDecoration: 'none',
          ':hover': {
            color: '#311b92c0',
            textDecoration: 'underline'
          }
        }}
      >
        <Tooltip
          arrow
          placement='top'
          title={`Link to: /jam/preimage/${service}/${hash}/`}
        >
          <Typography
            fontSize='15px'
            variant='subtitle2'
          >
            {hash}
          </Typography>
        </Tooltip>
        <Tooltip
          arrow
          placement='top'
          title={copied ? 'Copied!' : 'Copy preimage hash'}
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
    </Link>
  );

  const largeRender = (
    <Box
      alignItems='center'
      display='flex'
      gap='5px'
      justifyContent='start'
      sx={{
        cursor: 'pointer',
        paddingInline: '5px',
        transition: 'all 0.3s ease-in-out',
        color: '#444444'
      }}
    >
      <PreimageIcon
        color={'#444'}
        size={24}
      />
      <Typography
        fontSize='32px'
        variant='subtitle2'
      >
        Preimage
      </Typography>
    </Box>
  );

  return (
    <>
      {mode == ItemMode.Small && smallRender}
      {mode == ItemMode.Medium && mediumRender}
      {mode == ItemMode.Large && largeRender}
    </>
  );
}
