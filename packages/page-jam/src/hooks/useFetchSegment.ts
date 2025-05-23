// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

function base64ToHex (base64: string): string {
  const buffer = Buffer.from(base64, 'base64');

  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function fetchSegment (
  hash: string,
  segmentIndex: number,
  rpcUrl: string
): Promise<string | null> {
  console.log('[RPC-CALL] Fetching segment:', segmentIndex, 'for hash:', hash);
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'jam.Segment',
    params: [hash, segmentIndex.toString()]
  };

  try {
    const response = await fetch(rpcUrl, {
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const base64Data = result.segment;

    if (!base64Data) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const hexData = base64ToHex(base64Data);

    return hexData;
  } catch (_err) {
    // console.error("Error fetching segment:", _err);
    return null;
  }
}
