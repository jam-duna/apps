import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function AccumulateIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Accumulate.svg'} size={size} color={color}/>
  )
}
