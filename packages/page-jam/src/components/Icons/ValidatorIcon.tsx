import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function ValidatorIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Validator.svg'} size={size} color={color}/>
  )
}
