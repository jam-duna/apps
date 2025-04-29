"use client";

import { ServiceInfo } from "../types/index.js";
import { normalizeEndpoint } from "../utils/ws.js";
import { useEffect, useRef } from "react";
import { useIsMounted } from "usehooks-ts";

interface Params {
  endpoint: string;
  serviceID: string;
  setStatus: (status: ServiceInfo) => void;
}

export function useSubscribeServiceInfo({
  endpoint,
  serviceID,
  setStatus,
}: Params) {
  const wsRef = useRef<WebSocket | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    const normalEndpoint = normalizeEndpoint(endpoint);

    if (wsRef.current && wsRef.current.url !== normalEndpoint) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (!wsRef.current) {
      console.log("[WS-LOG] serviceinfo init");

      const createWS = () => {
        const ws = new WebSocket(normalEndpoint);

        ws.onopen = () => {
          console.log("[WS-LOG] serviceinfo opened");
          const msg = {
            method: "subscribeServiceInfo",
            params: { serviceID },
          };
          ws.send(JSON.stringify(msg));
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          console.log("[WS-LOG] serviceinfo", msg);
          if (msg.method === "subscribeServiceInfo" && msg.result) {
            console.log(msg.result);
            if (msg.result.serviceID.toString() === serviceID.toString()) {
              setStatus(msg.result.info);
            }
          }
        };

        ws.onclose = () => {
          console.log("[WS-LOG] serviceinfo closed");
          setTimeout(() => {
            if (!isMounted()) return;
            console.log("[WS-LOG] reopening serviceinfo");
            wsRef.current = createWS();
          }, 3000);
        };

        return ws;
      };

      wsRef.current = createWS();
    }

    return () => {
      console.log("[WS-LOG] workpackage close unmount");
      wsRef.current?.close();
    };
  }, [endpoint, wsRef.current?.url]);
}
