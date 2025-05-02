import React from "react";

interface IconProps {
  size: number;
  color: string;
}

export function HomeIcon({ size, color }: IconProps) {
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
      stroke={color}
    >
      <g>
        <path d="M11.5 26.1934H2V10.6934L14 2.19336L26 10.6934V26.1934H17V17.6934H11.5V26.1934Z"></path>
      </g>
    </svg>
  );
}
