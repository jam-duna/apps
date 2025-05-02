// [object Object]
// SPDX-License-Identifier: Apache-2.0

import type { ServiceInfoDetail } from '../../types/index.js';

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ServiceIcon } from '../Icons/index.js';
import { Blocks, Core, ItemMode, Slot, WorkPackage } from '../jamitem/index.js';

// Extend SquareContent to include headerHash.
export interface SquareContent {
  serviceName: string[];
  workPackageHash: string;
  headerHash?: string;
  isBusy: boolean;
}

export interface MainViewGridProps {
  /** Sorted list of timeslots (columns). */
  timeslots: number[];
  timestamps: number[];
  /** Sorted list of cores (rows). */
  cores: number[];
  /** data[coreIndex][timeslot] = { serviceName, workPackageHash, headerHash, isBusy } */
  data: Record<number, Record<number, SquareContent>>;
  showActive: boolean;
  serviceId: number;
  services: ServiceInfoDetail[];
}

export default function MainViewGrid ({ cores,
  data,
  serviceId,
  services,
  showActive,
  timeslots,
  timestamps }: MainViewGridProps) {
  const navigate = useNavigate();

  // Compute filtered cores and timeslots when toggle is on.
  const { filteredCores, filteredTimeslots, filteredTimestamps } =
    useMemo(() => {
      if (!showActive) {
        return {
          filteredCores: cores,
          filteredTimestamps: timestamps.slice(-8),
          filteredTimeslots: timeslots.slice(-8)
        };
      }

      // Build a map of busy cells: busyCells[core] is a Set of slots that are busy.
      const busyCells: Record<number, Set<number>> = {};

      for (const core of cores) {
        for (const slot of timestamps) {
          if (
            data[core]?.[slot]?.isBusy &&
            ((serviceId !== -1 &&
              data[core]?.[slot]?.serviceName.findIndex(
                (item) => item === serviceId.toString()
              ) !== -1) ||
              serviceId === -1)
          ) {
            if (!busyCells[core]) {
              busyCells[core] = new Set();
            }

            busyCells[core].add(slot);
          }
        }
      }

      // Filter cores that have at least one busy cell.
      const filteredCores = cores.filter((core) => busyCells[core]?.size);
      // Filter timeslots that appear in at least one busy cell in the filtered cores.
      let filteredTimestamps = timestamps.filter((slot) =>
        filteredCores.some((core) => busyCells[core].has(slot))
      );

      filteredTimestamps = filteredTimestamps.slice(-8);

      let filteredTimeslots: number[] = [];

      timestamps.forEach((value, index) => {
        if (filteredTimestamps.find((fvalue) => fvalue === value)) {
          filteredTimeslots.push(timeslots[index]);
        }
      });
      filteredTimeslots = filteredTimeslots.slice(-8);

      return { filteredCores, filteredTimestamps, filteredTimeslots };
    }, [showActive, cores, timestamps, timeslots, data]);

  const getService = (id: number) => {
    const service = services.find((item) => item.service === id);

    return service;
  };

  const getServiceName = (id: number) => {
    const service = getService(id);

    if (service === undefined) {
      return id.toString();
    }

    if (service.metadata.length === 0) {
      return id.toString();
    }

    return service.metadata;
  };

  const truncateString = (str: string, maxLen: number) => {
    if (str.length < maxLen) {
      return str;
    }

    return str.slice(0, maxLen) + '...';
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: '100%', mb: 4 }}
      >
        <Table
          size='small'
          sx={{ width: '100%', tableLayout: 'fixed' }}
        >
          <TableHead>
            <TableRow>
              {/* Top-left cell: Blocks */}
              <TableCell
                align='center'
                sx={{ padding: 0, height: '60px', width: '120px' }}
              >
                <Blocks />
              </TableCell>
              {/* Timeslot headers */}
              {filteredTimestamps.map((timestamp, index) => (
                <TableCell
                  align='center'
                  key={timestamp}
                  sx={{ padding: 0, height: '60px' }}
                >
                  <Slot
                    mode={ItemMode.Small}
                    showmode={index === 0 ? 'long' : 'short'}
                    slot={
                      filteredTimeslots === undefined
                        ? 0
                        : filteredTimeslots[index]
                    }
                    timestamp={timestamp}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCores.map((coreIndex) => (
              <TableRow key={coreIndex}>
                {/* Left cell: Core */}
                <TableCell
                  align='center'
                  sx={{ padding: 0, height: '80px', border: 'none' }}
                >
                  <Core
                    index={coreIndex}
                    mode={ItemMode.Small}
                  />
                </TableCell>
                {/* Data cells for each timeslot */}
                {filteredTimestamps.map((slot) => {
                  const cell = data[coreIndex]?.[slot];

                  return (
                    <TableCell
                      align='center'
                      key={slot}
                      sx={{ padding: 0, height: '80px', border: 'none' }}
                    >
                      {cell.serviceName.length > 0 &&
                      cell.workPackageHash.length > 0
                        ? (
                          <Box
                            alignItems='start'
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                            sx={{
                              backgroundColor: '#e8f5e9',
                              cursor: 'pointer',
                              width: '100%',
                              height: '100%'
                            }}
                          >
                            <Box
                              alignItems='center'
                              display='flex'
                              gap='3px'
                              justifyContent='start'
                              sx={{
                                cursor: 'pointer',
                                paddingInline: '5px',
                                transition: 'all 0.3s ease-in-out',
                                color: '#444444'
                              }}
                            >
                              <ServiceIcon
                                color={'#311b92'}
                                size={16}
                              />
                              {cell.serviceName.map((item, index) => (
                                <Tooltip
                                  arrow
                                  key={index}
                                  placement='top'
                                  title={`ServiceId: ${item}`}
                                >
                                  <Typography
                                    fontSize='12px'
                                    onClick={() => {
                                      navigate(`/jam/service/${item}`);
                                    }}
                                    sx={{
                                      ':hover': {
                                        color: '#311b92'
                                      }
                                    }}
                                    variant='subtitle2'
                                  >
                                    {truncateString(
                                      getServiceName(Number.parseInt(item)),
                                      5
                                    )}
                                  </Typography>
                                </Tooltip>
                              ))}
                            </Box>
                            <WorkPackage
                              hash={cell.workPackageHash}
                              mode={ItemMode.Small}
                              report={null}
                              timestamp={0}
                            />
                          </Box>
                        )
                        : (
                          <>_</>
                        )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
