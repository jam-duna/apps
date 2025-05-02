// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function HomeIcon ({ color, size }: IconProps) {
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
      <g>
        <path d='M11.5 26.1934H2V10.6934L14 2.19336L26 10.6934V26.1934H17V17.6934H11.5V26.1934Z'></path>
      </g>
    </svg>
  );
}
