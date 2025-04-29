import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function SealIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Seal.svg'} size={size} color={color}/>
  )
}
