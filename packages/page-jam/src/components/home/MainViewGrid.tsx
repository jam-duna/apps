import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { Blocks, ItemMode, Slot, Core, WorkPackage } from "../jamitem/index.js";
import { ServiceInfoDetail } from "../../types/index.js";
import { ServiceIcon } from "../Icons/index.js";

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

export default function MainViewGrid({
  timeslots,
  timestamps,
  cores,
  data,
  showActive,
  serviceId,
  services,
}: MainViewGridProps) {
  const navigate = useNavigate();

  // Compute filtered cores and timeslots when toggle is on.
  const { filteredCores, filteredTimestamps, filteredTimeslots } =
    useMemo(() => {
      if (!showActive) {
        return {
          filteredCores: cores,
          filteredTimestamps: timestamps.slice(-8),
          filteredTimeslots: timeslots.slice(-8),
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
            if (!busyCells[core]) busyCells[core] = new Set();
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

    if (service === undefined) return id.toString();
    if (service.metadata.length === 0) return id.toString();
    return service.metadata;
  };

  const truncateString = (str: string, maxLen: number) => {
    if (str.length < maxLen) {
      return str;
    }
    return str.slice(0, maxLen) + "...";
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%", mb: 4 }}>
        <Table sx={{ width: "100%", tableLayout: "fixed" }} size="small">
          <TableHead>
            <TableRow>
              {/* Top-left cell: Blocks */}
              <TableCell
                align="center"
                sx={{ padding: 0, height: "60px", width: "120px" }}
              >
                <Blocks />
              </TableCell>
              {/* Timeslot headers */}
              {filteredTimestamps.map((timestamp, index) => (
                <TableCell
                  key={timestamp}
                  align="center"
                  sx={{ padding: 0, height: "60px" }}
                >
                  <Slot
                    mode={ItemMode.Small}
                    slot={
                      filteredTimeslots === undefined
                        ? 0
                        : filteredTimeslots[index]
                    }
                    timestamp={timestamp}
                    showmode={index === 0 ? "long" : "short"}
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
                  align="center"
                  sx={{ padding: 0, height: "80px", border: "none" }}
                >
                  <Core mode={ItemMode.Small} index={coreIndex} />
                </TableCell>
                {/* Data cells for each timeslot */}
                {filteredTimestamps.map((slot) => {
                  const cell = data[coreIndex]?.[slot];
                  return (
                    <TableCell
                      key={slot}
                      align="center"
                      sx={{ padding: 0, height: "80px", border: "none" }}
                    >
                      {cell.serviceName.length > 0 &&
                      cell.workPackageHash.length > 0 ? (
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="start"
                          sx={{
                            backgroundColor: "#e8f5e9",
                            cursor: "pointer",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Box
                            display="flex"
                            justifyContent="start"
                            alignItems="center"
                            gap="3px"
                            sx={{
                              cursor: "pointer",
                              paddingInline: "5px",
                              transition: "all 0.3s ease-in-out",
                              color: "#444444",
                            }}
                          >
                            <ServiceIcon size={16} color={"#311b92"} />
                            {cell.serviceName.map((item, index) => (
                              <Tooltip
                                key={index}
                                title={`ServiceId: ${item}`}
                                placement="top"
                                arrow
                              >
                                <Typography
                                  variant="subtitle2"
                                  fontSize="12px"
                                  sx={{
                                    ":hover": {
                                      color: "#311b92",
                                    },
                                  }}
                                  onClick={() => {
                                    navigate(`/service/${item}`);
                                  }}
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
                            mode={ItemMode.Small}
                            hash={cell.workPackageHash}
                            report={null}
                            timestamp={0}
                          />
                        </Box>
                      ) : (
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
