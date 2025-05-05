// Copyright 2017-2025 @polkadot/app-jamm author & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { NodeData } from 'json-edit-react';

import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface JsonRedirectButtonProps {
  nodeData: NodeData;
  headerHash: string; // Pass headerHash explicitly
}

const JsonRedirectButton: React.FC<JsonRedirectButtonProps> = ({ headerHash,
  nodeData }) => {
  const navigate = useNavigate();

  // Only render the button if the key is "header_hash" or "hash"
  if (nodeData.key !== 'header_hash' && nodeData.key !== 'hash') {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (nodeData.key === 'header_hash') {
      // For "header_hash", use nodeData.value as headerHash
      const localHeaderHash = nodeData.value as string;

      navigate(`/jam/block/${localHeaderHash}?type=hash`);
    } else if (nodeData.key === 'hash') {
      // For "hash", nodeData.value is the workPackageHash
      const workPackageHash = nodeData.value as string;

      console.log('headerHash is: ', headerHash);
      console.log('workPackageHash is: ', workPackageHash);
      navigate(`/jam/block/${headerHash}/workreport/${workPackageHash}`);
    }
  };

  return (
    <Button
      onClick={handleClick}
      size='small'
      sx={{ p: 0, minWidth: 'unset' }}
      variant='text'
    >
      <LaunchRoundedIcon fontSize='small' />
    </Button>
  );
};

export const JsonRedirectButtonDefinition = {
  condition: (key: string, value: unknown) =>
    key === 'header_hash' || key === 'hash',
  matches: (key: string, value: unknown): key is 'header_hash' | 'hash' =>
    key === 'header_hash' || key === 'hash',
  Element: JsonRedirectButton,
  onClick: (nodeData: NodeData, e: React.MouseEvent) => {
    console.log('Custom button onClick, key:', nodeData.key);
  }
};

export default JsonRedirectButton;
