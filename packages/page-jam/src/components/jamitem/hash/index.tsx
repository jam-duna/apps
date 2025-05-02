import React, { useState } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { Check, ContentCopy } from '@mui/icons-material';
import { fallbackCopyTextToClipboard } from '../../../utils/clipboard.js';

interface HashProps {
    hash: string;
}

export function Hash({ hash } : HashProps) {
  
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(hash);
      } else {
        fallbackCopyTextToClipboard(hash);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Box
    display="flex"
    justifyContent="start"
    alignItems="center"
    gap="2px"
    sx={{
      cursor: "pointer",
      color: "#444444",
    }}
    >
        <Tooltip title={`Hash: ${hash}`} placement='top' arrow>
            <Typography variant='subtitle2' fontSize="15px">
                {hash}
            </Typography>
        </Tooltip>

        <Tooltip title={copied ? "Copied!" : "Copy hash"} placement='top' arrow>
            <IconButton onClick={handleCopy}>
                {!copied ? 
                    <ContentCopy sx={{width: "12px", height: "12px", color: "#444444"}}/> :
                    <Check sx={{width: "12px", height: "12px", color: "#444444"}}/>
                }
            </IconButton>
        </Tooltip>
    </Box>
  )
}