// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import { Route, Routes } from 'react-router';

import { Tabs } from '@polkadot/react-components';

import Home from './Home.js';
import CoreDetailPage from './pages/core/index.js';
import ServiceDetailPage from './pages/service/index.js';
import WorkPackageDetailPage from './pages/workpackage/index.js';
import PreimageDetailPage from './pages/preimage/index.js';
import SegmentDetailPage from './pages/segment/index.js';
import ServiceValueDetailPage from './pages/servicevalue/index.js';
import GameOfLifeViewer from './pages/game-of-life/index.js';

import RpcApp from './rpc/index.js';
import JsApp from './javascript/index.js'
import CodecApp from './codec/index.js';
import StorageApp from './storage/index.js';
import BlockMain from './BlockMain/index.js';
import BlockInfo from './BlockMain/BlockInfo/index.js';

import { useTranslation } from './translate.js';
import { WsRpcProvider } from './contexts/WSRpcContext/index.js';

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
      name: 'codec',
      text: t('Codec')
    },
    {
      name: 'storage',
      text: t('Storage')
    },
    {
      name: 'coreevm',
      text: t('Block info')
    },
    {
      hasParams: true,
      name: '1/query',
      text: t('Block details')
    },
  ]);

  return (
    <main className={className}>
      <WsRpcProvider>
        <Tabs
          basePath={basePath}
          items={tabsRef.current}
        />
        <Routes>
          <Route path={basePath}>
            {/* route for explorer app start */}
            <Route
              element={
                <Home />
              }
              index
            />
            <Route path="core/:coreIndex" element={<CoreDetailPage/>} />
            <Route path="service/:serviceId" element={<ServiceDetailPage />} />
            <Route path="workpackage/:workPackageHash" element={<WorkPackageDetailPage />} />
            <Route path="preimage/:serviceId/:preimageHash" element={<PreimageDetailPage />} />
            <Route path="segment/:workPackageHash/:index" element={<SegmentDetailPage />} />
            <Route path="servicevalue/:service/:key/:headerhash" element={<ServiceValueDetailPage />} />
            <Route path="game-of-life-viwer" element={<GameOfLifeViewer />} />
            {/* route for explorer app end */}
            <Route path="rpc" element={<RpcApp />} />
            <Route path="javascript" element={<JsApp {...props} />} />
            <Route path="codec" element={<CodecApp {...props} />} />
            <Route path="storage" element={<StorageApp {...props} />} />
            <Route path="coreevm" element={<BlockMain  />} />
            <Route path='1/query/:value?' element={<BlockInfo />}/>
          </Route>
        </Routes>
      </WsRpcProvider>
    </main>
  );
}

export default React.memo(JamApp);
