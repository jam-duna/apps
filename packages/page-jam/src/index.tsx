// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import { Route, Routes } from 'react-router';

import { Tabs } from '@polkadot/react-components';

import Home from './Home.js';
import RpcApp from './rpc/index.js';
import JsApp from './javascript/index.js'
import Utilities from './Utilities.js';
import Network from './Network.js';
import CoreEVM from './CoreEVM.js';
import { useTranslation } from './translate.js';

interface Props {
  basePath: string;
  className?: string;
}

function JamApp (props: Props): React.ReactElement<Props> {
  const { basePath, className } = props;

  const { t } = useTranslation();

  const tabsRef = useRef([
    {
      isRoot: true,
      name: 'home',
      text: t('Home')
    },
    {
      name: 'rpc',
      text: t('RPC Calls')
    },
    {
      name: 'javascript',
      text: t('Javascript')
    },
    {
      name: 'utilities',
      text: t('Utilities')
    },
    {
      name: 'network',
      text: t('Network')
    },
    {
      name: 'coreevm',
      text: t('CoreEVM')
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
            <Route path="rpc" element={<RpcApp />} />
            <Route path="javascript" element={<JsApp {...props} />} />
            <Route path="utilities" element={<Utilities />} />
            <Route path="network" element={<Network />} />
          <Route path="coreevm" element={<CoreEVM />} />
          </Route>
        </Routes>
      </main>
    );
}

export default React.memo(JamApp);
