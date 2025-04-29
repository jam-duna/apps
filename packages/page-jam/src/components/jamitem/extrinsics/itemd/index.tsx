import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import { ExtrinsicsProps } from '../index.js';

export function ExtrD(param : ExtrinsicsProps) {

  return (
    <Tooltip title="Extrinsics Disputes" placement='top' arrow>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          cursor: "pointer",
          paddingInline: "5px",
          transition: "all 0.3s ease-in-out",
          color: "#ffffff",
          backgroundColor: "#ff1744",
          borderRadius: "4px",
          ":hover": {
            backgroundColor: "#ff1744c0",
          }
        }}
      >
        <Typography variant="body2" fontWeight="bold" fontSize="12px" paddingTop="2px">
          D-{param.count}
        </Typography>
      </Box>
    </Tooltip>
  )
}
