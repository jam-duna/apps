// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ServicePreimage } from '../../types/index.js';

import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LabeledRow } from '../../components/display/LabeledRow.js';
import Loading from '../../components/home/Loading.js';
import { ItemMode, Preimage, PreimageRawbytes, Service } from '../../components/jamitem/index.js';
import { useSubscribeServicePreimage } from '../../hooks/subscribeServicePreimage.js';
import { fetchServicePreimage } from '../../hooks/useFetchServicePreimage.js';
import { fetchServiceRequest } from '../../hooks/useFetchServiceRequest.js';
import { getRpcUrlFromWs } from '../../utils/ws.js';

export default function PreimageDetailPage () {
  const params = useParams();
  const serviceId = params.service!;
  const preimageHash = params.hash!;

  const [preimage, setPreimage] = useState<ServicePreimage | null>(null);
  const [status, setStatus] = useState<string>('');

  const [loadingP, setLoadingP] = useState(true);
  const [loadingS, setLoadingS] = useState(true);

  useEffect(() => {
    const fetchPreimage = async () => {
      const data = await fetchServicePreimage(
        serviceId,
        preimageHash,
        getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org')
      );

      setPreimage(data);
      setLoadingP(false);
    };

    fetchPreimage();
  }, [serviceId, preimageHash]);

  useEffect(() => {
    if (preimage !== null) {
      const fetchRequest = async () => {
        const data = await fetchServiceRequest(
          serviceId,
          preimageHash,
          (preimage?.length || 0).toString(),
          getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org')
        );

        if (data.length === 0) {
          setStatus('solicited but not available');
        } else if (data.length === 1) {
          setStatus('available');
        } else if (data.length === 2) {
          setStatus('forgotten/not available');
        } else if (data.length === 3) {
          setStatus('available again');
        }

        setLoadingS(false);
      };

      fetchRequest();
    }
  }, [preimage]);

  useSubscribeServicePreimage({
    endpoint: localStorage.getItem('jamUrl') || 'dot-0.jamduna.org',
    serviceID: serviceId,
    hash: preimageHash,
    setPreimage: (preimage: ServicePreimage) => {
      setPreimage(preimage);
    },
    setRequest: (request: string) => {
      setStatus(request);
    }
  });

  if (loadingP || loadingS) {
    return <Loading />;
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 2 }}>
        <Preimage
          hash={preimageHash}
          mode={ItemMode.Large}
          service={serviceId}
        />
      </Box>
      <Paper
        sx={{ p: 3, marginBlock: 3 }}
        variant='outlined'
      >
        <LabeledRow
          icon='service'
          label='Service'
          tooltip='Service'
          value={<Service
            mode={ItemMode.Table}
            name={serviceId}
                 />}
        />
        <LabeledRow
          icon='status'
          label='Status'
          tooltip='Status of the Preimage'
          value={
            <Typography
              color='#444'
              fontSize='16px'
              pl='5px'
              variant='body2'
            >
              {status}
            </Typography>
          }
        />
        <LabeledRow
          icon='preimage'
          label='Hash'
          tooltip='Preimage Hash'
          value={
            <Preimage
              hash={preimageHash}
              mode={ItemMode.Medium}
              service={serviceId}
            />
          }
        />
        <LabeledRow
          icon='raw'
          label='Rawbytes'
          tooltip='Preimage Rawbytes'
          value={<PreimageRawbytes rawbytes={preimage?.rawbytes || ''} />}
        />
      </Paper>
    </Container>
  );
}
