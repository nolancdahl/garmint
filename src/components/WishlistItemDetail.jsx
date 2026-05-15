import React, { useState } from 'react'
import { COLORS, FONTS } from '../lib/theme'
import { XIcon, TrashIcon, LinkIcon, ExternalIcon } from './Icons'

export const WishlistItemDetail = ({ item, onClose, onDelete }) => {
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
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: COLORS.creamDeep,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: COLORS.textFaint,
                }}
              >
                <LinkIcon size={32} strokeWidth={1.2} />
              </div>
            )}
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
            {item.publisher && (
              <div
                style={{
                  fontFamily: FONTS.sub,
                  fontSize: '10.5px',
                  color: COLORS.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                {item.publisher}
              </div>
            )}
            <div className="title-bold" style={{ fontSize: '20px', color: COLORS.text, lineHeight: 1.15 }}>
              {item.title}
            </div>
            <div style={{ marginTop: '12px' }}>
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
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '14px',
                color: COLORS.green,
                fontFamily: FONTS.sub,
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: `1px solid ${COLORS.greenLine}`,
                paddingBottom: '2px',
              }}
            >
              Visit page <ExternalIcon size={12} />
            </a>
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
                  Confirm
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
                Remove from wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
