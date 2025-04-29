// Copyright 2017-2025 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { rpcSubscribeBestBlock, rpcSubscribeStatistics, rpcSubscribeServiceInfo, rpcSubscribeServiceValue, rpcSubscribeServicePreimage, rpcSubscribeServiceRequest, rpcSubscribeWorkPackage } from './rpc-examples.js';


export { makeWrapper } from './wrapping.js';

export const allSnippets = [
  rpcSubscribeBestBlock,
  rpcSubscribeStatistics,
  rpcSubscribeServiceInfo,
  rpcSubscribeServiceValue,
  rpcSubscribeServicePreimage,
  rpcSubscribeServiceRequest,
  rpcSubscribeWorkPackage,
] as const;
