// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result?: unknown;
  error?: unknown;
}

export async function fetchTraceBlock (
  hash: string,
  rpcUrl: string
): Promise<JsonRpcResponse | null> {
  console.log('[RPC-CALL] Fetching trace block by hash: ', hash);
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.TraceBlock',
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
    // console.error("Error fetching service:", err);
    return null;
  }
}
