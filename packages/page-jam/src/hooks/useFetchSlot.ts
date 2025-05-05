// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result?: unknown;
  error?: unknown;
}

export async function fetchBlockBySlot (
  slot: string,
  rpcUrl: string
): Promise<JsonRpcResponse | null> {
  console.log('[RPC-CALL] Fetching block for slot: ', slot);
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.Block',
    params: [slot]
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
