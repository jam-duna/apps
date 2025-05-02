// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function WorkReportIcon ({ color, size }: IconProps) {
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
      <path d='M23.4615 8.92308V2H5.00001V26H23.4615V7.98154'></path>
      <path
        d='M19.7691 5.69211L8.6922 5.69211'
        strokeMiterlimit='10'
      ></path>
      <path
        d='M19.7692 9.38443H8.6922'
        strokeMiterlimit='10'
      ></path>
      <path d='M19.7693 17.879L16.2636 21.3846L14.8095 19.9305'></path>
    </svg>
  );
}
