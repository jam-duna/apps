// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function BlockSearchIcon ({ color, size }: IconProps) {
  return (
    <svg
      fill='none'
      height={size}
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 28 28'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.831 19.662C18.7088 19.662 22.662 15.7078 22.662 10.831C22.662 5.95423 18.7088 2 13.831 2C8.95327 2 5 5.95423 5 10.831C5 15.7078 8.95423 19.662 13.831 19.662Z'
        strokeMiterlimit='10'
      ></path>
      <path d='M10.8704 7.93085H16.6735V13.7302H10.8704V7.93085Z'></path>
      <path
        d='M19.7446 17.3763C18.5887 18.4218 17.1612 19.1706 15.5734 19.4883L19.3318 26L23.3734 23.6662L19.7446 17.3763Z'
        strokeMiterlimit='10'
      ></path>
    </svg>
  );
}
