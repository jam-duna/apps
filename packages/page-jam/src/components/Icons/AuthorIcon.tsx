import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function AuthorIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Authorization.svg'} size={size} color={color}/>
  )
}
