// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Block } from '../db/db.js';

export async function fetchBlock (
  searchValue: string,
  rpcUrl: string,
  type: 'hash' | 'slot'
): Promise<Block | null> {
  console.log(`[RPC-CALL] Fetching block for ${type}: `, searchValue);

  // Decide on method and parameter based on type.
  let methodName = 'jam.Block';
  const paramValue: string = searchValue;

  if (type === 'slot') {
    methodName = 'jam.Block';

    // Validate that searchValue represents a valid number,
    // but keep it as a string.
    if (isNaN(Number(searchValue))) {
      throw new Error('Invalid slot number');
    }
    // paramValue remains the string version of searchValue.
  }

  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: methodName,
    params: [paramValue]
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
    // console.error("Error fetching block:", err);
    return null;
  }
}
