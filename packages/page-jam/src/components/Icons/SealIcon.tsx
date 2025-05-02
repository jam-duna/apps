import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function SealIcon({size, color}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}>
        <path d="M21.4273 6.57269H2V26H21.4273V6.57269Z"></path>
        <path d="M7.11935 14.0187L12.3012 18.7889L25.0074 2" fill="none" data-nofill="true"></path>
    </svg>
  )
}
