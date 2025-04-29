"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LabeledRow } from "../display/LabeledRow.js";
import { moreDetailsMapping } from "../../utils/tooltipDetails.js";
import { DetailsIcon } from "../Icons/index.js";
import { Hash } from "../jamitem/index.js";

interface HeaderProps {
  parent: string;
  parent_state_root: string;
  seal: string;
  entropy_source: string;
}

interface MoreDetailsAccordionProps {
  header: HeaderProps;
}

export default function MoreDetailsAccordion({
  header,
}: MoreDetailsAccordionProps) {
  return (
    <Accordion sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" gap="5px" sx={{ px: 2 }} alignItems="center">
          <DetailsIcon size={16} color={"#555"}/>
          <Typography variant="body1" mt="2px">
            {"More Details"}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 3 }}>
        {Object.entries(moreDetailsMapping).map(([key, { label, tooltip }]) => (
          <LabeledRow
            key={key}
            label={label}
            tooltip={tooltip}
            icon={label}
            value={
              <Hash hash={header[key as keyof HeaderProps]}/>
            }
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
