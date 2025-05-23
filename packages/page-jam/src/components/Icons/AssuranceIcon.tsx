// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function AssuranceIcon ({ color, size }: IconProps) {
  return (
    <svg
      fill='none'
      height={size}
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 28 29'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M2 14.5684C2 21.1958 7.37259 26.5684 14 26.5684C20.6274 26.5684 26 21.1958 26 14.5684C26 7.94094 20.6274 2.56836 14 2.56836C7.37258 2.56836 2 7.94094 2 14.5684Z'></path>
      <path d='M7.14283 14.5684C7.14283 18.3555 10.2129 21.4256 14 21.4256C17.7871 21.4256 20.8571 18.3555 20.8571 14.5684C20.8571 10.7814 17.7871 7.7113 14 7.7113C10.2129 7.7113 7.14283 10.7814 7.14283 14.5684Z'></path>
      <path d='M17.1064 2.97809L15.8862 7.53174'></path>
      <path d='M3.60749 20.5675L7.69019 18.2103'></path>
      <path d='M25.5917 11.4627L21.038 12.6829'></path>
      <path d='M22.4851 23.0538L19.1516 19.7203'></path>
      <path d='M11.0052 25.7452L12.2253 21.1915'></path>
      <path d='M11.4285 14.5685C11.4285 15.9887 12.5798 17.1399 13.9999 17.1399C15.4201 17.1399 16.5714 15.9887 16.5714 14.5685C16.5714 13.1483 15.4201 11.9971 13.9999 11.9971C12.5798 11.9971 11.4285 13.1483 11.4285 14.5685Z'></path>
    </svg>
  );
}
