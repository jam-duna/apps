// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { ServicePreimage } from '../types/index.js';

import { useEffect, useRef } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { normalizeEndpoint } from '../utils/ws.js';

interface Params {
  endpoint: string;
  serviceID: string;
  hash: string;
  setPreimage: (preimage: ServicePreimage) => void;
  setRequest: (request: string) => void;
}

export function useSubscribeServicePreimage ({ endpoint,
  hash,
  serviceID,
  setPreimage,
  setRequest }: Params) {
  const wsRef = useRef<WebSocket | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    const normalEndpoint = normalizeEndpoint(endpoint);

    if (wsRef.current && wsRef.current.url !== normalEndpoint) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (!wsRef.current) {
      console.log('[WS-LOG] service preimage init');

      const createWS = () => {
        const ws = new WebSocket(normalEndpoint);

        ws.onopen = () => {
          console.log('[WS-LOG] service preimage opened');
          const msgP = {
            method: 'subscribeServicePreimage',
            params: { hash, serviceID }
          };

          ws.send(JSON.stringify(msgP));
          const msgR = {
            method: 'subscribeServiceRequest',
            params: { hash, serviceID }
          };

          ws.send(JSON.stringify(msgR));
        };

        ws.onmessage = (event) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
          const msg = JSON.parse(event.data);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.log('[WS-LOG] service preimage', msg.result);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (msg.method === 'subscribeServicePreimage' && msg.result) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            setPreimage(msg.result);
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (msg.method === 'subscribeServiceRequest' && msg.result) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (msg.result.length === 0) {
              setRequest('solicited but not available');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            } else if (msg.result.length === 1) {
              setRequest('available');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            } else if (msg.result.length === 2) {
              setRequest('forgotten/not available');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            } else if (msg.result.length === 3) {
              setRequest('available again');
            }
          }
        };

        ws.onclose = () => {
          console.log('[WS-LOG] service preimage closed');
          setTimeout(() => {
            if (!isMounted()) {
              return;
            }

            console.log('[WS-LOG] reopening service preimage');
            wsRef.current = null;
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
  }, [endpoint, wsRef.current?.url]);
}
