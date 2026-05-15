import React from 'react'
import { COLORS, FONTS } from '../lib/theme'
import { PlusIcon } from './Icons'

export const PageTitle = ({ title, subtitle }) => (
  <div style={{ marginBottom: '20px' }}>
    <h2 className="title-bold" style={{ fontSize: '34px', margin: 0, color: COLORS.text, lineHeight: 1.0 }}>
      {title}
    </h2>
    {subtitle && (
      <p
        style={{
          fontFamily: FONTS.sub,
          fontSize: '11px',
          color: COLORS.textMuted,
          margin: '8px 0 0',
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          fontWeight: 500,
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
)

export const SectionTitle = ({ children }) => (
  <h3
    style={{
      fontFamily: FONTS.sub,
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '0.22em',
      color: COLORS.textMuted,
      margin: '28px 0 12px 0',
      fontWeight: 600,
    }}
  >
    {children}
  </h3>
)

export const StatCard = ({ label, value, detail }) => (
  <div className="tile" style={{ padding: '16px 18px', minHeight: '92px' }}>
    <div
      style={{
        fontFamily: FONTS.sub,
        fontSize: '10px',
        color: COLORS.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        fontWeight: 500,
      }}
    >
      {label}
    </div>
    <div className="title-bold" style={{ fontSize: '30px', marginTop: '6px', color: COLORS.green, lineHeight: 1 }}>
      {value}
    </div>
    {detail && (
      <div style={{ fontFamily: FONTS.sub, fontSize: '11px', color: COLORS.textFaint, marginTop: '4px' }}>
        {detail}
      </div>
    )}
  </div>
)

export const FilterPill = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '7px 14px',
      borderRadius: '999px',
      fontSize: '11.5px',
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      border: `1px solid ${active ? COLORS.green : COLORS.greenLine}`,
      background: active ? COLORS.green : 'transparent',
      color: active ? COLORS.cream : COLORS.green,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: FONTS.sub,
      transition: 'all 0.15s',
    }}
  >
    {children}
  </button>
)

export const SmallActionButton = React.forwardRef(({ children, onClick, active }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    style={{
      padding: '7px 14px',
      borderRadius: '999px',
      fontSize: '11.5px',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: active ? COLORS.greenDeep : COLORS.green,
      color: COLORS.cream,
      border: 'none',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: FONTS.sub,
      flexShrink: 0,
      transition: 'background 0.15s',
    }}
  >
    {children}
  </button>
))

export const EmptyTile = ({ aspect = '3/4', onClick }) => (
  <div
    onClick={onClick}
    style={{
      aspectRatio: aspect,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: COLORS.textFaint,
      background: COLORS.creamDeep,
      border: `1px dashed ${COLORS.greenLine}`,
      borderRadius: '6px',
      cursor: onClick ? 'pointer' : 'default',
    }}
  >
    <PlusIcon size={22} strokeWidth={1.4} />
  </div>
)

export const FieldLabel = ({ children, required }) => (
  <div
    style={{
      fontFamily: FONTS.sub,
      fontSize: '10px',
      color: COLORS.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      fontWeight: 600,
      marginBottom: '6px',
      marginTop: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    }}
  >
    <span>{children}</span>
    {required && <span style={{ color: COLORS.danger }}>•</span>}
  </div>
)

export const TextInput = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    style={{
      width: '100%',
      padding: '12px 14px',
      borderRadius: '6px',
      border: `1px solid ${COLORS.greenLine}`,
      background: COLORS.white,
      fontFamily: FONTS.sub,
      fontSize: '13.5px',
      color: COLORS.text,
      outline: 'none',
      marginBottom: '12px',
    }}
  />
)
