// mock/jam/rpc-hack.ts
import { rpc as jamRpc } from './jam/rpc.js';

// treat the entire jamRpc as `any`
const _jam: Record<string, any> = jamRpc as any;

// loop over every method and mutate in place
(Object.entries(_jam) as [string, any][]).forEach(([ method, def ]) => {
  def.isSubscription = !!def.pubsub;       // subscription?
  def.jsonrpc       = `jam_${method}`;     // section_method
  def.method        = method;              // method name
  def.section       = 'jam';               // section name
});

// now export the patched map
export const jsonrpc = {
    jam: _jam as any
  };
