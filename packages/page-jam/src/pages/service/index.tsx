// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  FormControlLabel,
} from "@mui/material";
import { fetchServiceInfo } from "../../hooks/useFetchService.js";
import { fetchListServices } from "../../hooks/useFetchListServices.js";
import { useSubscribeServiceInfo } from "../../hooks/subscribeServiceInfo.js";
import { useSubscribeServiceValue } from "../../hooks/subscribeServiceValue.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import { DEFAULT_WS_URL } from "../../utils/helper.js";
import { GridData, parseBlocksToGridData } from "../../utils/parseBlocksToGridData.js";
import {
  fetchServiceStatisticsFromId,
  filterBlocks,
  filterPreimagesFromService,
  filterStates,
  filterWorkPackagesFromService,
  PreimageProps,
} from "../../utils/blockAnalyzer.js";
import {
  RecentPreimages,
  ServiceInfoTable,
  ServiceStatsGrid,
  ServiceValueTable,
} from "../../components/service/index.js";
import {
  ItemMode,
  RecentWorkPackages,
  ReportWithTime,
  Service,
} from "../../components/jamitem/index.js";
import MainViewGrid from "../../components/home/MainViewGrid.js";
import { CustomToggle } from "../../components/display/CustomToggle.js";
import Loading from "../../components/home/Loading.js";
import {
  ServiceInfo,
  ServiceInfoDetail,
  ServiceStatistics,
  ServiceValue,
} from "../../types/index.js";
import { Block, DB_LIMIT, State } from "../../db/db.js";
import { useWsRpcContext } from "../../contexts/WSRpcContext/index.js";

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  const serviceIdNumber = Number.parseInt(serviceId);

  const [serviceInfo, setServiceInfo] = useState<ServiceInfo | null>(null);
  const [serviceValue, setServiceValue] = useState<ServiceValue[]>([]);
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [activeStates, setActiveStates] = useState<ReportWithTime[]>([]);
  const [recentPreimages, setRecentPreimages] = useState<PreimageProps[]>([]);
  const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);
  const [serviceStatistics, setServiceStatistics] = useState<
    { time: number; stat: ServiceStatistics }[]
  >([]);
  const [gridData, setGridData] = useState<GridData>({
    data: {},
    timeslots: [],
    timestamps: [],
    cores: [],
    coreStatistics: {},
  });

  const [isLoadingServiceInfo, setIsLoadingServiceInfo] = useState(true);
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(true);
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingActiveStates, setIsLoadingActiveStates] = useState(true);
  const [isLoadingPreimages, setIsLoadingPreimages] = useState(true);
  const [isLoadingServiceList, setIsLoadingServiceList] = useState(true);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(true);
  const [isLoadingGridData, setIsLoadingGridData] = useState(true);

  const isAllLoaded = !(
    isLoadingServiceInfo ||
    isLoadingBlocks ||
    isLoadingStates ||
    isLoadingActiveStates ||
    isLoadingPreimages ||
    isLoadingServiceList ||
    isLoadingStatistics ||
    isLoadingGridData
  );

  const [showOnlyWorkPackages, setShowOnlyWorkPackages] = useState(true);

  // ws context hook for fetching basic jam data (block, state, statistics)
  const { currentBlock, currentState, currentStatistics } = useWsRpcContext();

  // useffect hook for fetching and filtering basic jam data need in service page
  useEffect(() => {
    // filter from db
    const fetchBlocks = async () => {
      const blocks = await filterBlocks(DB_LIMIT);
      setFilteredBlocks(blocks);
      setIsLoadingBlocks(false);
    };
    const fetchStates = async () => {
      const states = await filterStates(DB_LIMIT);
      setFilteredStates(states);
      setIsLoadingStates(false);
    };
    const fetchActiveStates = async () => {
      const states = await filterWorkPackagesFromService(
        serviceIdNumber
      );
      setActiveStates(states);
      setIsLoadingActiveStates(false);
    };
    const fetchRecentPreimages = async () => {
      const preimages = await filterPreimagesFromService(
        serviceIdNumber
      );
      setRecentPreimages(preimages);
      setIsLoadingPreimages(false);
    };

    // fetch using rpc calls
    const fetchListService = async () => {
      const services = await fetchListServices(getRpcUrlFromWs(DEFAULT_WS_URL));
      setServiceList(services);
      setIsLoadingServiceList(false);
    };

    fetchBlocks();
    fetchStates();
    fetchActiveStates();
    fetchRecentPreimages();
    fetchListService();
  }, [currentBlock, currentState]);

  // useffect hook for fetching service statistics dynamically using subscribe functionality
  useEffect(() => {
    const fetchServiceStatistics = async () => {
      const data = await fetchServiceStatisticsFromId(
        serviceIdNumber,
        showOnlyWorkPackages
      );
      setServiceStatistics(data);
      setIsLoadingStatistics(false);
    };
    fetchServiceStatistics();
  }, [currentStatistics, showOnlyWorkPackages]);

  // useffect hook for filtering grid data from blocks on db
  useEffect(() => {
    const data = parseBlocksToGridData(filteredBlocks, filteredStates);
    setGridData(data);
    setIsLoadingGridData(false);
  }, [filteredBlocks]);

  // useffect hook for fetching service info and value
  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        const info = await fetchServiceInfo(
          serviceId,
          getRpcUrlFromWs(DEFAULT_WS_URL)
        );
        // const value = await fetchServiceValue(
        //   serviceId,
        //   "",
        //   getRpcUrlFromWs(DEFAULT_WS_URL)
        // ); //todo-
        setServiceInfo(info);
        setIsLoadingServiceInfo(false);
        // setServiceValue(value);
      };
      fetchService();
    }
  }, [serviceId]);

  // subscribe service info and value
  useSubscribeServiceInfo({
    endpoint: DEFAULT_WS_URL,
    serviceID: serviceId,
    setStatus: (status: ServiceInfo) => {
      setServiceInfo(status);
    },
  });
  useSubscribeServiceValue({
    endpoint: DEFAULT_WS_URL,
    serviceID: serviceId,
    setStatus: (status: ServiceValue) => {
      let data = serviceValue;
      const index = data.findIndex((item) => item.key === status.key);
      if (index === -1) {
        data.push(status); // insert
      } else {
        data[index] = status; // update
      }
      data = data.sort((a, b) => {
        return b.slot - a.slot;
      });
      setServiceValue(data);
    },
  });

  const getServiceMetadata = (id: number) => {
    const service = serviceList.find((item) => item.service === id);
    return service?.metadata || "-";
  };

  if (!isAllLoaded) return <Loading />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
      <Box sx={{ display: "inline-flex", alignItems: "center", mb: 2 }}>
        <Service mode={ItemMode.Large} name={serviceId} />
      </Box>

      {!serviceInfo ? (
        <Paper variant="outlined" sx={{ p: 3, marginBlock: 3 }}>
          <Typography
            variant="h6"
            fontSize="16px"
            textAlign="center"
            color="#444444"
          >
            Loading service info...
          </Typography>
        </Paper>
      ) : (
        <ServiceInfoTable
          serviceInfo={serviceInfo}
          metadata={getServiceMetadata(serviceInfo.service_index)}
        ></ServiceInfoTable>
      )}

      {serviceValue.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 3, marginBlock: 3 }}>
          <Typography
            variant="h6"
            fontSize="16px"
            textAlign="center"
            color="#444444"
          >
            Loading service value...
          </Typography>
        </Paper>
      ) : (
        <ServiceValueTable
          values={serviceValue}
          serviceId={serviceIdNumber}
        />
      )}

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
          services={serviceList}
          serviceId={serviceIdNumber}
        />
      </Box>

      {serviceStatistics.length > 0 ? (
        <ServiceStatsGrid stats={serviceStatistics.slice(0, 8)} />
      ) : (
        <Typography
          variant="h6"
          fontSize="16px"
          textAlign="center"
          color="#444444"
        >
          Loading service statistics...
        </Typography>
      )}

      <Grid sx={{ my: 5 }} container spacing={4}>
        <Grid size={6}>
          <RecentWorkPackages reports={activeStates} services={serviceList} />
        </Grid>
        <Grid size={6}>
          <RecentPreimages preimages={recentPreimages} />
        </Grid>
      </Grid>
    </Container>
  );
}
