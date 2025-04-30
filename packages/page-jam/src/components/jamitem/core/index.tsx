import React from "react";
import { ItemMode } from "../index.js";
import { Box, Tooltip, Typography } from "@mui/material";
import { CoreIcon } from "../../Icons/index.js";
import {Link} from "react-router-dom";

interface CoreProps {
  mode: ItemMode;
  index: number;
}

export function Core(param: CoreProps) {
  const smallRender = (
    <Tooltip title={`Core index : ${param.index}`} placement="top" arrow>
      <Link to={`/jam/core/${param.index}`} style={{ textDecoration: 'none' }}>
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
            backgroundColor: "#e91e63a0",
            color: "#ffffff",
            ":hover": {
              backgroundColor: "#e91e6380",
            },
          }}
        >
          <CoreIcon size={20} color="#fff" />
          <Typography variant="subtitle2" fontSize={"13px"} fontWeight={"bold"}>
            Core {param.index}
          </Typography>
        </Box>
      </Link>
    </Tooltip>
  );
  const mediumRender = (
    <Tooltip title={`Core index : ${param.index}`} placement="top" arrow>
      <Link to={`/jam/core/${param.index}`} style={{ textDecoration: 'none' }}>
        <Box
          display="flex"
          justifyContent="start"
          alignItems="center"
          gap={1}
          sx={{
            cursor: "pointer",
            width: "70px",
            paddingInline: "5px",
            transition: "all 0.3s ease-in-out",
            backgroundColor: "#ffffff",
            color: "#444444",
            ":hover": {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Typography variant="subtitle2" fontSize={"16px"}>
            Core {param.index}
          </Typography>
        </Box>
      </Link>
    </Tooltip>
  );
  const largeRender = (
    <Link to={`/jam/core/${param.index}`} style={{ textDecoration: 'none' }}>
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
          backgroundColor: "#0000",
          color: "#444444",
          ":hover": {
            backgroundColor: "#0000",
          },
        }}
      >
        <CoreIcon size={24} color="#555" />
        <Typography variant="subtitle2" fontSize={"32px"} fontWeight={"bold"}>
          Core {param.index}
        </Typography>
      </Box>
    </Link>
  );

  return (
    <>
      {param.mode === ItemMode.Small && smallRender}
      {param.mode === ItemMode.Medium && mediumRender}
      {param.mode === ItemMode.Large && largeRender}
    </>
  );
}
