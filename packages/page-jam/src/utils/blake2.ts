import { blake2b } from "@noble/hashes/blake2b";

export function hexToBytes(hex: string) {
  if (hex.startsWith("0x")) hex = hex.slice(2);
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

export function calculateHash(hex: string) {
  const bytes = hexToBytes(hex);
  const hash = blake2b(bytes, { dkLen: 32 });
  const hexOut = Array.from(hash)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hexOut;
}

// Convert bytes to hex string
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Encode a uint32 into a 4-byte Uint8Array in little-endian order
export function putUint32LE(value: number): Uint8Array {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setUint32(0, value, true); // true = little endian
  return new Uint8Array(buffer);
}

// Go-style ServiceStorageKey
export function ServiceStorageKey(
  serviceIndex: number,
  keyBytes: Uint8Array
): Uint8Array {
  const sb = putUint32LE(serviceIndex);
  const combined = new Uint8Array(sb.length + keyBytes.length);
  combined.set(sb);
  combined.set(keyBytes, sb.length);
  return blake2b(combined, { dkLen: 32 }); // returns Uint8Array
}

// Go-style ComputeStorageKeyInternal
export function ComputeStorageKeyInternal(keyHash: Uint8Array): Uint8Array {
  const prefix = putUint32LE(0xffffffff);
  const sliced = keyHash.slice(0, 28); // use first 28 bytes
  const final = new Uint8Array(prefix.length + sliced.length);
  final.set(prefix);
  final.set(sliced, prefix.length);
  return final;
}
