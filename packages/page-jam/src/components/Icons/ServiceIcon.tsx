// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface IconProps {
  size: number;
  color: string;
}

export function ServiceIcon ({ color, size }: IconProps) {
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
          d='M14.7808 24.1821L17.2887 26.9686L23.0111 23.6745L21.9164 20.1316L22.354 18.8179L26.3849 18.1253V11.3141L22.7723 10.4881L21.9463 9.055L23.0908 5.51209L17.3783 2.21797L14.8306 4.95478H13.2084L10.7105 2.16821L4.98805 5.46233L6.09273 9.06495L5.30652 10.4383L1.60437 11.2146V17.8227L5.27666 18.6587L6.07282 20.0321L4.89848 23.6247L10.6209 26.9288L13.1587 24.1821H14.7808Z'
          strokeMiterlimit='10'
        ></path>
        <path d='M18.3612 13.521H9.63867V19.0227H18.3612V13.521Z'></path>
        <path d='M11.2649 13.2998V11.3034C11.2649 10.578 11.553 9.88235 12.066 9.36943C12.5789 8.85651 13.2746 8.56836 13.9999 8.56836C14.7235 8.57115 15.4164 8.86054 15.9271 9.37316C16.4377 9.88577 16.7244 10.5798 16.7244 11.3034V13.2998'></path>
      </g>
    </svg>
  );
}
