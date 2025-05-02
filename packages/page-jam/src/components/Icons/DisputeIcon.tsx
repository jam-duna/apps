// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function DisputeIcon ({ color, size }: IconProps) {
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
        d='M13.9898 3.12793L2.19775 24.872H25.7818L13.9898 3.12793Z'
        strokeMiterlimit='10'
      ></path>
      <path
        d='M13.9992 17.7247L13.9897 10.5945'
        strokeMiterlimit='10'
      ></path>
      <path
        d='M14.0093 21.1309L13.9912 21.1128'
        strokeMiterlimit='10'
      ></path>
    </svg>
  );
}
