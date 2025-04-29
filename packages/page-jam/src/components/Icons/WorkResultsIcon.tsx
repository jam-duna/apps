import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function WorkResultsIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Work_Results.svg'} size={size} color={color}/>
  )
}
