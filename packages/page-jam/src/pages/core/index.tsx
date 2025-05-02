// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ReportWithTime } from '../../components/jamitem/index.js';
import type { Block, State } from '../../db/db.js';
import type { CoreStatistics, ServiceInfoDetail, ValidatorShowCase } from '../../types/index.js';
import type { GridData } from '../../utils/parseBlocksToGridData.js';

import { Box, Container, FormControlLabel, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CoreStatsGrid } from '../../components/core/index.js';
import { CustomToggle } from '../../components/display/CustomToggle.js';
import Loading from '../../components/home/Loading.js';
import MainViewGrid from '../../components/home/MainViewGrid.js';
import { ActiveValidators, Core, ItemMode, ListServices, RecentWorkPackages } from '../../components/jamitem/index.js';
import { useWsRpcContext } from '../../contexts/WSRpcContext/index.js';
import { DB_LIMIT } from '../../db/db.js';
import { fetchListServices } from '../../hooks/useFetchListServices.js';
import { filterActiveValidators, filterBlocks, filterCoreStatistics, filterStates, filterWorkPackages } from '../../utils/blockAnalyzer.js';
import { parseBlocksToGridData } from '../../utils/parseBlocksToGridData.js';
import { getRpcUrlFromWs } from '../../utils/ws.js';

export default function CoreDetailPage () {
  const params = useParams();
  const coreIndex = params.coreIndex ?? '0';
  const coreIndexNumber = Number.parseInt(coreIndex);

  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [activeStates, setActiveStates] = useState<ReportWithTime[]>([]);
  const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);
  const [activeValidators, setActiveValidators] = useState<ValidatorShowCase[]>(
    []
  );
  const [gridData, setGridData] = useState<GridData>({
    data: {},
    timeslots: [],
    timestamps: [],
    cores: [],
    coreStatistics: {}
  });
  const [statistics, setStatistics] = useState<Record<
  number,
  CoreStatistics
  > | null>(null);

  const [isLoadingBlocks, setIsLoadingBlocks] = useState(true);
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingActiveStates, setIsLoadingActiveStates] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingValidators, setIsLoadingValidators] = useState(true);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(true);
  const [isLoadingGridData, setIsLoadingGridData] = useState(true);

  const [showOnlyWorkPackages, setShowOnlyWorkPackages] = useState(true);

  const { currentBlock, currentState, currentStatistics, now } = useWsRpcContext();

  useEffect(() => {
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
      const states = await filterWorkPackages(coreIndexNumber);

      setActiveStates(states);
      setIsLoadingActiveStates(false);
    };

    const fetchListService = async () => {
      const services = await fetchListServices(getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org'));

      setServiceList(services);
      setIsLoadingServices(false);
    };

    const fetchActiveValidators = async () => {
      const validators = await filterActiveValidators(
        coreIndexNumber
      );

      setActiveValidators(validators);
      setIsLoadingValidators(false);
    };

    fetchBlocks();
    fetchStates();
    fetchActiveStates();
    fetchListService();
    fetchActiveValidators();
  }, [currentBlock, currentState, now]);

  useEffect(() => {
    const fetchCoreStatistics = async () => {
      const data = await filterCoreStatistics(
        coreIndexNumber,
        showOnlyWorkPackages
      );

      setStatistics(data);
      setIsLoadingStatistics(false);
    };

    fetchCoreStatistics();
  }, [currentStatistics, showOnlyWorkPackages]);

  useEffect(() => {
    const data = parseBlocksToGridData(filteredBlocks, filteredStates);

    data.cores = [coreIndexNumber];
    setGridData(data);
    setIsLoadingGridData(false);
  }, [filteredBlocks]);

  const isAllLoaded = !(
    isLoadingBlocks ||
        isLoadingStates ||
        isLoadingActiveStates ||
        isLoadingServices ||
        isLoadingValidators ||
        isLoadingStatistics ||
        isLoadingGridData
  );

  if (!isAllLoaded) {
    return <Loading />;
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 5 }}>
        <Core
          index={coreIndexNumber}
          mode={ItemMode.Large}
        />
      </Box>
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
              onChange={() => setShowOnlyWorkPackages((prev) => !prev)}
            />
          }
          label={showOnlyWorkPackages ? 'Active' : 'All'}
          labelPlacement='start'
          sx={{ paddingInline: '10px' }}
        />
        <MainViewGrid
          cores={[coreIndexNumber]}
          data={gridData.data}
          serviceId={-1}
          services={serviceList}
          showActive={showOnlyWorkPackages}
          timeslots={gridData.timeslots}
          timestamps={gridData.timestamps}
        />
      </Box>
      {gridData.timeslots.length > 0 && statistics && (
        <CoreStatsGrid stats={statistics} />
      )}
      <Grid
        container
        marginTop='20px'
        spacing={2}
      >
        <Grid size={6}>
          <RecentWorkPackages
            reports={activeStates}
            services={serviceList}
          />
        </Grid>
        <Grid size={6}>
          <Grid
            container
            spacing={4}
          >
            <Grid size={12}>
              <ListServices
                core={coreIndexNumber}
                reports={activeStates}
                services={serviceList}
              />
            </Grid>
            <Grid size={12}>
              <ActiveValidators validators={activeValidators} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
