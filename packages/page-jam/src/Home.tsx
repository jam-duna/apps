// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  FormControlLabel,
  Typography,
} from "@mui/material";
import LatestBlocks from "./components/home/lists/latest-list/LatestBlocks.js";
import { Block, State, DB_LIMIT } from "./db/db.js";
import MainViewGrid from "./components/home/MainViewGrid.js";
import { CustomToggle } from "./components/display/CustomToggle.js";
import { GridData, parseBlocksToGridData } from "./utils/parseBlocksToGridData.js";
import {
  fetchAggregateCoreStatistics,
  fetchAggregateServiceStatistics,
  filterBlocks,
  filterStates,
  filterWorkPackages,
} from "./utils/blockAnalyzer.js";
import {
  ListServices,
  RecentWorkPackages,
  ReportWithTime,
} from "./components/jamitem/index.js";
import { fetchListServices } from "./hooks/useFetchListServices.js";
import { CoreStatistics, ServiceInfoDetail, ServiceStatistics } from "./types/index.js";
import { useWsRpcContext } from "./contexts/WSRpcContext/index.js"
import { CoreStatsGrid } from "./components/core/index.js";
import { ServiceStatsGrid } from "./components/service/index.js";
 import { HomeIcon } from "./components/Icons/index.js";
import { getRpcUrlFromWs } from "./utils/ws.js";
import Loading from "./components/home/Loading.js";


function Home () {
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [workPackages, setWorkPackages] = useState<ReportWithTime[]>([]);
  const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);
  const [gridData, setGridData] = useState<GridData>({
    data: {},
    timeslots: [],
    timestamps: [],
    cores: [],
    coreStatistics: {},
  });
  const [showOnlyWorkPackages, setShowOnlyWorkPackages] = useState(true);
  const [coreStatistics, setCoreStatistics] = useState<Record<
    number,
    CoreStatistics
  > | null>(null);
  const [serviceStatistics, setServiceStatistics] = useState<
    { time: number; stat: ServiceStatistics }[]
  >([]);
  const [showStatistics, setShowStatistics] = useState(false);

  const [isGridLoaded, setIsGridLoaded] = useState<boolean>(false);
  const [isBlocksLoaded, setIsBlocksLoaded] = useState(false);
  const [isStatesLoaded, setIsStatesLoaded] = useState(false);
  const [isWorkPackagesLoaded, setIsWorkPackagesLoaded] = useState(false);
  const [isServicesLoaded, setIsServicesLoaded] = useState(false);
  const [isStatsLoaded, setIsStatsLoaded] = useState(false);

  const { currentBlock, currentState, currentStatistics, now } = useWsRpcContext();

  useEffect(() => {
    const fetchBlocks = async () => {
      const blocks = await filterBlocks(DB_LIMIT);
      setFilteredBlocks(blocks);
      setIsBlocksLoaded(true);
    };

    const fetchStates = async () => {
      const states = await filterStates(DB_LIMIT);
      setFilteredStates(states);
      setIsStatesLoaded(true);
    };

    const fetchWorkPackages = async () => {
      const reports = await filterWorkPackages();
      setWorkPackages(reports);
      setIsWorkPackagesLoaded(true);
    };

    const fetchListService = async () => {
      const services = await fetchListServices(getRpcUrlFromWs(localStorage.getItem("jamUrl") || "dot-0.jamduna.org"));
      setServiceList(services);
      setIsServicesLoaded(true);
    };

    fetchBlocks();
    fetchStates();
    fetchWorkPackages();
    fetchListService();
  }, [currentBlock, currentState, now]);

  useEffect(() => {
    const fetchAggregateStatistics = async () => {
      const core = await fetchAggregateCoreStatistics(showOnlyWorkPackages);
      const service = await fetchAggregateServiceStatistics(
        showOnlyWorkPackages
      );
      setCoreStatistics(core);
      setServiceStatistics(service);
      setIsStatsLoaded(true);
    };
    fetchAggregateStatistics();
  }, [currentStatistics, showOnlyWorkPackages]);

  useEffect(() => {
    const data = parseBlocksToGridData(filteredBlocks, filteredStates);
    setGridData(data);
    setIsGridLoaded(true);
  }, [filteredBlocks]);

  const isLoaded = () => {
    return (
      isGridLoaded &&
      isBlocksLoaded &&
      isStatesLoaded &&
      isWorkPackagesLoaded &&
      isServicesLoaded &&
      isStatsLoaded
    );
  };

  if (!isLoaded()) return <Loading />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
      {/* header display */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          mb: 3,
          ml: 1,
          gap: "10px",
        }}
      >
        <HomeIcon size={24} color={"#444"} />
        <Typography
          variant="subtitle2"
          fontSize="28px"
          color="#444"
          fontWeight={"bold"}
        >
          Home
        </Typography>
      </Box>

      {/* grid display */}
      <Box display={"flex"} flexDirection={"column"} alignItems={"end"} gap={1}>
        <FormControlLabel
          control={
            <CustomToggle
              checked={showOnlyWorkPackages}
              onChange={() => setShowOnlyWorkPackages((prev) => !prev)}
            />
          }
          label={showOnlyWorkPackages ? "Active" : "All"}
          labelPlacement="start"
          sx={{ paddingInline: "10px" }}
        />
        <MainViewGrid
          timeslots={gridData.timeslots}
          timestamps={gridData.timestamps}
          cores={gridData.cores}
          data={gridData.data}
          showActive={showOnlyWorkPackages}
          serviceId={-1}
          services={serviceList}
        />
      </Box>

      {/* stats graph display */}
      <Box display={"flex"} flexDirection={"column"} alignItems={"end"} gap={1}>
        <FormControlLabel
          control={
            <CustomToggle
              checked={showStatistics}
              onChange={() => setShowStatistics((prev) => !prev)}
            />
          }
          label={showStatistics ? "SERVICE" : "CORE"}
          labelPlacement="start"
          sx={{ paddingInline: "10px" }}
        />

        {showStatistics === false ? (
          coreStatistics && Object.entries(coreStatistics).length !== 0 ? (
            <CoreStatsGrid stats={coreStatistics} />
          ) : (
            <Typography
              variant="h6"
              fontSize="16px"
              textAlign="center"
              color="#444444"
              width="100%"
            >
              Loading core statistics...
            </Typography>
          )
        ) : serviceStatistics.length > 0 ? (
          <ServiceStatsGrid stats={serviceStatistics.slice(0, 8)} />
        ) : (
          <Typography
            variant="h6"
            fontSize="16px"
            textAlign="center"
            color="#444444"
            width="100%"
          >
            Loading service statistics...
          </Typography>
        )}
      </Box>

      {/* list display */}
      <Grid marginTop="20px" container spacing={2}>
        <Grid size={6}>
          <LatestBlocks latestBlocks={filteredBlocks.slice(0, 12)} />
        </Grid>
        <Grid size={6}>
          <Grid container spacing={4}>
            <Grid size={12}>
              <RecentWorkPackages
                reports={workPackages}
                services={serviceList}
              />
            </Grid>
            <Grid size={12}>
              <ListServices services={serviceList} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default React.memo(Home);
