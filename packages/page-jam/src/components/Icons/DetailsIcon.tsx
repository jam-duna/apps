import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function DetailsIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Details.svg'} size={size} color={color}/>
  )
}
