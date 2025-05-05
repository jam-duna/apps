// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

export async function fetchListServices (rpcUrl: string): Promise<any[]> {
  console.log('[RPC-CALL] Fetching serive list');
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.ListServices',
    params: []
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
    // console.error("Error fetching service:", err);
    return [];
  }
}
