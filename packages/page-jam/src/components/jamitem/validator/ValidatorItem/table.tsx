import { LabeledRow } from "../../../display/LabeledRow.js";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { Hash } from "../../hash/index.js";
import { KeyedItem } from "../../../../types/index.js";
import { truncateHash } from "../../../../utils/helper.js";
import {Link} from "react-router-dom";

interface Props {
  validator: KeyedItem;
  title: string;
  badge: string;
  hash: string;
}

export function ValidatorTable({ validator, title, badge, hash }: Props) {

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Only set default expanded state on initial render
    setExpanded(badge === "");
  }, [badge]);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Accordion
      expanded={expanded}
      sx={{
        px: 2,
        py: 1,
        my: 1,
        boxShadow: "none",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
      onChange={handleChange}
    >
      <AccordionSummary
        sx={{
          px: 0,
          py: 0,
          minHeight: "auto",
          "& .MuiAccordionSummary-content": { m: 0, p: 0 },
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          gap="10px"
        >
          <Typography variant="h6" fontWeight={"bold"}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            fontSize="12px"
            sx={{
              px: "4px",
              py: "0px",
              backgroundColor: "#888",
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            {badge}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <LabeledRow
          label="Bandersnatch:"
          tooltip="Bandersnatch"
          value={
            <Link
              to={
                hash === "latest"
                  ? `/validator/key/${validator.bandersnatch}`
                  : `/validator/key/${validator.bandersnatch}/${hash}`
              }
            >
              <Hash hash={validator.bandersnatch} />
            </Link>
          }
        />
        <LabeledRow
          label="Ed25519:"
          tooltip="Ed25519"
          value={
            <Link
              to={
                hash === "latest"
                  ? `/validator/key/${validator.ed25519}`
                  : `/validator/key/${validator.ed25519}/${hash}`
              }
            >
              <Hash hash={validator.ed25519} />
            </Link>
          }
        />
        <LabeledRow
          label="Bls:"
          tooltip="Bls"
          value={
            <Link
              to={
                hash === "latest"
                  ? `/validator/key/${validator.bls}`
                  : `/validator/key/${validator.bls}/${hash}`
              }
            >
              <Hash hash={validator.bls} />
            </Link>
          }
        />
        <LabeledRow
          label="Metadata:"
          tooltip="Metadata"
          value={
            truncateHash(validator.metadata, "long") !== "0x000000...000000" ? (
              <Hash hash={validator.metadata} />
            ) : (
              "-"
            )
          }
        />
      </AccordionDetails>
    </Accordion>
  );
}
