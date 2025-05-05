// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function CoreIcon ({ color, size }: IconProps) {
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
      <rect
        height='16'
        width='16'
        x='6'
        y='6'
      ></rect>
      <path d='M14 2L14 6'></path>
      <path d='M10 2L10 6'></path>
      <path d='M18 2L18 6'></path>
      <path d='M14 22L14 26'></path>
      <path d='M18 14.1738V13.8259C18 11.6168 16.2091 9.82593 14 9.82593C11.7909 9.82593 10 11.6168 10 13.8259V14.1738C10 16.3829 11.7909 18.1738 14 18.1738C16.2091 18.1738 18 16.3829 18 14.1738Z'></path>
    </svg>
  );
}
