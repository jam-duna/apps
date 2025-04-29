import React from 'react'
import InlineSVG from './InlineSVG.js'

interface IconProps {
    size: number;
    color: string;
}

export function TicketIcon({size, color}: IconProps) {
  return (
    <InlineSVG src={'../../public/icons/Ticket.svg'} size={size} color={color}/>
  )
}
