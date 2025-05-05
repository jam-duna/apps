// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export const CustomToggle = styled(Switch)(() => ({
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    height: 16,
    margin: 2,
    width: 16
  },
  '& .MuiSwitch-track': {
    '&::before, &::after': {
      content: '""',
      height: 16,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16
    },
    borderRadius: 22 / 2
  },
  padding: 8
}));
