import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function AvailabilityIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Availability_Specifier.svg'} size={size} color={color}/>
  )
}
