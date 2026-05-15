import React, { useState } from 'react'
import { COLORS, FONTS } from '../lib/theme'
import { SendIcon } from './Icons'

export const ChatPopup = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('')
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'transparent' }} />
      <div
        onClick={(e) => e.stopPropagation()}
        className={isOpen ? 'popup-enter' : 'popup-exit'}
        style={{
          position: 'fixed',
          bottom: 'calc(146px + env(safe-area-inset-bottom, 0px))',
          right: '18px',
          width: '340px',
          maxWidth: 'calc(100vw - 36px)',
          maxHeight: '70vh',
          background: COLORS.cream,
          borderRadius: '12px',
          boxShadow: '0 16px 40px rgba(19, 37, 27, 0.28), 0 2px 8px rgba(19, 37, 27, 0.12)',
          zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: `1px solid ${COLORS.greenLine}`,
        }}
      >
        <div style={{ padding: '16px 18px 12px', borderBottom: `1px solid ${COLORS.greenLine}`, background: COLORS.green, color: COLORS.cream }}>
          <div className="title-bold" style={{ fontSize: '20px', color: COLORS.cream }}>Ask Garmint</div>
          <div
            style={{
              fontFamily: FONTS.sub,
              fontSize: '9.5px',
              color: 'rgba(244, 238, 224, 0.7)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '3px',
              fontWeight: 500,
            }}
          >
            Get insight on your clothes
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minHeight: '160px',
            padding: '18px',
            color: COLORS.textMuted,
            fontStyle: 'italic',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            background: COLORS.creamLight,
          }}
        >
          Ask about fit, fabric, brands, color, anything.
        </div>
        <div style={{ display: 'flex', gap: '6px', padding: '12px', borderTop: `1px solid ${COLORS.greenLine}`, background: COLORS.cream }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a question..."
            style={{
              flex: 1,
              padding: '11px 12px',
              borderRadius: '4px',
              border: `1px solid ${COLORS.greenLine}`,
              background: COLORS.white,
              fontFamily: FONTS.sub,
              fontSize: '13px',
              outline: 'none',
            }}
          />
          <button
            style={{
              padding: '0 14px',
              background: COLORS.green,
              color: COLORS.cream,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SendIcon size={14} />
          </button>
        </div>
      </div>
    </>
  )
}
