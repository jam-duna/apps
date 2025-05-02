"use client";

import { Link } from "react-router-dom";
import { Box, Container } from "@mui/material";
import SearchBar from "../home/SearchBar.js";

export default function Navbar() {
  return (
    <Box
      position="static"
      component="header"
      sx={{
        backgroundColor: "#F8F9FA",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "20px",
          paddingBlock: "10px",
        }}
      >
        <Link to="/">
          <Box
            component="img"
            src="https://graypaper.com/static/a21b59cd32bc41e89bb89db43380ced9/d4652/jam-pen-polkadot.webp"
            alt="JAM logo"
            width="100px"
            height="54px"
            sx={{
              cursor: "pointer",
              filter: "invert(100%)",
            }}
          />
        </Link>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="end"
          sx={{
            width: "640px",
            height: "54px",
            paddingInline: "25px",
          }}
        >
          <SearchBar />
        </Box>
      </Container>
    </Box>
  );
}
