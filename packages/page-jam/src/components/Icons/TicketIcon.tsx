import React from 'react'

interface IconProps {
    size: number;
    color: string;
}

export function TicketIcon({size, color}: IconProps) {
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
        <g>
          <path d="M16.0555 1.99997L4.49426 13.5612L10.68 19.747L15.0524 19.747L24.4274 10.3719L16.0555 1.99997Z"></path>
          <path d="M12.6364 14.214L15.0919 14.3288L15.5422 8.03956"></path>
          <path d="M2 26V19.7446H26.4885V26" fill="none" data-nofill="true"></path>
        </g>
    </svg>
  )
}
