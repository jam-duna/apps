// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable */

import { objectSpread } from '@polkadot/util';

import * as defs from './definitions.js';

interface RpcMethodDefinition {
  description: string;
  params: Array<{
    description: string;
    name: string;
    type: string;
  }>;
  result: {
    description: string;
    type: string;
    fields?: Array<{
      name: string;
      type: string;
    }>;
  };
  type: string;
  aliasSection?: string;
  pubsub?: boolean;
}

const jsonrpc = {

};

console.log(defs);

Object
  .keys(defs)
  .forEach((s) =>
    Object
      .entries((defs as any)[s].rpc || {})
      .forEach(([method, def]) => {
        const section = (def as RpcMethodDefinition).aliasSection || s;

        if (!(jsonrpc as any)[section]) {
          (jsonrpc as any)[section] = {};
        }

        (jsonrpc as any)[section][method] = objectSpread({}, def as RpcMethodDefinition, {
          isSubscription: !!(def as RpcMethodDefinition).pubsub,
          jsonrpc: `${section}_${method}`,
          method,
          section
        });
      })
  );

export default jsonrpc;
