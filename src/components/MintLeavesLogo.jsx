import React from 'react'
import { COLORS } from '../lib/theme'

export const MintLeavesLogo = ({ size = 30 }) => {
  const w = size
  const h = Math.round((size * 32) / 36)

  const leafPath =
    'M 9 1 L 11 3 L 9 4 L 13 5 L 10 8 L 15 10 L 10 12 L 15 15 L 10 17 L 13 20 L 9 21 L 11 24 L 9 26 L 9 27 L 7 24 L 5 21 L 8 20 L 3 17 L 8 15 L 3 12 L 8 10 L 3 8 L 8 5 L 5 4 L 7 3 Z'

  return (
    <svg width={w} height={h} viewBox="0 0 36 32" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 2) rotate(-22 11 22)">
        <path d={leafPath} fill={COLORS.cream} />
        <line x1="9" y1="2" x2="9" y2="26" stroke={COLORS.green} strokeWidth="0.7" strokeLinecap="round" />
        <line x1="9" y1="9" x2="12" y2="8" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="9" x2="6" y2="8" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="14" x2="13" y2="13" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="14" x2="5" y2="13" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="19" x2="12" y2="18" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="19" x2="6" y2="18" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
      </g>
      <g transform="translate(13 1) rotate(16 11 22)">
        <path d={leafPath} fill={COLORS.cream} />
        <line x1="9" y1="2" x2="9" y2="26" stroke={COLORS.green} strokeWidth="0.7" strokeLinecap="round" />
        <line x1="9" y1="9" x2="12" y2="8" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="9" x2="6" y2="8" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="14" x2="13" y2="13" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="14" x2="5" y2="13" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="19" x2="12" y2="18" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
        <line x1="9" y1="19" x2="6" y2="18" stroke={COLORS.green} strokeWidth="0.4" strokeLinecap="round" />
      </g>
    </svg>
  )
}
