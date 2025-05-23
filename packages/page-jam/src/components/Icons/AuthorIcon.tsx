// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function AuthorIcon ({ color, size }: IconProps) {
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
      <path d='M22.7452 7L26 10.2548L17.5739 18.6809L13.1074 19.8885L14.3191 15.4261L22.7452 7Z'></path>
      <path
        d='M9.77046 19.8888H9.02152C8.33752 19.8888 7.7297 19.5399 7.50598 19.0191L7.33759 18.6263C7.02251 17.9154 6.46324 17.5852 5.88964 17.5817C5.31605 17.5852 4.74795 17.9154 4.43288 18.6263L4.26448 19.0191C4.04076 19.5399 3.43294 19.8888 2.74895 19.8888H2'
        data-nofill='true'
        fill='none'
        strokeMiterlimit='10'
      ></path>
    </svg>
  );
}
