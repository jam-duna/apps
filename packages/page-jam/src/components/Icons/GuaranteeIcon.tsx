import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function GuaranteeIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Guarantee.svg'} size={size} color={color}/>
  )
}
