// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EndpointOption } from './types.js';

import { chainsColorfulnotionPNG, chainsJamdunaPNG } from '@polkadot/apps-config/ui/logos/chains';

export const jamChains: Omit<EndpointOption, 'teleport'>[] = [
  {
    info: 'jam duna',
    providers: {
      'jam': 'wss://jam-0.jamduna.org/ws'
    },
    text: 'JAM DUNA',
    ui: {
      color: '#F23232',
      logo: chainsJamdunaPNG,
    }
  },
  {
    info: 'colorful notion',
    providers: {
      'dot': 'wss://dot-0.jamduna.org/ws'
    },
    text: 'Colorful Notion',
    ui: {
      color: '#F23232',
      logo: chainsColorfulnotionPNG,
    }
  },
];