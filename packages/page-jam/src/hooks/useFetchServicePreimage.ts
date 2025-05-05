// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

interface ServicePreimageResponse {
  jsonrpc: string;
  id: number;
  result?: unknown;
  error?: unknown;
}

export async function fetchServicePreimage (service: string, hash: string, rpcUrl: string): Promise<ServicePreimageResponse | null> {
  console.log('[RPC-CALL] Fetching service preimage by hash and service', service, hash);
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.ServicePreimage',
    params: [service, hash]
  };

  try {
    const response = await fetch(rpcUrl, {
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });

    return await response.json() as ServicePreimageResponse;
  } catch (_err) {
    // console.error("Error fetching service:", _err);
    return null;
  }
}
