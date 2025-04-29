import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function AssuranceIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Assurance.svg'} size={size} color={color}/>
  )
}
