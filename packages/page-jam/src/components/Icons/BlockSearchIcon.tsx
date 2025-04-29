import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function BlockSearchIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Search.svg'} size={size} color={color}/>
  )
}
