import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function RefineIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Refine.svg'} size={size} color={color}/>
  )
}
