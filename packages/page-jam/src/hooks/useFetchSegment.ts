function base64ToHex(base64: string): string {
  const binary = atob(base64);
  return Array.from(binary)
    .map(b => b.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

export async function fetchSegment(
  hash: string,
  segmentIndex: number,
  rpcUrl: string
): Promise<string | null> {
  console.log("[RPC-CALL] Fetching segment:", segmentIndex, "for hash:", hash);
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "jam.Segment",
    params: [hash, segmentIndex.toString()],
  };
  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    const base64Data = result.segment as string;
    const hexData = base64ToHex(base64Data);
    return hexData;
  } catch (err) {
    // console.error("Error fetching segment:", err);
    return null;
  }
}
