// Copyright 2017-2025 @polkadot/app-jamm author & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { NodeData } from 'json-edit-react'; // Use the library's NodeData type

import { Button } from '@mui/material';
import React from 'react';

interface RouteButtonValue {
  target: string;
}

const RouteButton: React.FC<{ nodeData: NodeData }> = ({ nodeData }) => {
  const handleClick = () => {
    const target =
      typeof nodeData.value === 'string' && nodeData.value.startsWith('http')
        ? nodeData.value
        : '/';

    window.location.href = target;
  };

  return (
    <Button
      onClick={handleClick}
      size='small'
      variant='outlined'
    >
      {'>'}
    </Button>
  );
};

export const CustomRouteButtonDefinition = {
  condition: (key: string, value: unknown): value is RouteButtonValue =>
    typeof value === 'object' && value !== null && 'target' in value,
  matches: (key: string, value: unknown): key is string => true,
  Element: RouteButton,
  onClick: (nodeData: NodeData, e: React.MouseEvent) => {
    // No-op because RouteButton handles its own onClick.
  }
};
