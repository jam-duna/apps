// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { ServiceValue } from '../types/index.js';

import { useEffect, useRef } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { normalizeEndpoint } from '../utils/ws.js';

interface Params {
  endpoint: string;
  serviceID: string;
  setStatus: (status: ServiceValue) => void;
}

export function useSubscribeServiceValue ({ endpoint,
  serviceID,
  setStatus }: Params) {
  const wsRef = useRef<WebSocket | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    const normalEndpoint = normalizeEndpoint(endpoint);

    if (wsRef.current && wsRef.current.url !== normalEndpoint) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (!wsRef.current) {
      console.log('[WS-LOG] servicevalue init');

      const createWS = () => {
        const ws = new WebSocket(normalEndpoint);

        ws.onopen = () => {
          console.log('[WS-LOG] servicevalue opened');
          const msg = {
            method: 'subscribeServiceValue',
            params: { serviceID }
          };

          ws.send(JSON.stringify(msg));
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);

          console.log('[WS-LOG] servicevalue', msg);

          if (msg.method === 'subscribeServiceValue' && msg.result) {
            setStatus(msg.result);
          }
        };

        ws.onclose = () => {
          console.log('[WS-LOG] servicevalue closed');
          setTimeout(() => {
            if (!isMounted()) {
              return;
            }

            console.log('[WS-LOG] reopening servicevalue');
            wsRef.current = createWS();
          }, 3000);
        };

        return ws;
      };

      wsRef.current = createWS();
    }

    return () => {
      console.log('[WS-LOG] servicevalue close unmount');
      wsRef.current?.close();
    };
  }, [endpoint, serviceID, wsRef.current?.url]);
}
