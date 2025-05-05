// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function AvailabilityIcon ({ color, size }: IconProps) {
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
        <path
          d='M13.9909 22.0069C18.4194 22.0069 22.0094 18.4198 22.0094 13.9949C22.0094 9.56999 18.4194 5.98291 13.9909 5.98291C9.56233 5.98291 5.97229 9.56999 5.97229 13.9949C5.97229 18.4198 9.56233 22.0069 13.9909 22.0069Z'
          strokeMiterlimit='10'
        ></path>
        <path
          d='M14.0674 16.6526V10.9971'
          data-nofill='true'
          fill='none'
        ></path>
        <path
          d='M16.8975 13.8248L11.2373 13.8248'
          data-nofill='true'
          fill='none'
        ></path>
        <path
          d='M20.8724 2.01674L25.9828 2L25.9996 7.09755'
          data-nofill='true'
          fill='none'
        ></path>
        <path
          d='M25.4971 2.67468L19.7224 8.36656'
          data-nofill='true'
          fill='none'
          strokeMiterlimit='10'
        ></path>
        <path
          d='M7.12708 2.01674L2.01666 2L1.99988 7.09755'
          data-nofill='true'
          fill='none'
        ></path>
        <path
          d='M2.50257 2.67468L8.29218 8.36678'
          data-nofill='true'
          fill='none'
          strokeMiterlimit='10'
        ></path>
        <path
          d='M2.01675 20.877L2 25.9832L7.10175 25.9999'
          data-nofill='true'
          fill='none'
        ></path>
        <path
          d='M2.67505 25.498L8.39066 19.7087'
          data-nofill='true'
          fill='none'
          strokeMiterlimit='10'
        ></path>
        <path
          d='M25.9832 20.877L25.9999 25.9832L20.8982 25.9999'
          data-nofill='true'
          fill='none'
        ></path>
        <path
          d='M25.3246 25.498L19.6092 19.709'
          data-nofill='true'
          fill='none'
          strokeMiterlimit='10'
        ></path>
      </g>
    </svg>
  );
}
