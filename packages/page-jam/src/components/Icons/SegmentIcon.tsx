// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function SegmentIcon ({ color, size }: IconProps) {
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
        <path d='M6.46256 2L6.46256 9.02948M6.46254 26L6.46254 18.9235'></path>
        <path d='M21.3759 2L21.3759 9.02948M21.3759 26L21.3759 18.9235'></path>
        <path d='M11.2265 9.38394H2V18.6105H11.2265V9.38394Z'></path>
        <path d='M25.9891 9.38394H16.7626V18.6105H25.9891V9.38394Z'></path>
        <path d='M12.1115 13.9972L15.8775 13.9972'></path>
      </g>
    </svg>
  );
}
