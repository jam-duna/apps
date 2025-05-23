// Copyright 2017-2025 @polkadot/app-jamm author & contributors
// SPDX-License-Identifier: Apache-2.0

import { Typography } from '@mui/material';
import React from 'react';

// ToggleHash component: shows a truncated hash by default, toggles on click.
interface ToggleHashProps {
  hash: string;
}

export default function ToggleHash ({ hash }: ToggleHashProps) {
  const [expanded, setExpanded] = React.useState(false);
  const handleToggle = () => setExpanded(!expanded);

  return (
    <Typography
      // eslint-disable-next-line react/jsx-no-bind
      onClick={handleToggle}
      sx={{ cursor: 'pointer', display: 'inline' }}
      title='Click to toggle full hash'
      variant='body2'
    >
      {hash}
    </Typography>
  );
}
