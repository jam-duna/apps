// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

import { db } from '../db/db.js';

export function useWorkReportStatuses (
  reportHashes: string[],
  currentSlot: number,
  maxChecks = 10
): Record<string, string> {
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    if (reportHashes.length === 0) {
      return;
    }

    async function updateStatuses () {
      const newStatuses: Record<string, string> = {};

      for (const hash of reportHashes) {
        let slotToCheck = currentSlot + 1;
        let foundStatus = 'Pending';
        let checks = 0;

        // eslint-disable-next-line no-unmodified-loop-condition
        while (checks < maxChecks && !cancelled) {
          const nextBlock = await db.blocks
            .where('overview.slot')
            .equals(slotToCheck)
            .first();

          if (!nextBlock?.overview?.headerHash) {
            break; // no further block available
          }

          const nextState = await db.states
            .where('overview.headerHash')
            .equals(nextBlock.overview.headerHash)
            .first();

          if (nextState && Array.isArray(nextState.xi)) {
            // Check if any entry in xi contains the report hash.
            const found = nextState.xi.find((entry: string[]) =>
              entry.includes(hash)
            );

            if (found) {
              foundStatus = `Accumulated on slot ${nextBlock.overview.slot}`;
              break;
            }
          }

          slotToCheck++;
          checks++;
        }

        newStatuses[hash] = foundStatus;
      }

      if (!cancelled) {
        setStatuses(newStatuses);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateStatuses();

    return () => {
      cancelled = true;
    };
  }, [reportHashes, currentSlot, maxChecks]);

  return statuses;
}
