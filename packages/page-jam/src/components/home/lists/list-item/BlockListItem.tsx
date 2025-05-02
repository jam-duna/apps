// src/components/BlockListItem.tsx

'use client';

import type { Block } from '../../../../db/db.js';

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fallbackCopyTextToClipboard } from '../../../../utils/clipboard.js';
import { calculateExtrinsicCounts } from '../../../../utils/extrinsics.js';
import { getRelativeTime, truncateHash } from '../../../../utils/helper.js';
import { BlockIcon, SlotIcon } from '../../../Icons/index.js';
import { ExtrA, ExtrD, ExtrG, ExtrP, ExtrT } from '../../../jamitem/index.js';

export interface BlockListItemProps {
  blockItem: Block;
}

export default function BlockListItem ({ blockItem }: BlockListItemProps) {
  const slot = blockItem.header.slot;
  const createdAt = blockItem?.overview?.createdAt;
  const relativeTime = createdAt ? getRelativeTime(createdAt) : 'N/A';
  const headerHash = blockItem?.overview?.headerHash || '';
  const shortHash = truncateHash(headerHash, 'long');

  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(headerHash);
      } else {
        fallbackCopyTextToClipboard(headerHash);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Link
      key={headerHash}
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/jam/block/${headerHash}?type=hash`}
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
            border: '1px solid #ddd',
            mr: 2
          }}
        >
          <BlockIcon
            color={'#224444D0'}
            size={16}
          />
        </Box>
        {/* Middle: Slot info */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              gap: '5px'
            }}
          >
            <SlotIcon
              color={'#444'}
              size={16}
            />
            <Typography variant='subtitle1'>Slot {slot}</Typography>
          </Box>
          <Typography
            color='textSecondary'
            variant='body2'
          >
            {relativeTime} ago
          </Typography>
        </Box>
        {/* Right: truncated block hash */}
        <Box
          display='flex'
          flexDirection='column'
        >
          <Box
            alignItems='center'
            display='flex'
            flexDirection='row'
            gap='2px'
            justifyContent='end'
            marginRight='-5px'
          >
            <Typography
              fontSize='13px'
              sx={{ color: '#444444' }}
              variant='body2'
            >
              hash
            </Typography>
            <Tooltip
              arrow
              placement='top'
              title={`Block header_hash: ${headerHash}`}
            >
              <Typography
                fontSize='13px'
                sx={{ color: '#444444' }}
                variant='body2'
              >
                {shortHash}
              </Typography>
            </Tooltip>
            <Tooltip
              arrow
              placement='top'
              title={copied ? 'Copied!' : 'Copy block header_hash'}
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
          <Box
            alignItems='center'
            display='flex'
            flexDirection='row'
            gap='2px'
            justifyContent='end'
          >
            {calculateExtrinsicCounts(blockItem.extrinsic).guaranteesCount >
              0 && (
              <ExtrG
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).guaranteesCount
                }
                mode='tiny'
              />
            )}
            {calculateExtrinsicCounts(blockItem.extrinsic).assurancesCount >
              0 && (
              <ExtrA
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).assurancesCount
                }
                mode='tiny'
              />
            )}
            {calculateExtrinsicCounts(blockItem.extrinsic).ticketsCount > 0 && (
              <ExtrT
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).ticketsCount
                }
                mode='tiny'
              />
            )}
            {calculateExtrinsicCounts(blockItem.extrinsic).disputesCount >
              0 && (
              <ExtrD
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).disputesCount
                }
                mode='tiny'
              />
            )}
            {calculateExtrinsicCounts(blockItem.extrinsic).preimagesCount >
              0 && (
              <ExtrP
                count={
                  calculateExtrinsicCounts(blockItem.extrinsic).preimagesCount
                }
                mode='tiny'
              />
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
