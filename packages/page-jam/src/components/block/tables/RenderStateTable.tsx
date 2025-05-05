// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { State } from '../../../db/db.js';
import type { AccountItem, BetaItem, ChiItem, GammaItem, KeyedItem, PiItem, PsiItem, RhoItem, ThetaItem } from '../../../types/index.js';

import { Typography } from '@mui/material';
import React from 'react';

import AccountTable from '../tables/AccountsTable.js';
import BetaTable from '../tables/BetaTable.js';
import ChiTable from '../tables/ChiTable.js';
import EtaTable from '../tables/EtaTable.js';
import GammaTable from '../tables/GammaTable.js';
import PiTable from '../tables/PiTable.js';
import PsiTable from '../tables/PsiTable.js';
import RhoTable from '../tables/RhoTable.js';
import TableFormat1 from '../tables/TableFormat1.js';
import TableFormat2 from '../tables/TableFormat2.js';
import ThetaTable from '../tables/ThetaTable.js';
import XiTable from '../tables/XiTable.js';

// Define an interface for table configuration
interface TableConfig<T> {
  // A type guard that checks if the data is valid and narrows it to type T
  predicate: (data: unknown) => data is T;
  // A render function that takes data of type T and returns the corresponding table
  render: (data: T) => React.ReactElement;
}

// A helper function that creates a mapping of state keys to table configurations.
// If needed, headerHash is captured for components that require it.
const getTableConfigs = (
  headerHash: string
): Partial<Record<keyof State, TableConfig<unknown>>> => ({
  accounts: {
    predicate: (data): data is AccountItem[] =>
      Array.isArray(data) && data.length > 0,
    render: (data: unknown) => {
      if (Array.isArray(data) && data.length > 0) {
        return <AccountTable accounts={data as AccountItem[]} />;
      }

      return <></>;
    }
  },
  alpha: {
    predicate: (data): data is string[][] =>
      Array.isArray(data) && data.length > 0 && Array.isArray(data[0]) && typeof data[0][0] === 'string',
    render: (data: unknown) => {
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0]) && typeof data[0][0] === 'string') {
        return <TableFormat2 data={data as string[][]} />;
      }

      return <></>;
    }
  },
  beta: {
    predicate: (data): data is BetaItem[] =>
      Array.isArray(data) && data.length > 0,
    render: (data: unknown) => {
      if (Array.isArray(data) && data.length > 0) {
        return <BetaTable data={data as BetaItem[]} />;
      }

      return <></>;
    }
  },
  chi: {
    predicate: (data): data is ChiItem => data !== undefined && data !== null,
    render: (data: unknown) => {
      if (data !== undefined && data !== null) {
        return <ChiTable data={[data as ChiItem]} />;
      }

      return <></>;
    }
  },
  eta: {
    predicate: (data): data is string[] => Array.isArray(data),
    render: (data: unknown) => {
      if (Array.isArray(data)) {
        return <EtaTable data={data as string[]} />;
      }

      return <></>;
    }
  },
  gamma: {
    predicate: (data): data is GammaItem => data !== undefined && data !== null,
    render: (data: unknown) => {
      if (data !== undefined && data !== null) {
        return <GammaTable data={[data as GammaItem]} />;
      }

      return <></>;
    }
  },
  iota: {
    predicate: (data): data is KeyedItem[] =>
      Array.isArray(data) && data.length > 0,
    render: (data: unknown) => {
      if (Array.isArray(data) && data.length > 0) {
        return <TableFormat1 data={data as KeyedItem[]} />;
      }

      return <></>;
    }
  },
  kappa: {
    predicate: (data): data is KeyedItem[] =>
      Array.isArray(data) && data.length > 0,
    render: (data: unknown) => {
      if (Array.isArray(data) && data.length > 0) {
        return <TableFormat1 data={data as KeyedItem[]} />;
      }

      return <></>;
    }
  },
  lambda: {
    predicate: (data): data is KeyedItem[] =>
      Array.isArray(data) && data.length > 0,
    render: (data: unknown) => {
      if (Array.isArray(data) && data.length > 0) {
        return <TableFormat1 data={data as KeyedItem[]} />;
      }

      return <></>;
    }
  },
  pi: {
    predicate: (data): data is PiItem => data !== undefined && data !== null,
    render: (data: unknown) => {
      if (data !== undefined && data !== null) {
        return <PiTable data={data as PiItem} />;
      }

      return <></>;
    }
  },
  psi: {
    predicate: (data): data is PsiItem => data !== undefined && data !== null,
    render: (data: unknown) => {
      if (data !== undefined && data !== null) {
        return <PsiTable data={data as PsiItem} />;
      }

      return <></>;
    }
  },
  rho: {
    predicate: (data): data is RhoItem => data !== undefined && data !== null,
    render: (data: unknown) => {
      if (data !== undefined && data !== null) {
        return (
          <RhoTable
            data={data as RhoItem}
            headerHash={headerHash}
          />
        );
      }

      return <></>;
    }
  },
  theta: {
    predicate: (data): data is ThetaItem =>
      Array.isArray(data) && data.flat(Infinity).length > 0,
    render: (data: unknown) => {
      if (Array.isArray(data) && data.flat(Infinity).length > 0) {
        return (
          <ThetaTable
            data={data as ThetaItem}
            headerHash={headerHash}
          />
        );
      }

      return <></>;
    }
  },
  varphi: {
    predicate: (data): data is string[][] =>
      Array.isArray(data) && data.length > 0 && Array.isArray(data[0]) && typeof data[0][0] === 'string',
    render: (data: unknown) => {
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0]) && typeof data[0][0] === 'string') {
        return <TableFormat2 data={data as string[][]} />;
      }

      return <></>;
    }
  },
  xi: {
    predicate: (data): data is string[][] =>
      Array.isArray(data) && data.length > 0,
    render: (data: unknown) => {
      if (Array.isArray(data) && data.length > 0) {
        return <XiTable data={data as string[][]} />;
      }

      return <></>;
    }
  }
});

export const renderTable = (
  stateData: State,
  key: keyof State,
  headerHash: string
) => {
  const tableConfigs = getTableConfigs(headerHash);
  const config = tableConfigs[key];

  if (!config) {
    return null;
  }

  const data = stateData[key];

  if (config.predicate(data)) {
    return config.render(data);
  }

  return <Typography variant='body1'>No data available.</Typography>;
};
