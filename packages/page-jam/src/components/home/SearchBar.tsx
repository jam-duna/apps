"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../../db/db.js";
import { fetchState } from "../../hooks/useFetchState.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";
import { BlockSearchIcon } from "../Icons/index.js";


export default function SearchBar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState<"hash" | "slot">("hash");
  const [openDialog, setOpenDialog] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = async () => {
    if (!searchValue) return;
    const rpcUrl = getRpcUrlFromWs(localStorage.getItem("jamUrl") || "dot-0.jamduna.org");

    // Check IndexedDB for a matching block by headerHash
    try {
      let foundBlock;

      if (searchType === "hash")
        foundBlock = await db.blocks.get({ headerHash: searchValue });
      else if (searchType === "slot")
        foundBlock = await db.blocks
          .where("overview.slot")
          .equals(Number(searchValue))
          .first();

      if (foundBlock) {
        navigate(`/jam/block/${searchValue}?type=${searchType}`);
        return;
      }
      navigate(`/jam/block/${searchValue}?type=${searchType}`);
    } catch (error) {
      console.log("Error searching IndexedDB:", error);
    }

    // Show loading modal while fetching block data
    setIsFetching(true);
    try {
      if (searchType === "hash") {
        // Optionally fetch state data if needed
        try {
          await fetchState(searchValue, rpcUrl);
        } catch (stateError) {
          console.error("Error fetching state data:", stateError);
        }
      }
      navigate(`/jam/block/${searchValue}?type=${searchType}`);
    } catch (error) {
      console.error("Error fetching block data:", error);
      setOpenDialog(true);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Regex to match numbers or hex hashes (with optional '0x' prefix)
    const isHex = /^(0x)?[0-9a-fA-F]*$/.test(newValue);
    const isNumber = /^[0-9]*$/.test(newValue);

    if (isHex || newValue === '') {
      setSearchValue(newValue);
      setSearchType(isNumber ? 'slot' : 'hash');
      //console.log(isNumber ? 'slot' : 'hash');
    } else {
      //console.log("Invalid input");
    }
  };

  return (
    <Box display="flex" width="100%">
      <TextField
        label="Query Block"
        size="small"
        fullWidth
        variant="outlined"
        placeholder="Enter slot index or header hash"
        value={searchValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        InputProps={{
          sx: {
            fontSize: '14px',              // input text size
            '::placeholder': {
              fontSize: '14px',            // placeholder text size
              opacity: 1,                  // ensure it's visible
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} sx={{height: "32px"}}>
                <Box marginTop="-10px">
                  <BlockSearchIcon size={16} color={"#444"} />
                </Box>
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          sx: {
            fontSize: '14px',              // label size
          },
        }}
      />

      {/* Dialog for error handling */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Invalid Input</DialogTitle>
        <DialogContent>
          <Typography>
            The input you entered did not return valid block data.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Loading Modal */}
      <Dialog open={isFetching}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Fetching data, please wait...</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
