import React from "react";
import { ItemMode } from "../index.js";
import { Box, Tooltip, Typography } from "@mui/material";
import { formatDate } from "../../../utils/helper.js";
import { SlotIcon } from "../../Icons/index.js";
import {Link} from "react-router-dom";

interface SlotProps {
  mode: ItemMode;
  slot: number;
  timestamp: number;
  showmode: string;
}

export function Slot(param: SlotProps) {

  return (
    <Tooltip title={`Slot index : ${param.slot}`} placement="top" arrow>
      <Link to={`/jam/block/${param.slot}`}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="5px"
          sx={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            paddingInline: "10px",
            transition: "all 0.3s ease-in-out",
            color: "#ffffff",
            backgroundColor: "#90caf9",
            ":hover": {
              backgroundColor: "#64b5f6",
            },
          }}
        >
          <SlotIcon size={16} color={"#fff"} />
          <Typography variant="subtitle2" paddingTop="2px">
            {formatDate(param.timestamp, param.showmode)}
          </Typography>
        </Box>
      </Link>
    </Tooltip>
  );
}
