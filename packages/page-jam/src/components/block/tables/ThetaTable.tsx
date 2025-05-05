// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

'use client';

import type { ThetaItem } from '../../../types/index.js';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React from 'react';

import ToggleHash from '../ToggleHashText.js';
import ReportTable from './ReportTable.js';

interface DependenciesProps {
  list: string[];
}

const Dependencies: React.FC<DependenciesProps> = ({ list }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='body1'>Dependencies</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {list.map((dependency, i) => (
            <Box
              key={i}
              sx={{ mb: 1 }}
            >
              <ToggleHash hash={dependency} />
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

interface ThetaTableProps {
  data: ThetaItem;
  headerHash: string;
}

export default function ThetaTable ({ data, headerHash }: ThetaTableProps) {
  return (
    <Box sx={{ my: 4 }}>
      {data.map((group, idx) => {
        // Check if group is a non-empty array.
        if (!Array.isArray(group) || group.length === 0) {
          return null;
        }

        return (
          <Box
            key={idx}
            sx={{ mb: 4 }}
          >
            {group.map((item, i) => {
              if (!item) {
                return null;
              }

              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const { dependencies, report } = item;

              return (
                <Box
                  key={i}
                  sx={{ mb: 2 }}
                >
                  {dependencies && dependencies.length > 0 && (
                    <Dependencies list={dependencies} />
                  )}
                  <ReportTable
                    data={report}
                    headerHash={headerHash}
                    idx={i}
                  />
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
