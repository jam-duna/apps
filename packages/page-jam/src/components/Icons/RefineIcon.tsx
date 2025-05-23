// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function RefineIcon ({ color, size }: IconProps) {
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
        d='M14.0096 15L19.6171 18.9072M8.58282 18.7747L14.0001 15V9.7512'
        data-nofill='true'
        fill='none'
      ></path>
      <path d='M17.9999 5.95697C17.9999 3.77166 16.2283 2.00011 14.043 2.00011C11.8577 2.00011 10.0862 3.77166 10.0862 5.95697C10.0862 8.14228 11.8577 9.91382 14.043 9.91382C16.2283 9.91382 17.9999 8.14228 17.9999 5.95697Z'></path>
      <path d='M9.16639 21.0431C9.16639 18.8578 7.39485 17.0863 5.20954 17.0863C3.02423 17.0863 1.25269 18.8578 1.25269 21.0431C1.25269 23.2285 3.02423 25 5.20954 25C7.39485 25 9.16639 23.2285 9.16639 21.0431Z'></path>
      <path d='M26.747 21.0431C26.747 18.8578 24.9754 17.0863 22.7901 17.0863C20.6048 17.0863 18.8333 18.8578 18.8333 21.0431C18.8333 23.2285 20.6048 25 22.7901 25C24.9754 25 26.747 23.2285 26.747 21.0431Z'></path>
    </svg>
  );
}
