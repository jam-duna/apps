// Copyright 2017-2025 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Snippet } from '../types.js';

// We must fix this :(
/* eslint-disable sort-keys */

export const rpcSubscribeBestBlock: Snippet = {
  value: 'rpcSubscribeBestBlock',
  text: 'Listen to new head',
  label: { color: 'pink', children: 'RPC', size: 'tiny' },
  code: `// Establish WebSocket connection
const socket = new WebSocket('ws://dot-0.jamduna.org:10800/ws');
socket.onopen    = () => console.log('WebSocket connected.');
socket.onmessage = (e) => console.log('Received:', e.data);
socket.onerror   = (e) => console.error('WebSocket error:', e);
socket.onclose   = () => console.log('WebSocket closed.');

// Helper to send JSON‑RPC over WS
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    console.log('Sent:', message);
  } else {
    console.log('WebSocket not connected.');
  }
}

// — Subscription Call (no params needed) —
sendMessage({
  method: 'subscribeBestBlock'
});
`
};

export const rpcSubscribeStatistics: Snippet = {
  value: 'rpcSubscribeStatistics',
  text: 'Listen to new statistics updates',
  label: { color: 'pink', children: 'RPC', size: 'tiny' },
  code: `// Establish WebSocket connection
const socket = new WebSocket('ws://dot-0.jamduna.org:10800/ws');
socket.onopen    = () => console.log('WebSocket connected.');
socket.onmessage = (e) => console.log('Received:', e.data);
socket.onerror   = (e) => console.error('WebSocket error:', e);
socket.onclose   = () => console.log('WebSocket closed.');

// Helper to send JSON‑RPC over WS
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    console.log('Sent:', message);
  } else {
    console.log('WebSocket not connected.');
  }
}

// — Subscription Call (empty params) —
sendMessage({
  method: 'subscribeStatistics',
  params: {}
});
`
};

export const rpcSubscribeServiceInfo: Snippet = {
  value: 'rpcSubscribeServiceInfo',
  text: 'Listen to service info updates',
  label: { color: 'pink', children: 'RPC', size: 'tiny' },
  code: `// Establish WebSocket connection
const socket = new WebSocket('ws://dot-0.jamduna.org:10800/ws');
socket.onopen    = () => console.log('WebSocket connected.');
socket.onmessage = (e) => console.log('Received:', e.data);
socket.onerror   = (e) => console.error('WebSocket error:', e);
socket.onclose   = () => console.log('WebSocket closed.');

// Helper to send JSON‑RPC over WS
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    console.log('Sent:', message);
  } else {
    console.log('WebSocket not connected.');
  }
}

// — Param Declaration —
// Fill in your service ID below:
const serviceID = '<FILL_SERVICE_ID>';
const params = { serviceID };

// — Subscription Call —
sendMessage({
  method: 'subscribeServiceInfo',
  params
});
`
};

export const rpcSubscribeServiceValue: Snippet = {
  value: 'rpcSubscribeServiceValue',
  text: 'Listen to service value updates',
  label: { color: 'pink', children: 'RPC', size: 'tiny' },
  code: `// Establish WebSocket connection
const socket = new WebSocket('ws://dot-0.jamduna.org:10800/ws');
socket.onopen    = () => console.log('WebSocket connected.');
socket.onmessage = (e) => console.log('Received:', e.data);
socket.onerror   = (e) => console.error('WebSocket error:', e);
socket.onclose   = () => console.log('WebSocket closed.');

// Helper to send JSON‑RPC over WS
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    console.log('Sent:', message);
  } else {
    console.log('WebSocket not connected.');
  }
}

// — Param Declaration —
// Fill in your service ID and value hash below:
const serviceID = '<FILL_SERVICE_ID>';
const hash      = '<FILL_VALUE_HASH>';
const params: any = { serviceID };
if (hash) {
  params.hash = hash;
}

// — Subscription Call —
sendMessage({
  method: 'subscribeServiceValue',
  params
});
`
};

export const rpcSubscribeServicePreimage: Snippet = {
  value: 'rpcSubscribeServicePreimage',
  text: 'Listen to service preimage updates',
  label: { color: 'pink', children: 'RPC', size: 'tiny' },
  code: `// Establish WebSocket connection
const socket = new WebSocket('ws://dot-0.jamduna.org:10800/ws');
socket.onopen    = () => console.log('WebSocket connected.');
socket.onmessage = (e) => console.log('Received:', e.data);
socket.onerror   = (e) => console.error('WebSocket error:', e);
socket.onclose   = () => console.log('WebSocket closed.');

// Helper to send JSON‑RPC over WS
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    console.log('Sent:', message);
  } else {
    console.log('WebSocket not connected.');
  }
}

// — Param Declaration —
// Fill in your service ID and preimage hash below:
const serviceID = '<FILL_SERVICE_ID>';
const hash      = '<FILL_PREIMAGE_HASH>';
if (!hash) {
  console.log('Preimage hash is required');
}
const params = { serviceID, hash };

// — Subscription Call —
sendMessage({
  method: 'subscribeServicePreimage',
  params
});
`
};

export const rpcSubscribeServiceRequest: Snippet = {
  value: 'rpcSubscribeServiceRequest',
  text: 'Listen to service request updates',
  label: { color: 'pink', children: 'RPC', size: 'tiny' },
  code: `// Establish WebSocket connection
const socket = new WebSocket('ws://dot-0.jamduna.org:10800/ws');
socket.onopen    = () => console.log('WebSocket connected.');
socket.onmessage = (e) => console.log('Received:', e.data);
socket.onerror   = (e) => console.error('WebSocket error:', e);
socket.onclose   = () => console.log('WebSocket closed.');

// Helper to send JSON‑RPC over WS
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    console.log('Sent:', message);
  } else {
    console.log('WebSocket not connected.');
  }
}

// — Param Declaration —
// Fill in your service ID and request hash below:
const serviceID = '<FILL_SERVICE_ID>';
const hash      = '<FILL_REQUEST_HASH>';
if (!hash) {
  console.log('Request hash is required');
}
const params = { serviceID, hash };

// — Subscription Call —
sendMessage({
  method: 'subscribeServiceRequest',
  params
});
`
};

export const rpcSubscribeWorkPackage: Snippet = {
  value: 'rpcSubscribeWorkPackage',
  text: 'Listen to work package updates',
  label: { color: 'pink', children: 'RPC', size: 'tiny' },
  code: `// Establish WebSocket connection
const socket = new WebSocket('ws://dot-0.jamduna.org:10800/ws');
socket.onopen    = () => console.log('WebSocket connected.');
socket.onmessage = (e) => console.log('Received:', e.data);
socket.onerror   = (e) => console.error('WebSocket error:', e);
socket.onclose   = () => console.log('WebSocket closed.');

// Helper to send JSON‑RPC over WS
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    console.log('Sent:', message);
  } else {
    console.log('WebSocket not connected.');
  }
}

// — Param Declaration —
// Fill in your work package hash below:
const hash = '<FILL_WORKPACKAGE_HASH>';
if (!hash) {
  console.log('WorkPackage hash is required');
}
const params = { hash };

// — Subscription Call —
sendMessage({
  method: 'subscribeWorkPackage',
  params
});
`
};
