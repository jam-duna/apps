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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const serviceId = params.service!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

      setPreimage(data as unknown as ServicePreimage);
      setLoadingP(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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

        if (!data) {
          setStatus('solicited but not available');
        } else if (data.status === 1) {
          setStatus('available');
        } else if (data.status === 2) {
          setStatus('forgotten/not available');
        } else if (data.status === 3) {
          setStatus('available again');
        }

        setLoadingS(false);
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchRequest();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preimage]);

  useSubscribeServicePreimage({
    endpoint: localStorage.getItem('jamUrl') || 'dot-0.jamduna.org',
    hash: preimageHash,
    serviceID: serviceId,
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
      <Box sx={{ alignItems: 'center', display: 'inline-flex', mb: 2 }}>
        <Preimage
          hash={preimageHash}
          mode={ItemMode.Large}
          service={serviceId}
        />
      </Box>
      <Paper
        sx={{ marginBlock: 3, p: 3 }}
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
