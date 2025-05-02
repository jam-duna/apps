import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { Autorenew, RawOn } from "@mui/icons-material";
import { AccumulateIcon, AuthorIcon, AvailabilityIcon, BlockIcon, CoreIcon, DisputeIcon, EntropyIcon, EntropySourceIcon, EpochIcon, PreimageIcon, RefineIcon, SealIcon, SegmentIcon, ServiceIcon, SlotIcon, StatisticsIcon, ValidatorIcon, WorkPackageIcon, WorkReportIcon, WorkResultsIcon } from "../Icons/index.js";

interface LabeledRowProps {
  label: string;
  tooltip: string;
  value: React.ReactNode;
  labelWidth?: number;
  mti?: string;
  mtl?: string;
  labelVariant?: TypographyProps["variant"];
  icon?: string;
}

export function LabeledRow({
  label,
  tooltip,
  value,
  labelWidth = 200,
  labelVariant = "body1",
  mti = "0px",
  mtl = "4px",
  icon = "info",
}: LabeledRowProps) {
  return (
    <Box sx={{ display: "flex", marginBlock: "10px" }}>
      {/* Fixed-width label + tooltip */}
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          minWidth: labelWidth,
          maxWidth: labelWidth,
          flexShrink: 0,
        }}
      >
        <Tooltip title={tooltip}>
          <IconButton size="small" sx={{ mr: 1, mt:mti }}>
            {icon === "info" && <InfoOutlinedIcon fontSize="small" />}
            {icon === "raw" && <RawOn fontSize="small"/>}
            {icon === "status" && <Autorenew fontSize="small"/>}
            {icon === "core" && <CoreIcon size={18} color="#555"/>}
            {icon === "slot" && <SlotIcon size={18} color="#555"/>}
            {icon === "service" && <ServiceIcon size={18} color={'#555'}/>}
            {icon === "workpackage" && <WorkPackageIcon size={18} color={'#555'}/>}
            {icon === "preimage" && <PreimageIcon size={18} color={'#555'}/>}
            {icon === "segment" && <SegmentIcon size={18} color={'#555'}/>}
            {icon === "availability" && <AvailabilityIcon size={18} color={'#555'}/>}
            {icon === "refine" && <RefineIcon size={18} color={'#555'}/>}
            {icon === "work_results" && <WorkResultsIcon size={18} color={'#555'}/>}
            {icon === "work_report" && <WorkReportIcon size={18} color={'#555'}/>}
            {icon === "author" && <AuthorIcon size={18} color={'#555'}/>}
            {icon === "Seal:" && <SealIcon size={18} color={'#555'}/>}
            {icon === "Entropy Source:" && <EntropySourceIcon size={18} color={'#555'}/>}
            {icon === "Parent:" && <InfoOutlinedIcon fontSize="small" />}
            {icon === "Parent State Root:" && <InfoOutlinedIcon fontSize="small" />}
            {icon === "Authorizations Pool (C1)" && <AuthorIcon size={18} color={'#555'}/>}
            {icon === "Recent Blocks (C3)" && <BlockIcon size={18} color={'#555'}/>}
            {icon === "Privileged Service Indices (C12)" && <ServiceIcon size={18} color={'#555'}/>}
            {icon === "Entropy (C6)" && <EntropyIcon size={18} color={'#555'}/>}
            {icon === "Validator Statistics (C13)" && <StatisticsIcon size={18} color={'#555'}/>}
            {icon === "Disputes State (C5)" && <DisputeIcon size={18} color={'#555'}/>}
            {icon === "Availability Assignments (C10)" && <AvailabilityIcon size={18} color={'#555'}/>}
            {icon === "Current Epoch (C11)" && <EpochIcon size={18} color={'#555'}/>}
            {icon === "Accumulation Queue (C14)" && <AccumulateIcon size={18} color={'#555'}/>}
            {icon === "Authorization Queue (C2)" && <AuthorIcon size={18} color={'#555'}/>}
            {icon === "Accumulation History (C15)" && <AccumulateIcon size={18} color={'#555'}/>}
            {icon === "Accounts" && <InfoOutlinedIcon fontSize="small" />}
            {icon === "Safrole State Gamma (C4)" && <InfoOutlinedIcon fontSize="small" />}
            {icon === "Iota Data (C7)" && <InfoOutlinedIcon fontSize="small" />}
            {icon === "Kappa Data (C8)" && <InfoOutlinedIcon fontSize="small" />}
            {icon === "Lambda Data (C9)" && <InfoOutlinedIcon fontSize="small" />}
            {icon === "validator" && <ValidatorIcon size={18} color={'#555'}/>}
            {icon === "block" && <BlockIcon size={18} color={'#555'}/>}
          </IconButton>
        </Tooltip>
        <Typography
          variant={labelVariant}
          sx={{
            whiteSpace: "nowrap", // keep the label on one line
            marginTop: mtl,
          }}
        >
          {label}
        </Typography>
      </Box>

      {/* Value area (wraps text) */}
      <Box
        sx={{
          flex: 1,
          ml: 1,
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          alignSelf: "center",
        }}
      >
        {value}
      </Box>
    </Box>
  );
}
