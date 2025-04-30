// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Paper, Typography, Box } from "@mui/material";
import { LabeledRow } from "../../components/display/LabeledRow.js";
import { Hash } from "../../components/jamitem/index.js";
import Loading from "../../components/home/Loading.js";
import { fetchServiceValue } from "../../hooks/useFetchService.js";
import { fetchListServices } from "../../hooks/useFetchListServices.js";
import { useSubscribeServiceValue } from "../../hooks/subscribeServiceValue.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import { getTimeFromSlot } from "../../utils/blockAnalyzer.js";
import { bytesToHex, hexToBytes, ServiceStorageKey } from "../../utils/blake2.js";
import { DEFAULT_WS_URL, getRelativeTime } from "../../utils/helper.js";
import { ServiceInfoDetail, ServiceValue } from "../../types/index.js";

export default function ServiceValueDetailPage() {
  const params = useParams();

  const serviceId = params.service as string;
  const key = params.key as string;
  const headerhash = params.headerhash as string;

  const [serviceValue, setServiceValue] = useState<ServiceValue | null>(null);
  const [serviceList, setServiceList] = useState<ServiceInfoDetail[]>([]);
  const [lastTime, setLastTime] = useState<string>("0 secs");

  const [vloading, setVLoading] = useState<boolean>(true);
  const [lloading, setLLoading] = useState<boolean>(true);

  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        const hash =
          "0x" +
          bytesToHex(
            ServiceStorageKey(Number.parseInt(serviceId), hexToBytes(key))
          );
        const value = await fetchServiceValue(
          serviceId,
          hash,
          getRpcUrlFromWs(DEFAULT_WS_URL)
        );
        let data = serviceValue;
        if (data === null) {
          data = {
            serviceID: Number.parseInt(serviceId),
            key: key,
            hash: hash,
            headerHash: headerhash,
            value: value,
            slot: 0,
          };
        } else {
          data.value = value;
        }
        setServiceValue(data);
        setVLoading(false);
      };
      const fetchListService = async () => {
        const services = await fetchListServices(getRpcUrlFromWs(DEFAULT_WS_URL));
        setServiceList(services);
        setLLoading(false);
      };

      fetchService();
      fetchListService();
    }
  }, [serviceId, key, headerhash]);

  useEffect(() => {
    if (serviceValue !== null && serviceValue.slot !== 0) {
      const fetchTimeFromSlot = async () => {
        const time = await getTimeFromSlot(serviceValue.slot);
        setLastTime(getRelativeTime(time));
      };
      setTimeout(fetchTimeFromSlot, 10000);
    }
  }, [serviceValue]);

  useSubscribeServiceValue({
    endpoint: DEFAULT_WS_URL,
    serviceID: serviceId,
    setStatus: (status: ServiceValue) => {
      if (status.key === key) setServiceValue(status);
    },
  });

  const getServiceMetadata = (id: number) => {
    const service = serviceList.find((item) => item.service === id);
    return service?.metadata || "-";
  };

  if (vloading || lloading) return <Loading />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="hasOwnMaxWidth">
      <Box sx={{ display: "inline-flex", alignItems: "center", mb: 3 }}>
        <Typography variant="subtitle2" fontSize="28px" color="#444">
          Service Value
        </Typography>
      </Box>
      {!serviceValue ? (
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
        <Paper variant="outlined" sx={{ p: 2, marginBlock: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <LabeledRow
              label="Service ID:"
              tooltip="Service ID"
              icon="service"
              value={
                <Link
                  to={`/jam/service/${serviceValue.serviceID}`}
                >
                  <Hash
                    hash={
                      serviceValue.serviceID.toString() +
                      " / " +
                      getServiceMetadata(serviceValue.serviceID)
                    }
                  />
                </Link>
              }
            />
            <LabeledRow
              label="Storage Key:"
              tooltip="Storage Key"
              value={<Hash hash={serviceValue.hash} />}
            />
            <LabeledRow
              label="Key:"
              tooltip="Key"
              value={<Hash hash={serviceValue.key} />}
            />
            <LabeledRow
              label="Current Value:"
              tooltip="Current value"
              value={<Hash hash={serviceValue.value} />}
            />
            <LabeledRow
              label="Last Updated:"
              tooltip="Last Updated"
              icon="slot"
              value={
                <Link
                  to={`/jam/block/${serviceValue.slot}`}
                >
                  {lastTime} ago
                </Link>
              }
            />
            <LabeledRow
              label="Header hash:"
              tooltip="Header hash"
              icon="block"
              value={
                <Link
                  to={`/jam/block/${serviceValue.headerHash}`}
                >
                  <Hash hash={serviceValue.headerHash} />
                </Link>
              }
            />
          </Box>
        </Paper>
      )}
    </Container>
  );
}
