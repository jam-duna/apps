// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function DetailsIcon ({ color, size }: IconProps) {
  return (
    <svg
      fill='none'
      height={size}
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 29 29'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='14.9941'
        cy='4.89896'
        r='2.35489'
        transform='rotate(135 14.9941 4.89896)'
      ></circle>
      <circle
        cx='14.9941'
        cy='14.5685'
        r='2.35489'
        transform='rotate(135 14.9941 14.5685)'
      ></circle>
      <circle
        cx='14.9941'
        cy='24.2382'
        r='2.35489'
        transform='rotate(135 14.9941 24.2382)'
      ></circle>
    </svg>
  );
}
