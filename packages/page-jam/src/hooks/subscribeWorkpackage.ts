// [object Object]
// SPDX-License-Identifier: Apache-2.0

'use client';

import { useEffect, useRef } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { normalizeEndpoint } from '../utils/ws.js';

interface Params {
  endpoint: string;
  hash: string;
  setStatus: (status: string) => void;
}

export function useSubscribeWorkpackage ({ endpoint, hash, setStatus }: Params) {
  const wsRef = useRef<WebSocket | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    const normalEndpoint = normalizeEndpoint(endpoint);

    if (wsRef.current && wsRef.current.url !== normalEndpoint) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (!wsRef.current) {
      console.log('[WS-LOG] workpackage init');

      const createWS = () => {
        const ws = new WebSocket(normalEndpoint);

        ws.onopen = () => {
          console.log('[WS-LOG] workpackage opened');
          const msg = {
            method: 'subscribeWorkPackage',
            params: { hash }
          };

          ws.send(JSON.stringify(msg));
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);

          console.log('[WS-LOG] workpackage', msg);

          if (msg.method === 'subscribeWorkPackage' && msg.result) {
            setStatus(msg.result.status);
          }
        };

        ws.onclose = () => {
          console.log('[WS-LOG] workpackage closed');
          setTimeout(() => {
            if (!isMounted()) {
              return;
            }

            console.log('[WS-LOG] reopening websocket');
            wsRef.current = createWS();
          }, 3000);
        };

        return ws;
      };

      wsRef.current = createWS();
    }

    return () => {
      console.log('[WS-LOG] workpackage close unmount');
      wsRef.current?.close();
    };
  }, [endpoint, hash, wsRef.current?.url]);
}
