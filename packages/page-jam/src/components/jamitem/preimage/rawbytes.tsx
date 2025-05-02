import React, { useState } from 'react'
import { Box, IconButton, TextareaAutosize, Tooltip } from '@mui/material'
import { Check, ContentCopy } from '@mui/icons-material';
import { fallbackCopyTextToClipboard } from '../../../utils/clipboard.js';

interface PreimageRawbytesProps {
    rawbytes: string,
}

export function PreimageRawbytes({rawbytes} : PreimageRawbytesProps) {
  
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation if used inside <Link>
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(rawbytes);
      } else {
        fallbackCopyTextToClipboard(rawbytes);
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
        paddingInline: "5px",
        color: "#444444",
        marginTop: "3px",
      }}
    >
      <TextareaAutosize 
        value={rawbytes}
        color="neutral"
        minRows={20}
        maxRows={20}
        style={{flexGrow: 1}}
        readOnly
      />
      <Tooltip title={copied ? "Copied!" : "Copy preimage rawbytes"} placement='top' arrow>
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