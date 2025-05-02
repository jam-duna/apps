// [object Object]
// SPDX-License-Identifier: Apache-2.0

export async function fetchServiceInfo (
  id: string,
  rpcUrl: string
): Promise<any> {
  console.log('[RPC-CALL] Fetching service by id: ', id);
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'jam.ServiceInfo',
    params: [id]
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

export async function fetchServiceValue (
  id: string,
  hash: string,
  rpcUrl: string
): Promise<string> {
  console.log('[RPC-CALL] Fetching service value by id: ', id);
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'jam.ServiceValue',
    params: [id, hash]
  };
  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const text = await response.text();

  console.log('[RPC-CALL] service value response', text);

  return text;
}
