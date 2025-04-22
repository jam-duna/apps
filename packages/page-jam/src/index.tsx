// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import { Route, Routes } from 'react-router';

import { Tabs } from '@polkadot/react-components';

import Home from './Home.js';
import { useTranslation } from './translate.js';

interface Props {
  basePath: string;
  className?: string;
}

function JamApp ({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const tabsRef = useRef([
    {
      isRoot: true,
      name: 'home',
      text: t('Home')
    },
  ]);

  return (
      <main className={className}>
        <Tabs
          basePath={basePath}
          items={tabsRef.current}
        />
        <Routes>
          <Route path={basePath}>
            <Route
              element={
                <Home />
              }
              index
            />
          </Route>
        </Routes>
      </main>
    );
}

export default React.memo(JamApp);
