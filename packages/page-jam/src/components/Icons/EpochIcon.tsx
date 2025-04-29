import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function EpochIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Epoch.svg'} size={size} color={color}/>
  )
}
