// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

export async function fetchStatistics (
  hash: string,
  rpcUrl: string
): Promise<any | null> {
  console.log('[RPC-CALL] Fetching statistics for ', hash);

  // Decide on method and parameter based on type.
  const methodName = 'jam.Statistics';

  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: methodName,
    params: [hash]
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
