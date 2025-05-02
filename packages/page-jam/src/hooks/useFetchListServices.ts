// [object Object]
// SPDX-License-Identifier: Apache-2.0

export async function fetchListServices (rpcUrl: string): Promise<any[]> {
  console.log('[RPC-CALL] Fetching serive list');
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'jam.ListServices',
    params: []
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
    return [];
  }
}
