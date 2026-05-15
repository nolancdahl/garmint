import React from 'react'
import { COLORS } from '../lib/theme'

export const AnchoredDropdown = ({ pos, onClose, children, width = 340 }) => (
  <>
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'transparent' }} />
    <div
      className="dropdown-enter"
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        top: pos.top,
        right: pos.right,
        width: `${width}px`,
        maxWidth: 'calc(100vw - 24px)',
        maxHeight: `calc(100vh - ${pos.top + 24}px)`,
        background: COLORS.cream,
        borderRadius: '12px',
        boxShadow: '0 16px 40px rgba(19, 37, 27, 0.22), 0 2px 8px rgba(19, 37, 27, 0.10)',
        zIndex: 101,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: `1px solid ${COLORS.greenLine}`,
      }}
    >
      {children}
    </div>
  </>
)
