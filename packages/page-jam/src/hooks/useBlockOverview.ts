// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Block, State } from '../db/db.js';

import { useEffect, useState } from 'react';

import { db } from '../db/db.js';
import { getRpcUrlFromWs } from '../utils/ws.js';
import { fetchBlock } from './useFetchBlock.js';
import { fetchState } from './useFetchState.js';

export function useBlockOverview (input: string, type: 'hash' | 'slot') {
  const [blockRecord, setBlockRecord] = useState<Block | null>(null);
  const [stateRecord, setStateRecord] = useState<State | null>(null);
  const [prevHash, setPrevHash] = useState<string | null>(null);
  const [nextHash, setNextHash] = useState<string | null>(null);
  const wsEndpoint = localStorage.getItem('customWsEndpoint') || null;
  const rpcUrl = getRpcUrlFromWs(wsEndpoint || localStorage.getItem('jamUrl') || 'dot-0.jamduna.org');

  async function fetchDbData (input: string, type: 'hash' | 'slot') {
    try {
      if (type === 'hash') {
        const block = await db.blocks
          .where('overview.headerHash')
          .equals(input)
          .first();
        const state = await db.states
          .where('overview.headerHash')
          .equals(input)
          .first();

        return { block, state };
      } else {
        const block = await db.blocks
          .where('overview.slot')
          .equals(Number(input))
          .first();
        const state = await db.states
          .where('overview.slot')
          .equals(Number(input))
          .first();

        return { block, state };
      }
    } catch (error) {
      console.error('Error fetching DB data:', error);

      return { block: undefined, state: undefined };
    }
  }

  useEffect(() => {
    if (!input) {
      return;
    }

    (async () => {
      try {
        const dbData = await fetchDbData(input, type);

        console.log('[LOG] DB Blocks: ', dbData.block);
        console.log('[LOG] DB States: ', dbData.state);

        if (dbData.block) {
          setBlockRecord(dbData.block);

          if (dbData.state) {
            setStateRecord(dbData.state);
          }
        } else {
          // Directly fetch the block from the server based on the type.
          const fetchedBlock = await fetchBlock(input, rpcUrl, type);

          console.log('[LOG] Blocks: ', fetchedBlock);
          setBlockRecord(fetchedBlock ?? null);

          // If searching by hash, also fetch the state data.
          if (type === 'hash') {
            const fetchedState = await fetchState(input, rpcUrl);

            setStateRecord(fetchedState);
          } else {
            setStateRecord(null);
          }
        }
      } catch (error) {
        console.error('Error fetching block overview:', error);
      }
    })();
  }, [input, type, rpcUrl]);

  return { blockRecord, stateRecord, prevHash, nextHash };
}
