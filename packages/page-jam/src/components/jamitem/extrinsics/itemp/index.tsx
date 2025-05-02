import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import { ExtrinsicsProps } from '../index.js';

export function ExtrP(param : ExtrinsicsProps) {

  return (
    <Tooltip title="Extrinsics Preimages" placement='top' arrow>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          cursor: "pointer",
          paddingInline: "5px",
          transition: "all 0.3s ease-in-out",
          color: "#ffffff",
          backgroundColor: "#311b92",
          borderRadius: "4px",
          ":hover": {
            backgroundColor: "#311b92c0",
          }
        }}
      >
        <Typography variant="body2" fontWeight="bold" fontSize="12px" paddingTop="2px">
            P-{param.count}
        </Typography>
      </Box>
    </Tooltip>
  )
}
