// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Grid, FormControlLabel } from "@mui/material";
import { Block, DB_LIMIT, State } from "../../db/db.js";
import { DEFAULT_WS_URL } from "../../utils/helper.js";
import {
    filterActiveValidators,
    filterBlocks,
    filterCoreStatistics,
    filterStates,
    filterWorkPackages,
} from "../../utils/blockAnalyzer.js";
import { GridData, parseBlocksToGridData } from "../../utils/parseBlocksToGridData.js";
import { CoreStatsGrid } from "../../components/core/index.js";
import {
    ActiveValidators,
    Core,
    ItemMode,
    ListServices,
    RecentWorkPackages,
    ReportWithTime,
} from "../../components/jamitem/index.js";
import MainViewGrid from "../../components/home/MainViewGrid.js";
import { fetchListServices } from "../../hooks/useFetchListServices.js";
import { CoreStatistics, ServiceInfoDetail, ValidatorShowCase } from "../../types/index.js";
import { useWsRpcContext } from "../../contexts/WSRpcContext/index.js";
import { CustomToggle } from "../../components/display/CustomToggle.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import Loading from "../../components/home/Loading.js";

export default function CoreDetailPage() {
    const params = useParams();
    const coreIndex = params.coreIndex ?? "0";
    const coreIndexNumber = Number.parseInt(coreIndex);

    const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);
    const [filteredStates, setFilteredStates] = useState<State[]>([]);
    const [activeStates, setActiveStates] = useState<ReportWithTime[]>([]);
    const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);
    const [activeValidators, setActiveValidators] = useState<ValidatorShowCase[]>(
        []
    );
    const [gridData, setGridData] = useState<GridData>({
        data: {},
        timeslots: [],
        timestamps: [],
        cores: [],
        coreStatistics: {},
    });
    const [statistics, setStatistics] = useState<Record<
        number,
        CoreStatistics
    > | null>(null);

    const [isLoadingBlocks, setIsLoadingBlocks] = useState(true);
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingActiveStates, setIsLoadingActiveStates] = useState(true);
    const [isLoadingServices, setIsLoadingServices] = useState(true);
    const [isLoadingValidators, setIsLoadingValidators] = useState(true);
    const [isLoadingStatistics, setIsLoadingStatistics] = useState(true);
    const [isLoadingGridData, setIsLoadingGridData] = useState(true);

    const [showOnlyWorkPackages, setShowOnlyWorkPackages] = useState(true);

    const { currentBlock, currentState, currentStatistics } = useWsRpcContext();

    useEffect(() => {
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
            const states = await filterWorkPackages(coreIndexNumber);
            setActiveStates(states);
            setIsLoadingActiveStates(false);
        };
        const fetchListService = async () => {
            const services = await fetchListServices(getRpcUrlFromWs(DEFAULT_WS_URL));
            setServiceList(services);
            setIsLoadingServices(false);
        };
        const fetchActiveValidators = async () => {
            const validators = await filterActiveValidators(
                coreIndexNumber
            );
            setActiveValidators(validators);
            setIsLoadingValidators(false);
        };

        fetchBlocks();
        fetchStates();
        fetchActiveStates();
        fetchListService();
        fetchActiveValidators();
    }, [currentBlock, currentState]);

    useEffect(() => {
        const fetchCoreStatistics = async () => {
            const data = await filterCoreStatistics(
                coreIndexNumber,
                showOnlyWorkPackages
            );
            setStatistics(data);
            setIsLoadingStatistics(false);
        };
        fetchCoreStatistics();
    }, [currentStatistics, showOnlyWorkPackages]);

    useEffect(() => {
        const data = parseBlocksToGridData(filteredBlocks, filteredStates);
        data.cores = [coreIndexNumber];
        setGridData(data);
        setIsLoadingGridData(false);
    }, [filteredBlocks]);

    const isAllLoaded = !(
        isLoadingBlocks ||
        isLoadingStates ||
        isLoadingActiveStates ||
        isLoadingServices ||
        isLoadingValidators ||
        isLoadingStatistics ||
        isLoadingGridData
    );

    if (!isAllLoaded) return <Loading />;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
            <Box sx={{ display: "inline-flex", alignItems: "center", mb: 5 }}>
                <Core mode={ItemMode.Large} index={coreIndexNumber} />
            </Box>

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
                    cores={[coreIndexNumber]}
                    data={gridData.data}
                    showActive={showOnlyWorkPackages}
                    services={serviceList}
                    serviceId={-1}
                />
            </Box>

            {gridData.timeslots.length > 0 && statistics && (
                <CoreStatsGrid stats={statistics} />
            )}

            <Grid marginTop="20px" container spacing={2}>
                <Grid size={6}>
                    <RecentWorkPackages reports={activeStates} services={serviceList} />
                </Grid>
                <Grid size={6}>
                    <Grid container spacing={4}>
                        <Grid size={12}>
                            <ListServices
                                services={serviceList}
                                core={coreIndexNumber}
                                reports={activeStates}
                            />
                        </Grid>
                        <Grid size={12}>
                            <ActiveValidators validators={activeValidators} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
