import React from 'react'
import { PageTitle, SectionTitle, StatCard } from '../components/Primitives'
import { WeatherTile } from '../components/WeatherTile'
import { COLORS, FONTS } from '../lib/theme'
import { PlusIcon } from '../components/Icons'

const QuickAction = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="tile"
    style={{
      padding: '16px',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      fontFamily: FONTS.sub,
      fontSize: '13px',
      color: COLORS.text,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
    }}
  >
    <span>{label}</span>
    <PlusIcon size={16} strokeWidth={1.5} color={COLORS.green} />
  </button>
)

export const HomePage = ({ closetCount, wishlistCount, onAddPiece }) => (
  <div>
    <PageTitle title="Good morning, Nolán" subtitle="Today" />
    <WeatherTile />
    <SectionTitle>This week</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '8px' }}>
      <StatCard label="Closet" value={closetCount || '—'} detail="items catalogued" />
      <StatCard label="Wishlist" value={wishlistCount || '—'} detail="under consideration" />
      <StatCard label="Worn" value="—" detail="this month" />
      <StatCard label="Top piece" value="—" detail="most worn" />
    </div>
    <SectionTitle>Quick actions</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
      <QuickAction label="Log today's outfit" />
      <QuickAction label="Add to closet" onClick={onAddPiece} />
      <QuickAction label="Save inspo image" />
      <QuickAction label="Paste a wishlist link" />
    </div>
  </div>
)
