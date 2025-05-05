// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable*/

'use client';

import type { Block, State, Statistics } from '../../db/db.js';
import type { Overview } from '../../types/index.js';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { db, DB_LIMIT } from '../../db/db.js';
import { fetchBlock } from '../../hooks/useFetchBlock.js';
import { fetchState } from '../../hooks/useFetchState.js';
import { fetchStatistics } from '../../hooks/useFetchStatistics.js';
import { getRpcUrlFromWs, normalizeEndpoint } from '../../utils/ws.js';

interface WsRpcContextProps {
  currentBlock: Block | null;
  currentState: State | null;
  currentStatistics: Statistics | null;
  now: number;
  wsEndpoint: string;
  setWsEndpoint: (value: string) => void;
  savedEndpoints: string[];
}

const WsRpcContext = createContext<WsRpcContextProps | undefined>(undefined);

export const useWsRpcContext = () => {
  const context = useContext(WsRpcContext);

  if (!context) {
    throw new Error('useWsRpcContext must be used within a WsRpcProvider');
  }

  return context;
};

export const WsRpcProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentBlock, setCurrentBlock] = useState<Block | null>(null);
  const [currentState, setCurrentState] = useState<State | null>(null);
  const [currentStatistics, setCurrentStatistics] = useState<Statistics | null>(
    null
  );
  const [wsEndpoint, setWsEndpoint] = useState<string>(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org');
  const [now, setNow] = useState(Date.now());
  const [savedEndpoints, setSavedEndpoints] = useState<string[]>([]);

  const wsRef = useRef<WebSocket | null>(null);

  const createWS = () => {
    const normalEndpoint = normalizeEndpoint(wsEndpoint);
    const ws = new WebSocket(normalEndpoint);

    ws.onopen = () => {
      const msgBlock = {
        method: 'subscribeBestBlock'
      };

      ws.send(JSON.stringify(msgBlock));
      const msgFBlock = {
        method: 'subscribeFinalizedBlock'
      };

      ws.send(JSON.stringify(msgFBlock));
      const msgStat = {
        method: 'subscribeStatistics'
      };

      ws.send(JSON.stringify(msgStat));
      console.log('[WS-LOG] websocket opened');
    };

    ws.onmessage = (event) => {
      console.log('[WS-LOG] websocket message', event.data);
      requestIdleCallback(async () => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.method === 'subscribeBestBlock' && msg.result) {
            const { blockHash, headerHash } = msg.result;
            const rpcUrl = getRpcUrlFromWs(wsEndpoint);
            const fetchedBlock = await fetchBlock(headerHash, rpcUrl, 'hash');
            const fetchedState = await fetchState(headerHash, rpcUrl);
            const nowTimestamp = Date.now();
            const slot =
              fetchedBlock?.header?.slot !== undefined
                ? fetchedBlock.header.slot
                : -1;
            const overview: Overview = {
              headerHash,
              blockHash,
              createdAt: Number.parseInt(fetchedBlock?.timestamp || '0') * 1000,
              slot,
              finalized: false
            };

            if ((await db.blocks.count()) > DB_LIMIT * 2) {
              await db.blocks.clear();
              await db.states.clear();
            }

            if ((await db.blocks.count()) <= DB_LIMIT * 2) {
              if (fetchedBlock?.header && fetchedBlock?.extrinsic) {
                const blockRecord: Block = {
                  ...fetchedBlock,
                  overview
                };

                await db.blocks.put(blockRecord);

                if (fetchedState) {
                  const stateRecord: State = {
                    overview,
                    ...fetchedState
                  };

                  await db.states.put(stateRecord);
                  setCurrentBlock(blockRecord);
                  setCurrentState(stateRecord);
                }

                // Clean-up
                const blockCount = await db.blocks.count();

                if (blockCount > DB_LIMIT) {
                  const oldest = await db.blocks
                    .orderBy('overview.createdAt')
                    .first();

                  if (oldest?.overview) {
                    await db.blocks.delete(oldest.overview.headerHash);
                  }
                }

                const stateCount = await db.states.count();

                if (stateCount > DB_LIMIT) {
                  const oldest = await db.states
                    .orderBy('overview.createdAt')
                    .first();

                  if (oldest?.overview) {
                    await db.states.delete(oldest.overview.headerHash);
                  }
                }
              }
            }
          }

          if (msg.method === 'subscribeFinalizedBlock' && msg.result) {
            setTimeout(async () => {
              const hash = msg.result.headerHash;
              const matchBlock = await db.blocks.get(hash);

              if (matchBlock?.overview !== undefined) {
                matchBlock.overview.finalized = true;
                await db.blocks.put(matchBlock);
              }
            }, 3000);
          }

          if (msg.method === 'subscribeStatistics' && msg.result) {
            const hash = msg.result.headerHash;
            const cores = msg.result.statistics.cores;
            const services = msg.result.statistics.services;
            const timestamp = Date.now();

            await db.statistics.put({ hash, timestamp, cores, services });
            setCurrentStatistics({ hash, timestamp, cores, services });
            // Clean-up
            const count = await db.statistics.count();

            if (count > DB_LIMIT) {
              const oldest = await db.statistics.orderBy('timestamp').first();

              if (oldest !== undefined) {
                await db.statistics.delete(oldest.hash);
              }
            }
          }
        } catch (err) {
          console.log('[WS-LOG] Failed to parse message', err);
        }
      });
    };

    ws.onerror = (e) => {
      console.log('[WS-LOG] WebSocket Error:', e);
    };

    ws.onclose = () => {
      console.log('[WS-LOG-CLOSE] WebSocket closed');
      setTimeout(() => {
        console.log('[WS-LOG-CLOSE] reopening websocket');
        wsRef.current = createWS();
      }, 3000);
    };

    return ws;
  };

  const resetDB = async () => {
    await db.blocks.clear();
    await db.states.clear();
    await db.statistics.clear();
    setNow(Date.now());
  };

  const fetchLatestBlocks = async (count: number) => {
    console.log('[WS-LOG] fetch latest blocks', Date.now());
    await db.blocks.clear();
    await db.states.clear();
    await db.statistics.clear();
    const rpcUrl = getRpcUrlFromWs(wsEndpoint);
    const response = await fetchBlock('latest', rpcUrl, 'hash');

    console.log('[WS-LOG] fetch latest blocks response', response);

    if (response !== null) {
      const currentSlot = response.header.slot;

      console.log('[WS-LOG] fetch latest blocks currentslot', currentSlot);
      let i = currentSlot - count + 1;

      for (; i <= currentSlot; ++i) {
        const block = await fetchBlock(i.toString(), rpcUrl, 'slot');

        console.log('[WS-LOG] fetch latest blocks', block);

        if (!block) {
          console.log(`Block for slot ${i} not found.`);
          continue; // or return, depending on your logic
        }

        const state = await fetchState(block.header_hash, rpcUrl);
        const overview = {
          headerHash: block.header_hash,
          blockHash: block.header_hash,
          createdAt: Number.parseInt(block.timestamp) * 1000,
          slot: block.header.slot,
          finalized: true
        };

        db.blocks.put({ overview, ...block });

        if (state) {
          db.states.put({ overview, ...state });
        }

        const statistics = await fetchStatistics(block.header_hash, rpcUrl);

        await db.statistics.put({
          hash: block.header_hash,
          timestamp: Number.parseInt(block.timestamp) * 1000,
          cores: statistics.cores,
          services: statistics.services
        });

        if (i === currentSlot) {
          setCurrentBlock({ overview, ...block });

          if (state) {
            setCurrentState({ overview, ...state });
          }

          setCurrentStatistics({
            hash: block.header_hash,
            timestamp: Number.parseInt(block.timestamp) * 1000,
            cores: statistics.cores,
            services: statistics.services
          });
        }
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (!wsRef.current) {
        const isReset = localStorage.getItem('jamReset') === 'true';

        console.log('DeepLook ws rpc context', isReset);

        if (isReset) {
          await resetDB();
          localStorage.setItem('jamReset', 'false');
        }

        wsRef.current = createWS();
        console.log('[WS-LOG] initialize websocket');
      }
    })();
  }, [wsEndpoint]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (wsRef.current !== null) {
          wsRef.current.close();
          // make up db with latest values
          fetchLatestBlocks(5);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <WsRpcContext.Provider
      value={{
        currentBlock,
        currentState,
        currentStatistics,
        now,
        wsEndpoint,
        setWsEndpoint,
        savedEndpoints
      }}
    >
      {children}
    </WsRpcContext.Provider>
  );
};
