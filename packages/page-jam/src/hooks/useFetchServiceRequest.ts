// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

interface ServiceRequestResponse {
  status: number;
  jsonrpc: string;
  id: number;
  result?: unknown;
  error?: unknown;
}

export async function fetchServiceRequest (service: string, hash: string, length: string, rpcUrl: string): Promise<ServiceRequestResponse | null> {
  console.log('[RPC-CALL] Fetching service request by service, hash, length: ', service, hash, length);
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.ServiceRequest',
    params: [service, hash, length]
  };

  try {
    const response = await fetch(rpcUrl, {
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });

    return await response.json() as ServiceRequestResponse;
  } catch (_err) {
    // console.error("Error fetching service:", _err);
    return null;
  }
}
