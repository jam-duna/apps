// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import InlineSVG from './InlineSVG.js';

interface IconProps {
  size: number;
  color: string;
}

export function SealIcon ({ color, size }: IconProps) {
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
      <path d='M21.4273 6.57269H2V26H21.4273V6.57269Z'></path>
      <path
        d='M7.11935 14.0187L12.3012 18.7889L25.0074 2'
        data-nofill='true'
        fill='none'
      ></path>
    </svg>
  );
}
