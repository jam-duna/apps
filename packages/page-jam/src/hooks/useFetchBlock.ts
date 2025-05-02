// [object Object]
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
    jsonrpc: '2.0',
    id: 1,
    method: methodName,
    params: [paramValue]
  };

  try {
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (err) {
    // console.error("Error fetching block:", err);
    return null;
  }
}
