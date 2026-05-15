import React from 'react'
import { COLORS } from '../lib/theme'

export const BottomNav = ({ pages, current, onChange }) => (
  <nav
    style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: COLORS.creamLight,
      borderTop: `1px solid ${COLORS.greenLine}`,
      padding: '12px 4px 14px',
      paddingBottom: 'calc(14px + env(safe-area-inset-bottom, 0px))',
      zIndex: 40,
      backdropFilter: 'blur(8px)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', maxWidth: '640px', margin: '0 auto' }}>
      {pages.map((p) => {
        const Icon = p.icon
        const isActive = current === p.id
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            aria-label={p.label}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 2px',
              color: isActive ? COLORS.green : COLORS.textFaint,
              transition: 'color 0.18s',
            }}
          >
            <Icon size={22} strokeWidth={isActive ? 2 : 1.4} />
          </button>
        )
      })}
    </div>
  </nav>
)
