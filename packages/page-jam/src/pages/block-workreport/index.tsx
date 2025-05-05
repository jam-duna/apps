// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Block } from '../../db/db.js';
import type { Guarantee } from '../../types/index.js';

import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LabeledRow } from '../../components/display/LabeledRow.js'; // adjust the import path as needed
import { WorkReportIcon } from '../../components/Icons/index.js';
import { Hash } from '../../components/jamitem/index.js';
import { fetchBlock } from '../../hooks/useFetchBlock.js';
import { useWorkReportStatuses } from '../../hooks/useWorkReportStatuses.js';
import { workReportMapping } from '../../utils/tooltipDetails.js'; // Import the new mapping bundle
import { getRpcUrlFromWs } from '../../utils/ws.js';

export default function WorkReportDetailPage () {
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const headerHash = params.headerhash!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const workReportHash = params.workPackageHash!;

  const [workReport, setWorkReport] = useState<Guarantee | null>(null);
  const [blockRecord, setBlockRecord] = useState<Block | null>(null);

  // Fetch block record (to extract current slot) based on headerHash.
  useEffect(() => {
    if (headerHash) {
      const prepareData = async () => {
        const data = await fetchBlock(
          headerHash,
          getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org'),
          'hash'
        );

        setBlockRecord(data);
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      prepareData();
    }
  }, [headerHash]);

  // Fetch the work report from the current block's guarantees.
  useEffect(() => {
    if (headerHash && workReportHash) {
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (blockRecord && blockRecord.header && blockRecord.extrinsic) {
        const reports = blockRecord.extrinsic.guarantees || [];
        const found = reports.find(
          (r: Guarantee) => r.report.package_spec.hash === workReportHash
        );

        setWorkReport(found ?? null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockRecord]);

  // Use the custom hook to get the status for the single work report.
  // const reportHash = workReport?.report?.package_spec?.hash;
  const reportHashArray = useMemo(
    () => (workReportHash ? [workReportHash] : []),
    [workReportHash]
  );
  const currentSlot = blockRecord?.overview?.slot || 0;
  const statuses = useWorkReportStatuses(reportHashArray, currentSlot);

  if (!workReport) {
    return (
      <Container
        className='hasOwnMaxWidth'
        maxWidth='lg'
        sx={{ mt: 4 }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography
            sx={{ fontSize: '32px', fontWeight: 'bold', mb: 2 }}
            variant='h2'
          >
            Work Report Details
          </Typography>
          <Typography variant='body1'>
            Loading work report details...
          </Typography>
        </Paper>
      </Container>
    );
  }

  // Destructure fields from the work report.
  const { report, signatures, slot } = workReport;
  // eslint-disable-next-line camelcase
  const { auth_output, authorizer_hash, context, core_index, package_spec } =
    report;

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Box
        alignItems='center'
        display='flex'
        gap={0.5}
        justifyContent='start'
        sx={{
          color: '#444444',
          cursor: 'pointer',
          height: '100%',
          my: '10px',
          width: '100%'
        }}
      >
        <WorkReportIcon
          color='#555'
          size={24}
        />
        <Typography
          fontSize={'32px'}
          fontWeight={'bold'}
          variant='subtitle2'
        >
          Work Report Details
        </Typography>
      </Box>
      <Paper
        sx={{ p: 3 }}
        variant='outlined'
      >
        {/* SECTION 1: Basic Info */}
        <Typography
          sx={{ mb: 2 }}
          variant='h6'
        >
          Basic Info
        </Typography>
        {workReportMapping.basicInfo.map((item, idx) => (
          <LabeledRow
            key={idx}
            label={item.label}
            tooltip={item.tooltip}
            value={
              item.label === 'Header Hash:'
                ? (
                  <Link
                    to={`/jam/block/${headerHash}?type=hash`}
                  >
                    <Hash hash={headerHash} />
                  </Link>
                )
                : item.label === 'Slot:'
                  ? (
                    slot ?? 'N/A'
                  )
                  : item.label === 'Core Index:'
                    ? (
                      // eslint-disable-next-line camelcase
                      core_index ?? 'N/A'
                    )
                    : item.label === 'Report Status:'
                      ? (
                        // eslint-disable-next-line camelcase
                        statuses[package_spec.hash] || 'N/A'
                      )
                      : (
                        // eslint-disable-next-line camelcase
                        package_spec.hash
                      )
            }
          />
        ))}
        <Divider sx={{ my: 2 }} />
        {/* SECTION 2: Package Spec */}
        <Typography
          sx={{ mb: 2 }}
          variant='h6'
        >
          Package Spec
        </Typography>
        {workReportMapping.packageSpec.map((item, idx) => (
          <LabeledRow
            key={idx}
            label={item.label}
            tooltip={item.tooltip}
            value={
              item.label === 'Length:'
                ? (
                  // eslint-disable-next-line camelcase
                  package_spec.length ?? 'N/A'
                )
                : item.label === 'Erasure Root:'
                  ? (
                    // eslint-disable-next-line camelcase
                    <Hash hash={package_spec.erasure_root}></Hash>
                  )
                  : item.label === 'Exports Root:'
                    ? (
                      // eslint-disable-next-line camelcase
                      <Hash hash={package_spec.exports_root}></Hash>
                    )
                    : item.label === 'Exports Count:'
                      ? (
                        // eslint-disable-next-line camelcase
                        package_spec.exports_count
                      )
                      : (
                        // eslint-disable-next-line camelcase
                        <Hash hash={package_spec.hash}></Hash>
                      )
            }
          />
        ))}
        <Divider sx={{ my: 2 }} />
        {/* SECTION 3: Context */}
        <Typography
          sx={{ mb: 2 }}
          variant='h6'
        >
          Context
        </Typography>
        {workReportMapping.context.map((item, idx) => (
          <LabeledRow
            key={idx}
            label={item.label}
            tooltip={item.tooltip}
            value={
              item.label === 'Anchor:'
                ? (
                  <Hash hash={context.anchor}></Hash>
                )
                : item.label === 'State Root:'
                  ? (
                    <Hash hash={context.state_root}></Hash>
                  )
                  : item.label === 'Beefy Root:'
                    ? (
                      <Hash hash={context.beefy_root}></Hash>
                    )
                    : item.label === 'Lookup Anchor:'
                      ? (
                        <Hash hash={context.lookup_anchor}></Hash>
                      )
                      : item.label === 'Lookup Anchor Slot:'
                        ? (
                          context.lookup_anchor_slot
                        )
                        : item.label === 'Prerequisites:'
                          ? (
                            context.prerequisites && context.prerequisites.length > 0
                              ? (
                                context.prerequisites.map((p: string, idx: number) => (
                                  <Hash
                                    hash={p}
                                    key={idx}
                                  ></Hash>
                                ))
                              )
                              : (
                                'None'
                              )
                          )
                          : (
                            'N/A'
                          )
            }
          />
        ))}
        <Divider sx={{ my: 2 }} />
        {/* SECTION 4: Authorization */}
        <Typography
          sx={{ mb: 2 }}
          variant='h6'
        >
          Authorization
        </Typography>
        {workReportMapping.authorization.map((item, idx) => (
          <LabeledRow
            key={idx}
            label={item.label}
            tooltip={item.tooltip}
            value={
              item.label === 'Authorizer Hash:'
                ? (
                  // eslint-disable-next-line camelcase
                  <Hash hash={authorizer_hash}></Hash>
                )
                : item.label === 'Auth Output:'
                  ? (
                    // eslint-disable-next-line camelcase
                    auth_output || '0x'
                  )
                  : (
                    'N/A'
                  )
            }
          />
        ))}
        <Divider sx={{ my: 2 }} />
        {/* SECTION 5: Signatures */}
        <Typography
          sx={{ mb: 2 }}
          variant='h6'
        >
          Signatures
        </Typography>
        {signatures && signatures.length > 0
          ? (
            signatures.map(
              (
                sig: { validator_index: number; signature: string },
                idx: number
              ) => (
                <LabeledRow
                  icon='validator'
                  key={idx}
                  label={`Validator ${sig.validator_index}:`}
                  tooltip='Validator signature for this work report.'
                  value={<Hash hash={sig.signature}></Hash>}
                />
              )
            )
          )
          : (
            <Typography>No signatures found.</Typography>
          )}
      </Paper>
    </Container>
  );
}
