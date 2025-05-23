// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SquareContent } from '../components/home/MainViewGrid.js';
import type { Block, State } from '../db/db.js';
import type { CoreStatistics } from '../types/index.js';

export interface GridData {
  data: Record<number, Record<number, SquareContent>>;
  timeslots: number[];
  timestamps: number[];
  cores: number[];
  coreStatistics: Record<number, Record<number, CoreStatistics>>;
}

export function parseBlocksToGridData (
  blocks: Block[],
  states: State[]
): GridData {
  const grid: Record<number, Record<number, SquareContent>> = {};
  const timeslots = new Set<number>();
  const timestamps = new Set<number>();
  const cores = new Set<number>([0, 1]);
  const coreStatistics: Record<number, Record<number, CoreStatistics>> = {};

  blocks.forEach((block) => {
    const slot = block.overview?.slot;
    const timestamp = block.overview?.createdAt;

    if (typeof slot !== 'number') {
      return;
    }

    if (typeof timestamp !== 'number') {
      return;
    }

    timeslots.add(slot);
    timestamps.add(timestamp);
    const headerHash = block.overview?.headerHash ?? '';
    const guarantees = block.extrinsic?.guarantees ?? [];
    const validGuarantees = guarantees.filter(
      (g) => typeof g.report.core_index === 'number'
    );

    if (validGuarantees.length > 0) {
      validGuarantees.forEach((g) => {
        const coreIndex = g.report.core_index;

        cores.add(coreIndex);
        const serviceName: string[] = [];

        g.report.results.forEach((result) => {
          serviceName.push(result.service_id.toString());
        });
        const wpHash = g.report.package_spec?.hash ?? '';
        const finalHash = wpHash.trim() !== '' ? wpHash : '';

        grid[coreIndex] = {
          ...grid[coreIndex],
          [timestamp]: {
            headerHash,
            isBusy: finalHash !== '',
            serviceName,
            workPackageHash: finalHash
          }
        };
      });
    } else {
      [0, 1].forEach((defaultCore) => {
        grid[defaultCore] = {
          ...grid[defaultCore],
          [timestamp]: {
            headerHash: '',
            isBusy: false,
            serviceName: [],
            workPackageHash: ''
          }
        };
      });
    }
  });

  timestamps.forEach((timestamp) => {
    cores.forEach((coreIndex) => {
      grid[coreIndex] = grid[coreIndex] || {};

      if (!grid[coreIndex][timestamp]) {
        grid[coreIndex][timestamp] = {
          headerHash: '',
          isBusy: false,
          serviceName: [],
          workPackageHash: ''
        };
      }
    });
  });

  let coreIndex = -1;

  cores.forEach((coreValue) => {
    coreIndex++;
    let timeslotIndex = 0;

    coreStatistics[coreValue] = {};
    timestamps.forEach((timeslotValue) => {
      try {
        const cores = states[timeslotIndex].pi.cores;

        coreStatistics[coreValue][timeslotValue] =
          cores === undefined
            ? {
              bundle_size: -1,
              da_load: -1,
              exports: -1,
              extrinsic_count: -1,
              extrinsic_size: -1,
              gas_used: -1,
              imports: -1,
              popularity: -1
            }
            : cores[coreIndex];
      } catch (_err) {
        coreStatistics[coreValue][timeslotValue] = {
          bundle_size: -1,
          da_load: -1,
          exports: -1,
          extrinsic_count: -1,
          extrinsic_size: -1,
          gas_used: -1,
          imports: -1,
          popularity: -1
        };
      }

      timeslotIndex++;
    });
  });

  return {
    coreStatistics,
    cores: Array.from(cores).sort((a, b) => a - b),
    data: grid,
    timeslots: Array.from(timeslots).sort((a, b) => a - b),
    timestamps: Array.from(timestamps).sort((a, b) => a - b)
  };
}
