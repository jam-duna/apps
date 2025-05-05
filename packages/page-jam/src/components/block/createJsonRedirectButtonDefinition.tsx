// Copyright 2017-2025 @polkadot/app-jamm author & contributors
// SPDX-License-Identifier: Apache-2.0

// createJsonRedirectButtonDefinition.ts
import type { NodeData } from 'json-edit-react';

import React from 'react';

import JsonRedirectButton from './JsonRedirectButton.js';

export const createJsonRedirectButtonDefinition = (headerHash: string) => {
  // console.log("the header is:", headerHash);

  return {
    Element: (props: { nodeData: NodeData }) => (
      <JsonRedirectButton
        {...props}
        headerHash={headerHash}
      />
    ),
    condition: (key: string, _value: unknown) =>
      key === 'header_hash' || key === 'hash',
    matches: (key: string, _value: unknown): key is 'header_hash' | 'hash' =>
      key === 'header_hash' || key === 'hash',
    onClick: (nodeData: NodeData, _e: React.MouseEvent) => {
      console.log('Custom button onClick, key:', nodeData.key);
    }
  };
};
