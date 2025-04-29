import React from "react";
import { Box, Typography, Link, Grid, Divider, Container } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: "#555",
        backgroundColor: "#F8F9FA",
        marginTop: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section */}
        <Box sx={{ px: 4, pb: 4, pt: 2 }}>
          <Grid container spacing={3}>
            {/* Community Section */}
            <Grid columns={{xs: 12, sm: 4}}>
              <Typography
                variant="h6"
                color="textSecondary"
                fontSize="16px"
                gutterBottom
              >
                COMMUNITY
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
                fontSize="14px"
              >
                <Link
                  href="https://x.com/colorfulnotion"
                  underline="hover"
                  color="primary"
                >
                  X
                </Link>
                <Link
                  href="https://github.com/jam-duna/jamtestnet"
                  underline="hover"
                  color="primary"
                >
                  Github
                </Link>
                <Link
                  href="https://discord.gg/ADWefR9m"
                  underline="hover"
                  color="primary"
                >
                  JAM DAO Discord
                </Link>
                <Link
                  href="https://t.me/colorfulnotion"
                  underline="hover"
                  color="primary"
                >
                  Telegram
                </Link>
                <Link
                  href="https://docs.jamcha.in/"
                  underline="hover"
                  color="primary"
                >
                  Docs
                </Link>
              </Box>
            </Grid>
            {/* Ecosystem Section */}
            <Grid columns={{xs: 12, sm: 4}}>
              <Typography
                variant="h6"
                color="textSecondary"
                fontSize="16px"
                gutterBottom
              >
                ECOSYSTEM
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
                fontSize="14px"
              >
                <Link href="#" underline="hover" color="primary">
                  Signer
                </Link>
                <Link href="#" underline="hover" color="primary">
                  Status
                </Link>
              </Box>
            </Grid>
            {/* Resources Section */}
            <Grid columns={{xs: 12, sm: 4}}>
              <Typography
                variant="h6"
                color="textSecondary"
                fontSize="16px"
                gutterBottom
              >
                RESOURCES
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
                fontSize="14px"
              >
                <Link href="#" underline="hover" color="primary">
                  Docs
                </Link>
                <Link href="#" underline="hover" color="primary">
                  Blog
                </Link>
                <Link href="#" underline="hover" color="primary">
                  Media Kit
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 2,
          }}
        >
          {/* Footer Info */}
          <Box>
            <Typography variant="body2" color="textSecondary" fontSize="14px">
              Jam Explorer UI
            </Typography>
            <Typography variant="body2" color="textSecondary" fontSize="14px">
              Trustless Supercomputing Explorer Designed by Developers &copy;
              2025
            </Typography>
          </Box>

          {/* Footer Links */}
          <Box mt="15px" fontSize="14px">
            <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
              Terms of Use
            </Link>
            <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
