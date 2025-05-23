// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function StatisticsIcon ({ color, size }: IconProps) {
  return (
    <svg
      fill='none'
      height={size}
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 29 28'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.00616 11.1632L11.3374 4.83194L17.6687 11.1632L23.303 4.55295'
        fill='none'
      >
      </path>
      <path
        d='M11.3313 11.3865L11.3313 23.2954'
        fill='none'
      >
      </path>
      <path
        d='M5 15.6073L5 23.2953'
        fill='none'
      >
      </path>
      <path
        d='M17.6625 15.6073L17.6625 23.2954'
        fill='none'
      >
      </path>
      <path
        d='M23.9938 12.4418L23.9938 23.2954'
        fill='none'
      >
      </path>
      <path
        d='M19.7792 3.99998L23.9938 3.99998L23.9938 8.22083'
        fill='none'
      >
      </path>
    </svg>
  );
}
