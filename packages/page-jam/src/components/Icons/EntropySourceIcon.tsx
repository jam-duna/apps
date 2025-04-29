import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function EntropySourceIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Entropy_Source.svg'} size={size} color={color}/>
  )
}
