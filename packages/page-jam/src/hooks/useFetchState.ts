import { State } from "../db/db.js";

export async function fetchState(
  hash: string,
  rpcUrl: string
): Promise<State | null> {
  console.log("[RPC-CALL] Fetching state for hash: ", hash);
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "jam.State",
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
    //console.error("Error fetching state:", err);
    return null;
  }
}
