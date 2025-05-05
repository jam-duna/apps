// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ReportWithTime } from './components/jamitem/index.js';
import type { Block, State } from './db/db.js';
import type { CoreStatistics, ServiceInfoDetail, ServiceStatistics } from './types/index.js';
import type { GridData } from './utils/parseBlocksToGridData.js';

import { Box, Container, FormControlLabel, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { CoreStatsGrid } from './components/core/index.js';
import { CustomToggle } from './components/display/CustomToggle.js';
import LatestBlocks from './components/home/lists/latest-list/LatestBlocks.js';
import Loading from './components/home/Loading.js';
import MainViewGrid from './components/home/MainViewGrid.js';
import { HomeIcon } from './components/Icons/index.js';
import { ListServices, RecentWorkPackages } from './components/jamitem/index.js';
import { ServiceStatsGrid } from './components/service/index.js';
import { useWsRpcContext } from './contexts/WSRpcContext/index.js';
import { DB_LIMIT } from './db/db.js';
import { fetchListServices } from './hooks/useFetchListServices.js';
import { fetchAggregateCoreStatistics, fetchAggregateServiceStatistics, filterBlocks, filterStates, filterWorkPackages } from './utils/blockAnalyzer.js';
import { parseBlocksToGridData } from './utils/parseBlocksToGridData.js';
import { getRpcUrlFromWs } from './utils/ws.js';

function Home () {
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [workPackages, setWorkPackages] = useState<ReportWithTime[]>([]);
  const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);
  const [gridData, setGridData] = useState<GridData>({
    coreStatistics: {},
    cores: [],
    data: {},
    timeslots: [],
    timestamps: []
  });
  const [showOnlyWorkPackages, setShowOnlyWorkPackages] = useState(true);
  const [coreStatistics, setCoreStatistics] = useState<Record<number,
  CoreStatistics
  > | null>(null);
  const [serviceStatistics, setServiceStatistics] = useState<
  { time: number; stat: ServiceStatistics }[]
  >([]);
  const [showStatistics, setShowStatistics] = useState(false);

  const [isGridLoaded, setIsGridLoaded] = useState<boolean>(false);
  const [isBlocksLoaded, setIsBlocksLoaded] = useState(false);
  const [isStatesLoaded, setIsStatesLoaded] = useState(false);
  const [isWorkPackagesLoaded, setIsWorkPackagesLoaded] = useState(false);
  const [isServicesLoaded, setIsServicesLoaded] = useState(false);
  const [isStatsLoaded, setIsStatsLoaded] = useState(false);

  const { currentBlock, currentState, currentStatistics, now } = useWsRpcContext();

  useEffect(() => {
    const fetchBlocks = async () => {
      const blocks = await filterBlocks(DB_LIMIT);

      setFilteredBlocks(blocks);
      setIsBlocksLoaded(true);
    };

    const fetchStates = async () => {
      const states = await filterStates(DB_LIMIT);

      setFilteredStates(states);
      setIsStatesLoaded(true);
    };

    const fetchWorkPackages = async () => {
      const reports = await filterWorkPackages();

      setWorkPackages(reports);
      setIsWorkPackagesLoaded(true);
    };

    const fetchListService = async () => {
      const services = await fetchListServices(getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org'));

      setServiceList(services);
      setIsServicesLoaded(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchBlocks();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchStates();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchWorkPackages();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchListService();
  }, [currentBlock, currentState, now]);

  useEffect(() => {
    const fetchAggregateStatistics = async () => {
      const core = await fetchAggregateCoreStatistics(showOnlyWorkPackages);
      const service = await fetchAggregateServiceStatistics(
        showOnlyWorkPackages
      );

      setCoreStatistics(core);
      setServiceStatistics(service);
      setIsStatsLoaded(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchAggregateStatistics();
  }, [currentStatistics, showOnlyWorkPackages]);

  useEffect(() => {
    const data = parseBlocksToGridData(filteredBlocks, filteredStates);

    setGridData(data);
    setIsGridLoaded(true);
  }, [filteredBlocks, filteredStates]);

  const isLoaded = () => {
    return (
      isGridLoaded &&
      isBlocksLoaded &&
      isStatesLoaded &&
      isWorkPackagesLoaded &&
      isServicesLoaded &&
      isStatsLoaded
    );
  };

  if (!isLoaded()) {
    return <Loading />;
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      {/* header display */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          gap: '10px',
          mb: 3,
          ml: 1
        }}
      >
        <HomeIcon
          color={'#444'}
          size={24}
        />
        <Typography
          color='#444'
          fontSize='28px'
          fontWeight={'bold'}
          variant='subtitle2'
        >
          Home
        </Typography>
      </Box>
      {/* grid display */}
      <Box
        alignItems={'end'}
        display={'flex'}
        flexDirection={'column'}
        gap={1}
      >
        <FormControlLabel
          control={
            <CustomToggle
              checked={showOnlyWorkPackages}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => setShowOnlyWorkPackages((prev) => !prev)}
            />
          }
          label={showOnlyWorkPackages ? 'Active' : 'All'}
          labelPlacement='start'
          sx={{ paddingInline: '10px' }}
        />
        <MainViewGrid
          cores={gridData.cores}
          data={gridData.data}
          serviceId={-1}
          services={serviceList}
          showActive={showOnlyWorkPackages}
          timeslots={gridData.timeslots}
          timestamps={gridData.timestamps}
        />
      </Box>
      {/* stats graph display */}
      <Box
        alignItems={'end'}
        display={'flex'}
        flexDirection={'column'}
        gap={1}
      >
        <FormControlLabel
          control={
            <CustomToggle
              checked={showStatistics}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => setShowStatistics((prev) => !prev)}
            />
          }
          label={showStatistics ? 'SERVICE' : 'CORE'}
          labelPlacement='start'
          sx={{ paddingInline: '10px' }}
        />
        {showStatistics === false
          ? (
            coreStatistics && Object.entries(coreStatistics).length !== 0
              ? (
                <CoreStatsGrid stats={coreStatistics} />
              )
              : (
                <Typography
                  color='#444444'
                  fontSize='16px'
                  textAlign='center'
                  variant='h6'
                  width='100%'
                >
                  Loading core statistics...
                </Typography>
              )
          )
          : serviceStatistics.length > 0
            ? (
              <ServiceStatsGrid stats={serviceStatistics.slice(0, 8)} />
            )
            : (
              <Typography
                color='#444444'
                fontSize='16px'
                textAlign='center'
                variant='h6'
                width='100%'
              >
                Loading service statistics...
              </Typography>
            )}
      </Box>
      {/* list display */}
      <Grid
        container
        marginTop='20px'
        spacing={2}
      >
        <Grid size={6}>
          <LatestBlocks latestBlocks={filteredBlocks.slice(0, 12)} />
        </Grid>
        <Grid size={6}>
          <Grid
            container
            spacing={4}
          >
            <Grid size={12}>
              <RecentWorkPackages
                reports={workPackages}
                services={serviceList}
              />
            </Grid>
            <Grid size={12}>
              <ListServices services={serviceList} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default React.memo(Home);
