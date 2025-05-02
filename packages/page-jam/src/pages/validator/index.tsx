// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ReportWithTime } from '../../components/jamitem/index.js';
import type { Block } from '../../db/db.js';
import type { KeyedItem, ServiceInfoDetail } from '../../types/index.js';
import type { ValidatorResult, ValidatorStatistics } from '../../utils/blockAnalyzer.js';

import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LatestBlocks from '../../components/home/lists/latest-list/LatestBlocks.js';
import Loading from '../../components/home/Loading.js';
import { ValidatorIcon } from '../../components/Icons/index.js';
import { RecentWorkPackages } from '../../components/jamitem/index.js';
import { ValidatorStatisticsTable } from '../../components/jamitem/validator/ValidatorItem/statistics.js';
import { ValidatorTable } from '../../components/jamitem/validator/ValidatorItem/table.js';
import { useWsRpcContext } from '../../contexts/WSRpcContext/index.js';
import { fetchListServices } from '../../hooks/useFetchListServices.js';
import { fetchValidatorStatistics, filterBlocksFromAuthor, filterWorkPackagesFromValidator, getValidator } from '../../utils/blockAnalyzer.js';
import { getRpcUrlFromWs } from '../../utils/ws.js';

export default function ValidatorIndexDetailPage () {
  const { hash, index } = useParams();

  const [validator, setValidator] = useState<ValidatorResult | null>(null);
  const [statistics, setStatistics] = useState<ValidatorStatistics | null>(
    null
  );
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);
  const [activeStates, setActiveStates] = useState<ReportWithTime[]>([]);
  const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);

  const [loadingValidator, setLoadingValidator] = useState(true);
  const [loadingStatistics, setLoadingStatistics] = useState(true);
  const [loadingBlocks, setLoadingBlocks] = useState(true);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const isLoading = () =>
    loadingValidator ||
    loadingStatistics ||
    loadingBlocks ||
    loadingStates ||
    loadingServices;

  const { currentBlock, currentState, now } = useWsRpcContext();

  const isValidatorSame = (key1: KeyedItem, key2: KeyedItem) => {
    if (key1.bandersnatch !== key2.bandersnatch) {
      return false;
    }

    if (key1.ed25519 !== key2.ed25519) {
      return false;
    }

    if (key1.bls !== key2.bls) {
      return false;
    }

    if (key1.metadata !== key2.metadata) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    const fetchValidator = async () => {
      try {
        const data = await getValidator(Number(index), hash || 'latest');

        setValidator(data);
      } catch (err) {
        console.error('Error loading validator:', err);
      }

      setLoadingValidator(false);
    };

    const fetchStatistics = async () => {
      try {
        const stat = await fetchValidatorStatistics(Number(index), hash || 'latest');

        setStatistics(stat);
      } catch (err) {
        console.error('Error loading statistics:', err);
      }

      setLoadingStatistics(false);
    };

    fetchValidator();
    fetchStatistics();
  }, [index, hash]);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const blocks = await filterBlocksFromAuthor(Number(index));

        setFilteredBlocks(blocks);
      } catch (err) {
        console.error('Error loading blocks:', err);
      }

      setLoadingBlocks(false);
    };

    const fetchStates = async () => {
      try {
        const states = await filterWorkPackagesFromValidator(Number(index));

        setActiveStates(states);
      } catch (err) {
        console.error('Error loading work packages:', err);
      }

      setLoadingStates(false);
    };

    const fetchService = async () => {
      try {
        const services = await fetchListServices(getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org'));

        setServiceList(services);
      } catch (err) {
        console.error('Error loading services:', err);
      }

      setLoadingServices(false);
    };

    fetchBlocks();
    fetchStates();
    fetchService();
  }, [currentBlock, currentState, now]);

  if (isLoading()) {
    return <Loading />;
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          mb: 3,
          gap: '10px'
        }}
      >
        <ValidatorIcon
          color={'#444'}
          size={24}
        />
        <Typography
          color='#444'
          fontSize='28px'
          variant='subtitle2'
        >
          Validator {index}
        </Typography>
      </Box>
      {validator !== null && (
        <>
          <ValidatorTable
            badge=''
            hash={hash || 'latest'}
            title={'Current Value'}
            validator={validator.current}
          />
          <ValidatorTable
            badge={
              isValidatorSame(validator.current, validator.previous)
                ? 'same'
                : ''
            }
            hash={hash || 'latest'}
            title={'Previous Value'}
            validator={validator.previous}
          />
          <ValidatorTable
            badge={
              isValidatorSame(validator.current, validator.next) ? 'same' : ''
            }
            hash={hash || 'latest'}
            title={'Next Value'}
            validator={validator.next}
          />
          <ValidatorTable
            badge={
              isValidatorSame(validator.current, validator.staging)
                ? 'same'
                : ''
            }
            hash={hash || 'latest'}
            title={'Staging Value'}
            validator={validator.staging}
          />
        </>
      )}
      {validator === null && <Box>
          No matching validator with {hash === undefined ? 'latest block' : `hash ${hash}`}
      </Box>}
      {statistics !== null && (
        <ValidatorStatisticsTable
          current={statistics.current}
          last={statistics.last}
          title={'Statistics'}
        />
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
          <LatestBlocks latestBlocks={filteredBlocks.slice(0, 12)} />
        </Grid>
      </Grid>
    </Container>
  );
}
