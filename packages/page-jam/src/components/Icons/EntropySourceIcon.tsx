// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function EntropySourceIcon ({ color, size }: IconProps) {
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
        d='M2 25.5212V19.3907H26V25.5212'
        fill='none'
      ></path>
      <path d='M15.7884 2L4.45782 13.3306L10.5202 19.393H14.8053L23.9933 10.2049L15.7884 2Z'></path>
    </svg>
  );
}
