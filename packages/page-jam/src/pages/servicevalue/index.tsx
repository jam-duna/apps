// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ServiceInfoDetail, ServiceValue } from '../../types/index.js';

import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LabeledRow } from '../../components/display/LabeledRow.js';
import Loading from '../../components/home/Loading.js';
import { Hash } from '../../components/jamitem/index.js';
import { useSubscribeServiceValue } from '../../hooks/subscribeServiceValue.js';
import { fetchListServices } from '../../hooks/useFetchListServices.js';
import { fetchServiceValue } from '../../hooks/useFetchService.js';
import { bytesToHex, hexToBytes, ServiceStorageKey } from '../../utils/blake2.js';
import { getTimeFromSlot } from '../../utils/blockAnalyzer.js';
import { getRelativeTime } from '../../utils/helper.js';
import { getRpcUrlFromWs } from '../../utils/ws.js';

export default function ServiceValueDetailPage () {
  const params = useParams();

  const serviceId = params.service!;
  const key = params.key!;
  const headerhash = params.headerhash!;

  const [serviceValue, setServiceValue] = useState<ServiceValue | null>(null);
  const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);
  const [lastTime, setLastTime] = useState<string>('0 secs');

  const [vloading, setVLoading] = useState<boolean>(true);
  const [lloading, setLLoading] = useState<boolean>(true);

  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        const hash =
          '0x' +
          bytesToHex(
            ServiceStorageKey(Number.parseInt(serviceId), hexToBytes(key))
          );
        const value = await fetchServiceValue(
          serviceId,
          hash,
          getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org')
        );
        let data = serviceValue;

        if (data === null) {
          data = {
            serviceID: Number.parseInt(serviceId),
            key,
            hash,
            headerHash: headerhash,
            value,
            slot: 0
          };
        } else {
          data.value = value;
        }

        setServiceValue(data);
        setVLoading(false);
      };

      const fetchListService = async () => {
        const services = await fetchListServices(getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org'));

        setServiceList(services);
        setLLoading(false);
      };

      fetchService();
      fetchListService();
    }
  }, [serviceId, key, headerhash]);

  useEffect(() => {
    if (serviceValue !== null && serviceValue.slot !== 0) {
      const fetchTimeFromSlot = async () => {
        const time = await getTimeFromSlot(serviceValue.slot);

        setLastTime(getRelativeTime(time));
      };

      setTimeout(fetchTimeFromSlot, 10000);
    }
  }, [serviceValue]);

  useSubscribeServiceValue({
    endpoint: localStorage.getItem('jamUrl') || 'dot-0.jamduna.org',
    serviceID: serviceId,
    setStatus: (status: ServiceValue) => {
      if (status.key === key) {
        setServiceValue(status);
      }
    }
  });

  const getServiceMetadata = (id: number) => {
    const service = serviceList.find((item) => item.service === id);

    return service?.metadata || '-';
  };

  if (vloading || lloading) {
    return <Loading />;
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 3 }}>
        <Typography
          color='#444'
          fontSize='28px'
          variant='subtitle2'
        >
          Service Value
        </Typography>
      </Box>
      {!serviceValue
        ? (
          <Paper
            sx={{ p: 3, marginBlock: 3 }}
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
          <Paper
            sx={{ p: 2, marginBlock: 3 }}
            variant='outlined'
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <LabeledRow
                icon='service'
                label='Service ID:'
                tooltip='Service ID'
                value={
                  <Link
                    to={`/jam/service/${serviceValue.serviceID}`}
                  >
                    <Hash
                      hash={
                        serviceValue.serviceID.toString() +
                      ' / ' +
                      getServiceMetadata(serviceValue.serviceID)
                      }
                    />
                  </Link>
                }
              />
              <LabeledRow
                label='Storage Key:'
                tooltip='Storage Key'
                value={<Hash hash={serviceValue.hash} />}
              />
              <LabeledRow
                label='Key:'
                tooltip='Key'
                value={<Hash hash={serviceValue.key} />}
              />
              <LabeledRow
                label='Current Value:'
                tooltip='Current value'
                value={<Hash hash={serviceValue.value} />}
              />
              <LabeledRow
                icon='slot'
                label='Last Updated:'
                tooltip='Last Updated'
                value={
                  <Link
                    to={`/jam/block/${serviceValue.slot}`}
                  >
                    {lastTime} ago
                  </Link>
                }
              />
              <LabeledRow
                icon='block'
                label='Header hash:'
                tooltip='Header hash'
                value={
                  <Link
                    to={`/jam/block/${serviceValue.headerHash}`}
                  >
                    <Hash hash={serviceValue.headerHash} />
                  </Link>
                }
              />
            </Box>
          </Paper>
        )}
    </Container>
  );
}
