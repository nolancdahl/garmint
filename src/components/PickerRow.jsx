import React from 'react'
import { COLORS, FONTS } from '../lib/theme'
import { ChevronLeft, ChevronRight } from './Icons'

export const PickerRow = ({ children, onClick, hasChildren, isBack, uppercase }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '14px 18px',
      background: 'transparent',
      border: 'none',
      borderBottom: `1px solid ${COLORS.greenLineSoft}`,
      fontFamily: FONTS.sub,
      fontSize: uppercase ? '12.5px' : '14px',
      color: COLORS.text,
      cursor: 'pointer',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontWeight: isBack || uppercase ? 600 : 500,
      letterSpacing: uppercase ? '0.14em' : '0',
      textTransform: uppercase ? 'uppercase' : 'none',
      transition: 'background 0.15s',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(31, 61, 46, 0.04)')}
    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
  >
    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isBack ? COLORS.green : COLORS.text }}>
      {isBack && <ChevronLeft size={16} />}
      {children}
    </span>
    {hasChildren && <ChevronRight size={16} color={COLORS.textFaint} />}
  </button>
)
