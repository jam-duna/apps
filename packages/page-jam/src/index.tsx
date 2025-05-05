// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import { Route, Routes } from 'react-router';

import { Tabs } from '@polkadot/react-components';

import BlockInfo from './BlockMain/BlockInfo/index.js';
import BlockMain from './BlockMain/index.js';
import CodecApp from './codec/index.js';
import { WsRpcProvider } from './contexts/WSRpcContext/index.js';
import JsApp from './javascript/index.js';
import BlockOverviewPage from './pages/block/index.js';
import ExtrinsicDetailsPage from './pages/block-extrinsic/index.js';
import WorkReportDetailPage from './pages/block-workreport/index.js';
import BlockWorkReportsPage from './pages/block-workreports/index.js';
import CoreDetailPage from './pages/core/index.js';
import GameOfLifeViewer from './pages/game-of-life/index.js';
import BlockListPage from './pages/list-block/index.js';
import ExtrinsicListPage from './pages/list-extrinsic/index.js';
import WorkReportListPage from './pages/list-workreport/index.js';
import PreimageDetailPage from './pages/preimage/index.js';
import SegmentDetailPage from './pages/segment/index.js';
import ServiceDetailPage from './pages/service/index.js';
import ServiceValueDetailPage from './pages/servicevalue/index.js';
import ValidatorIndexDetailPage from './pages/validator/index.js';
import ValidatorKeyDetailPage from './pages/validator-key/index.js';
import WorkPackageDetailPage from './pages/workpackage/index.js';
import RpcApp from './rpc/index.js';
import StorageApp from './storage/index.js';
import Home from './Home.js';
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
    }
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
            <Route
              element={<CoreDetailPage />}
              path='core/:coreIndex'
            />
            <Route
              element={<ServiceDetailPage />}
              path='service/:serviceId'
            />
            <Route
              element={<WorkPackageDetailPage />}
              path='workpackage/:workPackageHash'
            />
            <Route
              element={<PreimageDetailPage />}
              path='preimage/:serviceId/:preimageHash'
            />
            <Route
              element={<SegmentDetailPage />}
              path='segment/:workPackageHash/:index'
            />
            <Route
              element={<ServiceValueDetailPage />}
              path='servicevalue/:service/:key/:headerhash'
            />
            <Route
              element={<ValidatorIndexDetailPage />}
              path='validator/:index'
            />
            <Route
              element={<ValidatorIndexDetailPage />}
              path='validator/:index/:hash'
            />
            <Route
              element={<ValidatorKeyDetailPage />}
              path='validator/key/:key'
            />
            <Route
              element={<ValidatorKeyDetailPage />}
              path='validator/key/:key/:hash'
            />
            <Route
              element={<BlockListPage />}
              path='list/block'
            />
            <Route
              element={<ExtrinsicListPage />}
              path='list/extrinsic'
            />
            <Route
              element={<WorkReportListPage />}
              path='list/workreport'
            />
            <Route
              element={<BlockOverviewPage />}
              path='block/:headerhash'
            />
            <Route
              element={<ExtrinsicDetailsPage />}
              path='block/:headerhash/extrinsic'
            />
            <Route
              element={<BlockWorkReportsPage />}
              path='block/:headerhash/workreport'
            />
            <Route
              element={<WorkReportDetailPage />}
              path='block/:headerhash/workreport/:workPackageHash'
            />
            <Route
              element={<GameOfLifeViewer />}
              path='game-of-life-viwer'
            />
            {/* route for explorer app end */}
            <Route
              element={<RpcApp />}
              path='rpc'
            />
            <Route
              element={<JsApp {...props} />}
              path='javascript'
            />
            <Route
              element={<CodecApp {...props} />}
              path='codec'
            />
            <Route
              element={<StorageApp {...props} />}
              path='storage'
            />
            <Route
              element={<BlockMain />}
              path='coreevm'
            />
            <Route
              element={<BlockInfo />}
              path='1/query/:value?'
            />
          </Route>
        </Routes>
      </WsRpcProvider>
    </main>
  );
}

export default React.memo(JamApp);
