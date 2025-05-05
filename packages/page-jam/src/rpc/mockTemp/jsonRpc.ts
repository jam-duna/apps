// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { rpc as jamRpc } from './jam/rpc.js';

// treat the entire jamRpc as `any`
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const _jam: Record<string, any> = jamRpc as any;

// loop over every method and mutate in place
(Object.entries(_jam)).forEach(([method, def]) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  def.isSubscription = !!def.pubsub; // subscription?
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  def.jsonrpc = `jam_${method}`; // section_method
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  def.method = method; // method name
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  def.section = 'jam'; // section name
});

// now export the patched map
export const jsonrpc = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  jam: _jam as any
};
