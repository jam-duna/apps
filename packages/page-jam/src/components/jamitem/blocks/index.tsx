import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { BlockIcon } from "../../Icons/index.js";
import { Link } from "react-router-dom";

export function Blocks() {
  return (
    <Tooltip title="Link to all listed blocks" placement="top" arrow>
      <Link to="/list/block">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={0.5}
          sx={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            transition: "all 0.3s ease-in-out",
            color: "#444444",
            ":hover": {
              color: "#224444D0",
            },
          }}
        >
          <BlockIcon size={16} color={"#224444D0"} />
          <Typography variant="subtitle1" fontWeight="bold" marginTop="5px">
            Blocks
          </Typography>
        </Box>
      </Link>
    </Tooltip>
  );
}
