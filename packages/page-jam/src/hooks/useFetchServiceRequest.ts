// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

export async function fetchServiceRequest (service: string, hash: string, length: string, rpcUrl: string): Promise<any> {
  console.log('[RPC-CALL] Fetching service request by service, hash, length: ', service, hash, length);
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'jam.ServiceRequest',
    params: [service, hash, length]
  };

  try {
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (err) {
    // console.error("Error fetching service:", err);
    return null;
  }
}
