// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ReportWithTime } from '../../components/jamitem/index.js';
import type { Block, State } from '../../db/db.js';
import type { ServiceInfo, ServiceInfoDetail, ServiceStatistics, ServiceValue } from '../../types/index.js';
import type { PreimageProps } from '../../utils/blockAnalyzer.js';
import type { GridData } from '../../utils/parseBlocksToGridData.js';

import { Box, Container, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CustomToggle } from '../../components/display/CustomToggle.js';
import Loading from '../../components/home/Loading.js';
import MainViewGrid from '../../components/home/MainViewGrid.js';
import { ItemMode, RecentWorkPackages, Service } from '../../components/jamitem/index.js';
import { RecentPreimages, ServiceInfoTable, ServiceStatsGrid, ServiceValueTable } from '../../components/service/index.js';
import { useWsRpcContext } from '../../contexts/WSRpcContext/index.js';
import { DB_LIMIT } from '../../db/db.js';
import { useSubscribeServiceInfo } from '../../hooks/subscribeServiceInfo.js';
import { useSubscribeServiceValue } from '../../hooks/subscribeServiceValue.js';
import { fetchListServices } from '../../hooks/useFetchListServices.js';
import { fetchServiceInfo } from '../../hooks/useFetchService.js';
import { fetchServiceStatisticsFromId, filterBlocks, filterPreimagesFromService, filterStates, filterWorkPackagesFromService } from '../../utils/blockAnalyzer.js';
import { parseBlocksToGridData } from '../../utils/parseBlocksToGridData.js';
import { getRpcUrlFromWs } from '../../utils/ws.js';

