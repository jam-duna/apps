import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function SegmentIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Segment.svg'} size={size} color={color}/>
  )
}
