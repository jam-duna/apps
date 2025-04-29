import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function DisputeIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Dispute.svg'} size={size} color={color}/>
  )
}
