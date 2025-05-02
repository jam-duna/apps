// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function WorkResultsIcon ({ color, size }: IconProps) {
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
      <path d='M20.4999 5.99969H23.9994V26H7.99969V22.0003'></path>
      <path d='M19.9997 2V21.9994H4V2H19.9997Z'></path>
      <path d='M4.48828 16.6885L8.59276 12.5838L11.6647 15.1438L16.2727 10.5358'></path>
    </svg>
  );
}
