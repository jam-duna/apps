import { Container, Typography } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="body2"
        fontSize="16px"
        width="100%"
        textAlign="center"
        fontWeight="bold"
        color="#444"
        paddingTop={10}
      >
        Loading ...
      </Typography>
    </Container>
  );
}
