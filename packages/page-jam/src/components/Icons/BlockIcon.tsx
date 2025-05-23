// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function BlockIcon ({ color, size }: IconProps) {
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
        <path d='M11.2309 2H2V11.2309H11.2309V2Z'></path>
        <path d='M11.2308 16.7692H2V26H11.2308V16.7692Z'></path>
        <path d='M26.0001 2H16.7692V11.2309H26.0001V2Z'></path>
        <path d='M26 16.7692H16.7692V26H26V16.7692Z'></path>
        <path d='M11.3457 6.7023H16.7692'></path>
        <path d='M16.5569 21.534L11.3457 21.534'></path>
        <path d='M11.1746 16.8253L16.8262 11.1737'></path>
      </g>
    </svg>
  );
}
