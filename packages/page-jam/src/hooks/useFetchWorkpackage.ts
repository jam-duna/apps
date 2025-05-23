// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

export async function fetchWorkPackage (
  hash: string,
  rpcUrl: string
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
): Promise<any | null> {
  console.log('[RPC-CALL] Fetching work packge by hash: ', hash);
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.WorkPackage',
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
