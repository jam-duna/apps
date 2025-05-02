// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchValidatorStatistics,
  filterBlocksFromAuthor,
  filterWorkPackagesFromValidator,
  getValidator,
  ValidatorResult,
  ValidatorStatistics,
} from "../../utils/blockAnalyzer.js";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ValidatorIcon } from "../../components/Icons/index.js";
import { ValidatorTable } from "../../components/jamitem/validator/ValidatorItem/table.js";
import { KeyedItem, ServiceInfoDetail } from "../../types/index.js";
import { useWsRpcContext } from "../../contexts/WSRpcContext/index.js";
import { Block } from "../../db/db.js";
import { ValidatorStatisticsTable } from "../../components/jamitem/validator/ValidatorItem/statistics.js";
import { RecentWorkPackages, ReportWithTime } from "../../components/jamitem/index.js";
import { fetchListServices } from "../../hooks/useFetchListServices.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import LatestBlocks from "../../components/home/lists/latest-list/LatestBlocks.js";
import Loading from "../../components/home/Loading.js";

export default function ValidatorIndexDetailPage() {
  const {index, hash} = useParams();

  const [validator, setValidator] = useState<ValidatorResult | null>(null);
  const [statistics, setStatistics] = useState<ValidatorStatistics | null>(
    null
  );
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);
  const [activeStates, setActiveStates] = useState<ReportWithTime[]>([]);
  const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);

  const [loadingValidator, setLoadingValidator] = useState(true);
  const [loadingStatistics, setLoadingStatistics] = useState(true);
  const [loadingBlocks, setLoadingBlocks] = useState(true);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const isLoading = () =>
    loadingValidator ||
    loadingStatistics ||
    loadingBlocks ||
    loadingStates ||
    loadingServices;

  const { currentBlock, currentState } = useWsRpcContext();

  const isValidatorSame = (key1: KeyedItem, key2: KeyedItem) => {
    if (key1.bandersnatch !== key2.bandersnatch) return false;
    if (key1.ed25519 !== key2.ed25519) return false;
    if (key1.bls !== key2.bls) return false;
    if (key1.metadata !== key2.metadata) return false;
    return true;
  };

  useEffect(() => {
    const fetchValidator = async () => {
      try {
        const data = await getValidator(Number(index), hash || "latest");
        setValidator(data);
      } catch (err) {
        console.error("Error loading validator:", err);
      }
      setLoadingValidator(false);
    };

    const fetchStatistics = async () => {
      try {
        const stat = await fetchValidatorStatistics(Number(index), hash || "latest");
        setStatistics(stat);
      } catch (err) {
        console.error("Error loading statistics:", err);
      }
      setLoadingStatistics(false);
    };

    fetchValidator();
    fetchStatistics();
  }, [index, hash]);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const blocks = await filterBlocksFromAuthor(Number(index));
        setFilteredBlocks(blocks);
      } catch (err) {
        console.error("Error loading blocks:", err);
      }
      setLoadingBlocks(false);
    };

    const fetchStates = async () => {
      try {
        const states = await filterWorkPackagesFromValidator(Number(index));
        setActiveStates(states);
      } catch (err) {
        console.error("Error loading work packages:", err);
      }
      setLoadingStates(false);
    };

    const fetchService = async () => {
      try {
        const services = await fetchListServices(getRpcUrlFromWs(localStorage.getItem("jamUrl") || "dot-0.jamduna.org"));
        setServiceList(services);
      } catch (err) {
        console.error("Error loading services:", err);
      }
      setLoadingServices(false);
    };

    fetchBlocks();
    fetchStates();
    fetchService();
  }, [currentBlock, currentState]);

  if (isLoading()) return <Loading />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          mb: 3,
          gap: "10px",
        }}
      >
        <ValidatorIcon size={24} color={"#444"} />
        <Typography variant="subtitle2" fontSize="28px" color="#444">
          Validator {index}
        </Typography>
      </Box>

      {validator !== null && (
        <>
          <ValidatorTable
            validator={validator.current}
            hash={hash || "latest"}
            title={"Current Value"}
            badge=""
          />
          <ValidatorTable
            validator={validator.previous}
            hash={hash || "latest"}
            title={"Previous Value"}
            badge={
              isValidatorSame(validator.current, validator.previous)
                ? "same"
                : ""
            }
          />
          <ValidatorTable
            validator={validator.next}
            hash={hash || "latest"}
            title={"Next Value"}
            badge={
              isValidatorSame(validator.current, validator.next) ? "same" : ""
            }
          />
          <ValidatorTable
            validator={validator.staging}
            hash={hash || "latest"}
            title={"Staging Value"}
            badge={
              isValidatorSame(validator.current, validator.staging)
                ? "same"
                : ""
            }
          />
        </>
      )}
      {validator === null && <Box>
          No matching validator with {hash === undefined ? "latest block" : `hash ${hash}`}
        </Box>}

      {statistics !== null && (
        <ValidatorStatisticsTable
          title={"Statistics"}
          current={statistics.current}
          last={statistics.last}
        />
      )}

      <Grid sx={{ my: 5 }} container spacing={4}>
        <Grid size={6}>
          <RecentWorkPackages reports={activeStates} services={serviceList} />
        </Grid>
        <Grid size={6}>
          <LatestBlocks latestBlocks={filteredBlocks.slice(0, 12)} />
        </Grid>
      </Grid>
    </Container>
  );
}
