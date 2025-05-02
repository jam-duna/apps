// [object Object]
// SPDX-License-Identifier: Apache-2.0

import type { AccountItem, BetaItem, ChiItem, CoreStatistics, Extrinsic, GammaItem, Header, KeyedItem, Overview, PiItem, PsiItem, RhoItem, ServiceStatsSet, ThetaItem } from '../types/index.js';

import { Dexie } from 'dexie';

// Full Block details combining header and extrinsic
export interface Block {
  header: Header;
  extrinsic: Extrinsic;
  overview?: Overview;
  header_hash: string;
  timestamp: string;
}

// State details
export interface State {
  alpha: string[][];
  beta: BetaItem[];
  chi: ChiItem;
  eta: string[];
  gamma: GammaItem;
  iota: KeyedItem[];
  kappa: KeyedItem[];
  lambda: KeyedItem[];
  pi: PiItem;
  psi: PsiItem;
  rho: RhoItem;
  tau: number;
  theta: ThetaItem;
  varphi: string[][];
  xi: string[][];
  accounts: AccountItem[] | null;
  overview?: Overview;
}

export interface Statistics {
  hash: string;
  timestamp: number;
  cores: CoreStatistics[];
  services: ServiceStatsSet[];
}

// Dexie database class
export class JamDB extends Dexie {
  public blocks!: Dexie.Table<Block, string>;
  public states!: Dexie.Table<State, string>;
  public statistics!: Dexie.Table<Statistics, string>;
  public blocksFetchBlockHash!: Dexie.Table<Block, string>;
  public statesFetchBlockHash!: Dexie.Table<State, string>;

  constructor () {
    super('JamDB');
    // Include "block.header.slot" so we can query by slot.
    this.version(1).stores({
      blocks: 'overview.headerHash,overview.slot,overview.createdAt',
      states: 'overview.headerHash,overview.slot,overview.createdAt',
      statistics: 'hash,timestamp',
      blocksFetchBlockHash: 'overview.blockHash',
      statesFetchBlockHash: 'overview.blockHash'
    });
  }
}

export const db = new JamDB();

export const DB_LIMIT = 20;
