// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function GuaranteeIcon ({ color, size }: IconProps) {
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
      <path d='M23.4615 8.92308V2H4.99999V26H23.4615V7.98154'></path>
      <path
        d='M19.7691 5.69208L8.69221 5.69208'
        strokeMiterlimit='10'
      ></path>
      <path
        d='M19.7692 9.38446H8.69221'
        strokeMiterlimit='10'
      ></path>
      <path d='M20.2628 18.0844L16.963 21.3842L15.5942 20.0155'></path>
      <path d='M13.0077 18.0844L9.70782 21.3842L8.3391 20.0155'></path>
    </svg>
  );
}
