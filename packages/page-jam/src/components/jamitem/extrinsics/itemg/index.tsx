import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import { ExtrinsicsProps } from '../index.js';

export function ExtrG(param : ExtrinsicsProps) {

  return (
    <Tooltip title="Extrinsics Guarantees" placement='top' arrow>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          cursor: "pointer",
          paddingInline: "5px",
          transition: "all 0.3s ease-in-out",
          color: "#ffffff",
          backgroundColor: "#1b5e20",
          borderRadius: "4px",
          ":hover": {
            backgroundColor: "#1b5e20d0",
          }
        }}
      >
        <Typography variant="body2" fontWeight="bold" fontSize="12px" paddingTop="2px">
          G-{param.count}
        </Typography>
      </Box>
    </Tooltip>
  )
}
