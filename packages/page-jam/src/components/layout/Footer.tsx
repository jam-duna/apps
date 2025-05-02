// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Box
      component='footer'
      sx={{
        color: '#555',
        backgroundColor: '#F8F9FA',
        marginTop: 8
      }}
    >
      <Container maxWidth='lg'>
        {/* Top Section */}
        <Box sx={{ px: 4, pb: 4, pt: 2 }}>
          <Grid
            container
            spacing={3}
          >
            {/* Community Section */}
            <Grid columns={{ xs: 12, sm: 4 }}>
              <Typography
                color='textSecondary'
                fontSize='16px'
                gutterBottom
                variant='h6'
              >
                COMMUNITY
              </Typography>
              <Box
                display='flex'
                flexDirection='column'
                fontSize='14px'
                gap='8px'
              >
                <Link
                  color='primary'
                  href='https://x.com/colorfulnotion'
                  underline='hover'
                >
                  X
                </Link>
                <Link
                  color='primary'
                  href='https://github.com/jam-duna/jamtestnet'
                  underline='hover'
                >
                  Github
                </Link>
                <Link
                  color='primary'
                  href='https://discord.gg/ADWefR9m'
                  underline='hover'
                >
                  JAM DAO Discord
                </Link>
                <Link
                  color='primary'
                  href='https://t.me/colorfulnotion'
                  underline='hover'
                >
                  Telegram
                </Link>
                <Link
                  color='primary'
                  href='https://docs.jamcha.in/'
                  underline='hover'
                >
                  Docs
                </Link>
              </Box>
            </Grid>
            {/* Ecosystem Section */}
            <Grid columns={{ xs: 12, sm: 4 }}>
              <Typography
                color='textSecondary'
                fontSize='16px'
                gutterBottom
                variant='h6'
              >
                ECOSYSTEM
              </Typography>
              <Box
                display='flex'
                flexDirection='column'
                fontSize='14px'
                gap='8px'
              >
                <Link
                  color='primary'
                  href='#'
                  underline='hover'
                >
                  Signer
                </Link>
                <Link
                  color='primary'
                  href='#'
                  underline='hover'
                >
                  Status
                </Link>
              </Box>
            </Grid>
            {/* Resources Section */}
            <Grid columns={{ xs: 12, sm: 4 }}>
              <Typography
                color='textSecondary'
                fontSize='16px'
                gutterBottom
                variant='h6'
              >
                RESOURCES
              </Typography>
              <Box
                display='flex'
                flexDirection='column'
                fontSize='14px'
                gap='8px'
              >
                <Link
                  color='primary'
                  href='#'
                  underline='hover'
                >
                  Docs
                </Link>
                <Link
                  color='primary'
                  href='#'
                  underline='hover'
                >
                  Blog
                </Link>
                <Link
                  color='primary'
                  href='#'
                  underline='hover'
                >
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 4,
            py: 2
          }}
        >
          {/* Footer Info */}
          <Box>
            <Typography
              color='textSecondary'
              fontSize='14px'
              variant='body2'
            >
              Jam Explorer UI
            </Typography>
            <Typography
              color='textSecondary'
              fontSize='14px'
              variant='body2'
            >
              Trustless Supercomputing Explorer Designed by Developers &copy;
              2025
            </Typography>
          </Box>
          {/* Footer Links */}
          <Box
            fontSize='14px'
            mt='15px'
          >
            <Link
              color='inherit'
              href='#'
              sx={{ mx: 1 }}
              underline='hover'
            >
              Terms of Use
            </Link>
            <Link
              color='inherit'
              href='#'
              sx={{ mx: 1 }}
              underline='hover'
            >
              Privacy Policy
            </Link>
            <Link
              color='inherit'
              href='#'
              sx={{ mx: 1 }}
              underline='hover'
            >
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
