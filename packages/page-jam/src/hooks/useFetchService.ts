// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

export async function fetchServiceInfo (
  id: string,
  rpcUrl: string
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
): Promise<any | null> {
  console.log('[RPC-CALL] Fetching service by id: ', id);
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.ServiceInfo',
    params: [id]
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
    // console.error("Error fetching service:", _err);
    return null;
  }
}

export async function fetchServiceValue (
  id: string,
  hash: string,
  rpcUrl: string
): Promise<string> {
  console.log('[RPC-CALL] Fetching service value by id: ', id);
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.ServiceValue',
    params: [id, hash]
  };
  const response = await fetch(rpcUrl, {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });
  const text = await response.text();

  console.log('[RPC-CALL] service value response', text);

  return text;
}
