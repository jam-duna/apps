import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function WorkReportIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Work_Report.svg'} size={size} color={color}/>
  )
}
