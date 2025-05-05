// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ServiceInfoDetail, ServiceStatistics } from '../../../types/index.js';

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getServiceLastSeenTime } from '../../../utils/blockAnalyzer.js';
import { fallbackCopyTextToClipboard } from '../../../utils/clipboard.js';
import { ServiceIcon } from '../../Icons/index.js';
import { ItemMode } from '../index.js';

interface ServiceProps {
  mode: ItemMode;
  name: string;
  service?: ServiceInfoDetail;
}

export function Service (param: ServiceProps) {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [lastTime, setLastTime] = useState('');
  const statistics: ServiceStatistics | null =
    param.service?.statistics || null;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(param.name);
      } else {
        fallbackCopyTextToClipboard(param.name);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    (async () => {
      const time = await getServiceLastSeenTime(Number.parseInt(param.name));

      setLastTime(time);
    })();
  }, [param.name]);

  const gridRender = (
    <Box
      alignItems='center'
      display='flex'
      gap='2px'
      justifyContent='start'
      sx={{
        cursor: 'pointer',
        paddingInline: '5px',
        transition: 'all 0.3s ease-in-out',
        color: '#444444',
        ':hover': {
          color: '#311b92'
        }
      }}
    >
      <ServiceIcon
        color={'#311b92'}
        size={16}
      />
      <Tooltip
        arrow
        placement='top'
        title={`ServiceId: ${param.name}`}
      >
        <Typography
          fontSize='12px'
          onClick={() => {
            navigate(`/jam/service/${param.name}`);
          }}
          variant='subtitle2'
        >
          {param.service === undefined
            ? param.name
            : param.service.metadata.length === 0
              ? param.name
              : param.service.metadata}
        </Typography>
      </Tooltip>
      <Tooltip
        arrow
        placement='top'
        title={copied ? 'Copied!' : 'Copy service id'}
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

  const tableRender = (
    <Box
      alignItems='center'
      display='flex'
      gap='2px'
      justifyContent='start'
      sx={{
        cursor: 'pointer',
        paddingInline: '5px',
        transition: 'all 0.3s ease-in-out',
        color: '#444444',
        ':hover': {
          color: '#311b92'
        }
      }}
    >
      <Tooltip
        arrow
        placement='top'
        title={`ServiceId: ${param.name}`}
      >
        <Typography
          fontSize='16px'
          onClick={() => {
            navigate(`/jam/service/${param.name}`);
          }}
          variant='subtitle2'
        >
          {param.service === undefined
            ? param.name
            : param.service?.metadata.length === 0
              ? param.name
              : param.service?.metadata}
        </Typography>
      </Tooltip>
      <Tooltip
        arrow
        placement='top'
        title={copied ? 'Copied!' : 'Copy service id'}
      >
        <IconButton onClick={handleCopy}>
          {!copied
            ? (
              <ContentCopy
                sx={{ width: '13px', height: '13px', color: '#444444' }}
              />
            )
            : (
              <Check sx={{ width: '13px', height: '13px', color: '#444444' }} />
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
        transition: 'all 0.3s ease-in-out',
        color: '#444444',
        ':hover': {
          color: '#311b92'
        }
      }}
    >
      <Tooltip
        arrow
        placement='top'
        title={`ServiceId: ${param.name}`}
      >
        <Typography
          fontSize='12px'
          onClick={() => {
            navigate(`/jam/service/${param.name}`);
          }}
          sx={{ maxWidth: '70px' }}
          variant='subtitle2'
        >
          {param.service === undefined
            ? param.name
            : param.service?.metadata.length === 0
              ? param.name
              : param.service?.metadata}
        </Typography>
      </Tooltip>
      <Tooltip
        arrow
        placement='top'
        title={copied ? 'Copied!' : 'Copy service id'}
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
      key={param.name}
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/jam/service/${param.name}/`}
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
          <ServiceIcon
            color={'#311b92'}
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
              title={`ServiceId: ${param.name}`}
            >
              <Typography
                color='#444444'
                fontSize='16px'
                ml='5px'
                sx={{
                  ':hover': {
                    color: '#311b92'
                  }
                }}
                variant='body2'
              >
                {param.service === undefined ||
                param.service.metadata.length === 0
                  ? param.name
                  : param.service.metadata + ' (' + param.name + ')'}
              </Typography>
            </Tooltip>
          </Box>
          <Typography
            color='#444444'
            variant='body2'
          >
            {lastTime}
          </Typography>
        </Box>
        <Box
          alignItems='center'
          display='flex'
          flexDirection='row'
          gap='2px'
          justifyContent='end'
        >
          {!!statistics && statistics.provided_count !== 0 && (
            <Tooltip
              arrow
              placement='top'
              title={`Provided Count: ${statistics.provided_count}`}
            >
              <Typography
                fontSize='12px'
                sx={{
                  color: '#444444',
                  backgroundColor: '#00000030',
                  paddingInline: '2px',
                  borderRadius: '4px',
                  paddingTop: '2px'
                }}
                variant='subtitle2'
              >
                PC-{statistics?.provided_count}
              </Typography>
            </Tooltip>
          )}
          {!!statistics && statistics.exports !== 0 && (
            <Tooltip
              arrow
              placement='top'
              title={`Exports: ${statistics.exports}`}
            >
              <Typography
                fontSize='12px'
                sx={{
                  color: '#444444',
                  backgroundColor: '#00000030',
                  paddingInline: '2px',
                  borderRadius: '4px',
                  paddingTop: '2px'
                }}
                variant='subtitle2'
              >
                ES-{statistics?.exports}
              </Typography>
            </Tooltip>
          )}
          {!!statistics && statistics.extrinsic_count !== 0 && (
            <Tooltip
              arrow
              placement='top'
              title={`Extrinsic Count: ${statistics.extrinsic_count}`}
            >
              <Typography
                fontSize='12px'
                sx={{
                  color: '#444444',
                  backgroundColor: '#00000030',
                  paddingInline: '2px',
                  borderRadius: '4px',
                  paddingTop: '2px'
                }}
                variant='subtitle2'
              >
                EC-{statistics?.extrinsic_count}
              </Typography>
            </Tooltip>
          )}
          {!!statistics && statistics.accumulate_count !== 0 && (
            <Tooltip
              arrow
              placement='top'
              title={`Accumulate Count: ${statistics.accumulate_count}`}
            >
              <Typography
                fontSize='12px'
                sx={{
                  color: '#444444',
                  backgroundColor: '#00000030',
                  paddingInline: '2px',
                  borderRadius: '4px',
                  paddingTop: '2px'
                }}
                variant='subtitle2'
              >
                AC-{statistics?.accumulate_count}
              </Typography>
            </Tooltip>
          )}
          {!!statistics && statistics.on_transfers_count !== 0 && (
            <Tooltip
              arrow
              placement='top'
              title={`Transfers Count: ${statistics.on_transfers_count}`}
            >
              <Typography
                fontSize='12px'
                sx={{
                  color: '#444444',
                  backgroundColor: '#00000030',
                  paddingInline: '2px',
                  borderRadius: '4px',
                  paddingTop: '2px'
                }}
                variant='subtitle2'
              >
                TC-{statistics?.on_transfers_count}
              </Typography>
            </Tooltip>
          )}
        </Box>
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
      <ServiceIcon
        color={'#444'}
        size={24}
      />
      <Typography
        fontSize='32px'
        variant='subtitle2'
      >
        Service
      </Typography>
      <Typography
        fontSize='24px'
        mt={1}
        variant='subtitle2'
      >
        {param.name}
      </Typography>
    </Box>
  );

  return (
    <>
      {param.mode === ItemMode.Grid && gridRender}
      {param.mode === ItemMode.Small && smallRender}
      {param.mode === ItemMode.Medium && mediumRender}
      {param.mode === ItemMode.Large && largeRender}
      {param.mode === ItemMode.Table && tableRender}
    </>
  );
}
