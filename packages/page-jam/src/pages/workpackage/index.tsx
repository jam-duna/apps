// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Report } from '../../types/index.js';

import { Check, ContentCopy } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { githubLightTheme, JsonEditor } from 'json-edit-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LabeledRow } from '../../components/display/LabeledRow.js';
import Loading from '../../components/home/Loading.js';
import { Core, ItemMode, Segment, Service, WorkPackage } from '../../components/jamitem/index.js';
import { useSubscribeWorkpackage } from '../../hooks/subscribeWorkpackage.js';
import { fetchAuditWorkPackage } from '../../hooks/useFetchAuditWorkpackage.js';
import { fetchWorkPackage } from '../../hooks/useFetchWorkpackage.js';
import { fallbackCopyTextToClipboard } from '../../utils/clipboard.js';
import { getRpcUrlFromWs } from '../../utils/ws.js';

export default function WorkPackageDetailPage () {
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const workPackageHash = params.workPackageHash!;

  const [workPackageStatus, setWorkPackageStatus] = useState<string>('-');
  const [auditData, setAuditData] = useState<any[] | null>(null);
  const [workPackageInfo, setWorkPackageInfo] =
    useState<Report | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(JSON.stringify(auditData));
      } else {
        fallbackCopyTextToClipboard(JSON.stringify(auditData));
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await fetchWorkPackage(
        workPackageHash,
        getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org')
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setWorkPackageInfo(data);
    })();
  }, [workPackageHash]);

  const fetchAudit = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await fetchAuditWorkPackage(
      workPackageHash,
      getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org')
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setAuditData(data);
  };

  useSubscribeWorkpackage({
    endpoint: localStorage.getItem('jamUrl') || 'dot-0.jamduna.org',
    hash: workPackageHash,
    setStatus: (status: string) => {
      setWorkPackageStatus(status);
    }
  });

  if (!workPackageInfo) {
    return <Loading />;
  }

  return (
    <Container
      className='hasOwnMaxWidth'
      maxWidth='lg'
      sx={{ mt: 4 }}
    >
      <Box sx={{ alignItems: 'center', display: 'inline-flex', mb: 4 }}>
        <WorkPackage
          hash={workPackageHash}
          mode={ItemMode.Large}
          report={null}
          timestamp={0}
        />
      </Box>
      <Paper
        sx={{ p: 3 }}
        variant='outlined'
      >
        <LabeledRow
          icon='core'
          label='Core'
          tooltip='Core Index'
          value={
            <Core
              index={workPackageInfo.core_index}
              mode={ItemMode.Medium}
            />
          }
        />
        <LabeledRow
          icon='service'
          label='Services'
          tooltip='Services Used'
          value={
            <Box
              display='flex'
              gap={2}
            >
              {workPackageInfo.results.map((item, itemIndex) => (
                <Service
                  key={itemIndex}
                  mode={ItemMode.Table}
                  name={item.service_id.toString()}
                />
              ))}
            </Box>
          }
        />
        <LabeledRow
          icon='status'
          label='Status'
          tooltip='Workpackage Status'
          value={<Typography marginLeft='5px'>{workPackageStatus}</Typography>}
        />
        {workPackageInfo.context.prerequisites !== undefined &&
          workPackageInfo.context.prerequisites.length > 0 && (
          <LabeledRow
            icon='workpackage'
            label='Prereqs'
            tooltip='prerequisites'
            value={workPackageInfo.context.prerequisites.map(
              (item, itemIndex) => (
                <WorkPackage
                  hash={item}
                  key={itemIndex}
                  mode={ItemMode.Grid}
                  report={null}
                  timestamp={0}
                />
              )
            )}
          />
        )}
        <LabeledRow
          icon='availability'
          label='Availability'
          mti='8px'
          mtl='12px'
          tooltip='Availability Spec'
          value={
            <JsonEditor
              collapse={false}
              data={workPackageInfo.package_spec}
              minWidth={'100%'}
              rootFontSize={'13px'}
              rootName=''
              showCollectionCount='when-closed'
              theme={githubLightTheme}
              viewOnly={true}
            />
          }
        />
        <LabeledRow
          icon='refine'
          label='Refinement'
          mti='8px'
          mtl='12px'
          tooltip='Refinement Context'
          value={
            <JsonEditor
              collapse={false}
              data={workPackageInfo.context}
              minWidth={'100%'}
              rootFontSize={'13px'}
              rootName=''
              showCollectionCount='when-closed'
              theme={githubLightTheme}
              viewOnly={true}
            />
          }
        />
        <LabeledRow
          icon='work_results'
          label='Results'
          mti='8px'
          mtl='12px'
          tooltip='Results'
          value={
            <Box
              display='flex'
              flexDirection='column'
            >
              {workPackageInfo.results.map((item, itemIndex) => (
                <JsonEditor
                  collapse={true}
                  data={item}
                  key={itemIndex}
                  minWidth={'100%'}
                  rootFontSize={'13px'}
                  rootName={`Work Item ${itemIndex + 1}`}
                  showCollectionCount='when-closed'
                  theme={githubLightTheme}
                  viewOnly={true}
                />
              ))}
            </Box>
          }
        />
        <LabeledRow
          icon='segment'
          label='Segments'
          tooltip='Segment results'
          value={
            <Box
              display='flex'
              flexWrap='wrap'
            >
              {Array.from(
                { length: workPackageInfo.package_spec.exports_count },
                (_, i) => i
              ).map((_item, itemIndex) => (
                <Segment
                  hash={workPackageHash}
                  index={itemIndex}
                  key={itemIndex}
                  mode={ItemMode.Medium}
                />
              ))}
              {workPackageInfo.package_spec.exports_count === 9 && (
                <Link
                  to={`/jam/game-of-life-viwer?hash=${workPackageHash}`}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      ml: 1,
                      textDecoration: 'underline'
                    }}
                  >
                    Game of Life Viewer
                  </Typography>
                </Link>
              )}
            </Box>
          }
        />
        <LabeledRow
          label='Dependents'
          tooltip='Dependents'
          value=' TODO'
        />
      </Paper>
      <Paper
        sx={{ marginBlock: 3, p: 3 }}
        variant='outlined'
      >
        <Button
          // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/no-misused-promises
          onClick={fetchAudit}
          variant='contained'
        >
          Audit Work Package
        </Button>
        {auditData !== null && (
          <Box sx={{ margin: '0 auto', maxWidth: '100%', p: 2 }}>
            <Box
              alignItems='center'
              display='flex'
              justifyContent='space-between'
              mb={1}
              sx={{ position: 'relative' }}
            >
              <Typography variant='h6'>Audit Workpackage Result</Typography>
              <Tooltip
                arrow
                placement='top'
                title={copied ? 'Copied!' : 'Copy'}
              >
                <IconButton
                  // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/no-misused-promises
                  onClick={handleCopy}
                  sx={{
                    border: '1px solid #888',
                    borderRadius: '4px',
                    p: '6px',
                    position: 'absolute',
                    right: '6px',
                    top: '6px'
                  }}
                >
                  {!copied
                    ? (
                      <ContentCopy
                        sx={{ color: '#444444', height: '12px', width: '12px' }}
                      />
                    )
                    : (
                      <Check
                        sx={{ color: '#444444', height: '12px', width: '12px' }}
                      />
                    )}
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              InputProps={{ readOnly: true }}
              fullWidth
              maxRows={15}
              multiline
              value={JSON.stringify(auditData, null, 2)}
              variant='outlined'
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
}
