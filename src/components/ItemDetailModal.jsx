import React, { useState } from 'react'
import { COLORS, FONTS } from '../lib/theme'
import { XIcon, TrashIcon } from './Icons'

export const ItemDetailModal = ({ item, onClose, onDelete }) => {
  const [confirming, setConfirming] = useState(false)
  return (
    <>
      <div
        className="backdrop-enter"
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(19, 37, 27, 0.55)', zIndex: 200, backdropFilter: 'blur(3px)' }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 201,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          className="modal-enter"
          style={{
            pointerEvents: 'auto',
            width: '92vw',
            maxWidth: '420px',
            maxHeight: '88vh',
            background: COLORS.cream,
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(19, 37, 27, 0.35)',
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
            />
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(19, 37, 27, 0.75)',
                border: 'none',
                color: COLORS.cream,
                width: '32px',
                height: '32px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <XIcon size={16} />
            </button>
          </div>
          <div style={{ padding: '20px' }}>
            <div className="title-bold" style={{ fontSize: '22px', color: COLORS.text, lineHeight: 1.1 }}>
              {item.name}
            </div>
            {item.brand && (
              <div style={{ fontFamily: FONTS.sub, fontSize: '12.5px', color: COLORS.textMuted, marginTop: '4px' }}>
                {item.brand}
              </div>
            )}
            <div style={{ marginTop: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: FONTS.sub,
                  fontSize: '10.5px',
                  padding: '5px 11px',
                  background: COLORS.green,
                  color: COLORS.cream,
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                {item.category}
              </span>
              {item.subcategory && (
                <span
                  style={{
                    fontFamily: FONTS.sub,
                    fontSize: '10.5px',
                    padding: '5px 11px',
                    background: 'transparent',
                    color: COLORS.green,
                    border: `1px solid ${COLORS.greenLine}`,
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 500,
                  }}
                >
                  {item.subcategory}
                </span>
              )}
            </div>
          </div>
          <div style={{ padding: '0 20px 18px', display: 'flex', gap: '10px' }}>
            {confirming ? (
              <>
                <button
                  onClick={() => setConfirming(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'transparent',
                    border: `1px solid ${COLORS.greenLine}`,
                    borderRadius: '6px',
                    fontFamily: FONTS.sub,
                    fontSize: '12px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: COLORS.green,
                    cursor: 'pointer',
                  }}
                >
                  Keep
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: COLORS.danger,
                    color: COLORS.cream,
                    border: 'none',
                    borderRadius: '6px',
                    fontFamily: FONTS.sub,
                    fontSize: '12px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Confirm delete
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirming(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  border: `1px solid ${COLORS.greenLine}`,
                  borderRadius: '6px',
                  fontFamily: FONTS.sub,
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: COLORS.danger,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <TrashIcon size={14} />
                Remove from closet
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
