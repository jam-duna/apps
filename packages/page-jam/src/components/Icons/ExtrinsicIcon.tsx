// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function ExtrinsicIcon ({ color, size }: IconProps) {
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
        d='M2 8.47366L25 8.47366M20.4787 2.95239L26 8.47366L20.4787 14.0044'
        fill='none'
      ></path>
      <path
        d='M25.9918 19.5213H3M7.52138 25.0521L2 19.5213L7.52138 14.0001'
        fill='none'
      ></path>
    </svg>
  );
}
