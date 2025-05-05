// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { State } from '../db/db.js';

interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result?: State;
  error?: unknown;
}

export async function fetchState (
  hash: string,
  rpcUrl: string
): Promise<JsonRpcResponse | null> {
  console.log('[RPC-CALL] Fetching state for hash: ', hash);
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.State',
    params: [hash]
  };

  try {
    const response = await fetch(rpcUrl, {
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await response.json();
  } catch (_err) {
    // console.error("Error fetching state:", err);
    return null;
  }
}