export default function ServiceDetailPage () {
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const serviceId = params.serviceId!;
  const serviceIdNumber = Number.parseInt(serviceId);

  const [serviceInfo, setServiceInfo] = useState<ServiceInfo | null>(null);
  const [serviceValue, setServiceValue] = useState<ServiceValue[]>([]);
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [activeStates, setActiveStates] = useState<ReportWithTime[]>([]);
  const [recentPreimages, setRecentPreimages] = useState<PreimageProps[]>([]);
  const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);
  const [serviceStatistics, setServiceStatistics] = useState<
  { time: number; stat: ServiceStatistics }[]
  >([]);
  const [gridData, setGridData] = useState<GridData>({
    coreStatistics: {},
    cores: [],
    data: {},
    timeslots: [],
    timestamps: []
  });

  const [isLoadingServiceInfo, setIsLoadingServiceInfo] = useState(true);
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(true);
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingActiveStates, setIsLoadingActiveStates] = useState(true);
  const [isLoadingPreimages, setIsLoadingPreimages] = useState(true);
  const [isLoadingServiceList, setIsLoadingServiceList] = useState(true);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(true);
  const [isLoadingGridData, setIsLoadingGridData] = useState(true);

  const isAllLoaded = !(
    isLoadingServiceInfo ||
    isLoadingBlocks ||
    isLoadingStates ||
    isLoadingActiveStates ||
    isLoadingPreimages ||
    isLoadingServiceList ||
    isLoadingStatistics ||
    isLoadingGridData
  );

  const [showOnlyWorkPackages, setShowOnlyWorkPackages] = useState(true);

  // ws context hook for fetching basic jam data (block, state, statistics)
  const { currentBlock, currentState, currentStatistics, now } = useWsRpcContext();

  // useffect hook for fetching and filtering basic jam data need in service page
  useEffect(() => {
    // filter from db
    const fetchBlocks = async () => {
      const blocks = await filterBlocks(DB_LIMIT);

      setFilteredBlocks(blocks);
      setIsLoadingBlocks(false);
    };

    const fetchStates = async () => {
      const states = await filterStates(DB_LIMIT);

      setFilteredStates(states);
      setIsLoadingStates(false);
    };

    const fetchActiveStates = async () => {
      const states = await filterWorkPackagesFromService(
        serviceIdNumber
      );

      setActiveStates(states);
      setIsLoadingActiveStates(false);
    };

    const fetchRecentPreimages = async () => {
      const preimages = await filterPreimagesFromService(
        serviceIdNumber
      );

      setRecentPreimages(preimages);
      setIsLoadingPreimages(false);
    };

    // fetch using rpc calls
    const fetchListService = async () => {
      const services = await fetchListServices(getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org'));

      setServiceList(services);
      setIsLoadingServiceList(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchBlocks();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchStates();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchActiveStates();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchRecentPreimages();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchListService();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlock, currentState, now]);

  // useffect hook for fetching service statistics dynamically using subscribe functionality
  useEffect(() => {
    const fetchServiceStatistics = async () => {
      const data = await fetchServiceStatisticsFromId(
        serviceIdNumber,
        showOnlyWorkPackages
      );

      setServiceStatistics(data);
      setIsLoadingStatistics(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchServiceStatistics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatistics, showOnlyWorkPackages]);

  // useffect hook for filtering grid data from blocks on db
  useEffect(() => {
    const data = parseBlocksToGridData(filteredBlocks, filteredStates);

    setGridData(data);
    setIsLoadingGridData(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredBlocks]);

  // useffect hook for fetching service info and value
  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const info = await fetchServiceInfo(
          serviceId,
          getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org')
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setServiceInfo(info);
        setIsLoadingServiceInfo(false);
        // setServiceValue(value);
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchService();
    }
  }, [serviceId]);

  // subscribe service info and value
  useSubscribeServiceInfo({
    endpoint: localStorage.getItem('jamUrl') || 'dot-0.jamduna.org',
    serviceID: serviceId,
    setStatus: (status: ServiceInfo) => {
      setServiceInfo(status);
    }
  });
  useSubscribeServiceValue({
    endpoint: localStorage.getItem('jamUrl') || 'dot-0.jamduna.org',
    serviceID: serviceId,
    setStatus: (status: ServiceValue) => {
      let data = serviceValue;
      const index = data.findIndex((item) => item.key === status.key);

      if (index === -1) {
        data.push(status); // insert
      } else {
        data[index] = status; // update
      }

      data = data.sort((a, b) => {
        return b.slot - a.slot;
      });
      setServiceValue(data);
    }
  });

  const getServiceMetadata = (id: number) => {
    const service = serviceList.find((item) => item.service === id);

    return service?.metadata || '-';
  };

  if (!isAllLoaded) {
    return <Loading />;
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Box sx={{ alignItems: 'center', display: 'inline-flex', mb: 2 }}>
        <Service
          mode={ItemMode.Large}
          name={serviceId}
        />
      </Box>
      {!serviceInfo
        ? (
          <Paper
            sx={{ marginBlock: 3, p: 3 }}
            variant='outlined'
          >
            <Typography
              color='#444444'
              fontSize='16px'
              textAlign='center'
              variant='h6'
            >
            Loading service info...
            </Typography>
          </Paper>
        )
        : (
          <ServiceInfoTable
            metadata={getServiceMetadata(serviceInfo.service_index)}
            serviceInfo={serviceInfo}
          ></ServiceInfoTable>
        )}
      {serviceValue.length === 0
        ? (
          <Paper
            sx={{ marginBlock: 3, p: 3 }}
            variant='outlined'
          >
            <Typography
              color='#444444'
              fontSize='16px'
              textAlign='center'
              variant='h6'
            >
            Loading service value...
            </Typography>
          </Paper>
        )
        : (
          <ServiceValueTable
            serviceId={serviceIdNumber}
            values={serviceValue}
          />
        )}
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
          serviceId={serviceIdNumber}
          services={serviceList}
          showActive={showOnlyWorkPackages}
          timeslots={gridData.timeslots}
          timestamps={gridData.timestamps}
        />
      </Box>
      {serviceStatistics.length > 0
        ? (
          <ServiceStatsGrid stats={serviceStatistics.slice(0, 8)} />
        )
        : (
          <Typography
            color='#444444'
            fontSize='16px'
            textAlign='center'
            variant='h6'
          >
          Loading service statistics...
          </Typography>
        )}
      <Grid
        container
        spacing={4}
        sx={{ my: 5 }}
      >
        <Grid size={6}>
          <RecentWorkPackages
            reports={activeStates}
            services={serviceList}
          />
        </Grid>
        <Grid size={6}>
          <RecentPreimages preimages={recentPreimages} />
        </Grid>
      </Grid>
    </Container>
  );
}
