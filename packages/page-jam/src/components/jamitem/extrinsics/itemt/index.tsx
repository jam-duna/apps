import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import { ExtrinsicsProps } from '../index.js';

export function ExtrT(param : ExtrinsicsProps) {

  return (
    <Tooltip title="Extrinsics Tickets" placement='top' arrow>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          cursor: "pointer",
          paddingInline: "5px",
          transition: "all 0.3s ease-in-out",
          color: "#ffffff",
          backgroundColor: "#808080",
          borderRadius: "4px",
          ":hover": {
            backgroundColor: "#808080c0",
          }
        }}
      >
        <Typography variant="body2" fontWeight="bold" fontSize="12px" paddingTop="2px">
          T-{param.count}
        </Typography>
      </Box>
    </Tooltip>
  )
}
