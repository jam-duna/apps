// mock/jsonrpc.js
// ↑ add this at the very top of the file:
 // @ts-nocheck

 import { objectSpread } from '@polkadot/util';
 import * as defs from './definitions.js';
 
 const jsonrpc = {
  
 };

 console.log(defs);
 
 Object
   .keys(defs)                    // no more “implicitly has 'any'” errors
   .forEach((s) =>
     Object
       .entries((defs as any)[s].rpc || {})   // cast defs[s] to any
       .forEach(([method, def]) => {
         const section = (def as any).aliasSection || s;
         if (!(jsonrpc as any)[section]) {
           (jsonrpc as any)[section] = {};
         }
         (jsonrpc as any)[section][method] = objectSpread({}, def, {
           isSubscription: !!(def as any).pubsub,
           jsonrpc:        `${section}_${method}`,
           method,
           section
         });
       })
   );
 
 export default jsonrpc;
 