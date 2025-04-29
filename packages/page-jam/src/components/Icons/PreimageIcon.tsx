import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function PreimageIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Preimage.svg'} size={size} color={color}/>
  )
}
