// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ValidatorKey } from '../../utils/blockAnalyzer.js';

import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LabeledRow } from '../../components/display/LabeledRow.js';
import Loading from '../../components/home/Loading.js';
import { ValidatorIcon } from '../../components/Icons/index.js';
import { ValidatorTable } from '../../components/jamitem/index.js';
import { fetchValidatorFromKey } from '../../utils/blockAnalyzer.js';

export default function ValidatorKeyDetailPage () {
  const { hash, key } = useParams();

  const [validatorKey, setValidatorKey] = useState<ValidatorKey | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchValidator = async () => {
      const data = await fetchValidatorFromKey(key || '', hash || 'latest');

      setValidatorKey(data);
      setLoading(true);
    };

    fetchValidator();
  }, [key, hash]);

  if (!loading) {
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
          Validator
        </Typography>
        <Typography
          color='#444'
          fontSize='16px'
          mt='10px'
          variant='subtitle2'
        >
          {key}
        </Typography>
      </Box>
      {validatorKey !== null && (
        <>
          <Paper
            sx={{
              px: 2,
              py: 1,
              my: 4,
              boxShadow: 'none',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <LabeledRow
                label='Current Validator:'
                tooltip='current validator index'
                value={
                  validatorKey.current !== -1
                    ? (
                      <Link
                        to={`/jam/validator/${validatorKey.current}/${hash}`}
                      >
                        {validatorKey.current}
                      </Link>
                    )
                    : (
                      'NOT FOUND'
                    )
                }
              />
              <LabeledRow
                label='Previous Validator:'
                tooltip='previous validator index'
                value={
                  validatorKey.previous !== -1
                    ? (
                      <Link
                        to={`/jam/validator/${validatorKey.previous}/${hash}`}
                      >
                        {validatorKey.previous}
                      </Link>
                    )
                    : (
                      'NOT FOUND'
                    )
                }
              />
              <LabeledRow
                label='Next Validator:'
                tooltip='next validator index'
                value={
                  validatorKey.next !== -1
                    ? (
                      <Link
                        to={`/jam/validator/${validatorKey.next}/${hash}`}
                      >
                        {validatorKey.next}
                      </Link>
                    )
                    : (
                      'NOT FOUND'
                    )
                }
              />
              <LabeledRow
                label='Staging Validator:'
                tooltip='staging validator index'
                value={
                  validatorKey.staging !== -1
                    ? (
                      <Link
                        to={`/jam/validator/${validatorKey.staging}/${hash}`}
                      >
                        {validatorKey.staging}
                      </Link>
                    )
                    : (
                      'NOT FOUND'
                    )
                }
              />
            </Box>
          </Paper>
          <ValidatorTable
            badge=''
            hash={hash || 'latest'}
            title={'Matching validator'}
            validator={validatorKey.item}
          />
        </>
      )}
      {validatorKey === null && <>NOT FOUND</>}
    </Container>
  );
}
