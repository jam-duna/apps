// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function PreimageIcon ({ color, size }: IconProps) {
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
      <path d='M23.9559 19.3827V26.7229H4.38208V1.27689H23.9559V20.381'></path>
      <path
        d='M16.9644 13.0457L20.0411 14.3537V5.00011L13.89 5V14.3606L16.9644 13.0457Z'
        strokeMiterlimit='10'
      ></path>
      <path
        d='M20.0411 22.8083H8.29675'
        strokeMiterlimit='10'
      ></path>
      <path
        d='M20.0411 18.8933H8.29675'
        strokeMiterlimit='10'
      ></path>
    </svg>
  );
}
