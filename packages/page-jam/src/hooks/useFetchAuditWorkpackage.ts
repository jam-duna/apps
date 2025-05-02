export async function fetchAuditWorkPackage(
  hash: string,
  rpcUrl: string
): Promise<any> {
  console.log("[RPC-CALL] Fetching audit work packge by hash: ", hash);
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "jam.AuditWorkPackage",
    params: [hash],
  };
  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (err) {
    //console.error("Error fetching service:", err);
    return null;
  }
}
