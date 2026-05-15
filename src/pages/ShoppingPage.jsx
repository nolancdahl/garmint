import React, { useState, useRef, useMemo } from 'react'
import { COLORS, FONTS } from '../lib/theme'
import { SHOPPING_CATEGORIES } from '../lib/constants'
import { PageTitle, FilterPill, SmallActionButton, EmptyTile } from '../components/Primitives'
import { PasteUrlDropdown } from '../components/PasteUrlDropdown'
import { LinkIcon } from '../components/Icons'

const WishlistTile = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className="tile"
    style={{
      aspectRatio: '3/4',
      overflow: 'hidden',
      cursor: 'pointer',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}
  >
    {item.image ? (
      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: COLORS.creamDeep,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.textFaint,
        }}
      >
        <LinkIcon size={28} strokeWidth={1.2} />
      </div>
    )}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '22px 10px 8px',
        background: 'linear-gradient(to top, rgba(19,37,27,0.78), transparent)',
        color: COLORS.cream,
      }}
    >
      {item.publisher && (
        <div
          style={{
            fontFamily: FONTS.sub,
            fontSize: '9px',
            opacity: 0.85,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: 600,
          }}
        >
          {item.publisher}
        </div>
      )}
      <div
        style={{
          fontFamily: FONTS.sub,
          fontSize: '11.5px',
          fontWeight: 600,
          lineHeight: 1.2,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          marginTop: '2px',
        }}
      >
        {item.title}
      </div>
    </div>
  </div>
)

export const ShoppingPage = ({ items, pasteOpen, onPasteOpenChange, onSave, onSelectItem }) => {
  const filters = ['All', ...SHOPPING_CATEGORIES]
  const [active, setActive] = useState('All')
  const [pasteBtnPos, setPasteBtnPos] = useState({ top: 200, right: 18 })
  const pasteBtnRef = useRef(null)

  const filtered = useMemo(
    () => (active === 'All' ? items : items.filter((i) => i.category === active)),
    [active, items]
  )

  const handlePasteClick = () => {
    if (pasteBtnRef.current) {
      const rect = pasteBtnRef.current.getBoundingClientRect()
      setPasteBtnPos({ top: rect.bottom + 8, right: Math.max(12, window.innerWidth - rect.right) })
    }
    onPasteOpenChange(!pasteOpen)
  }

  return (
    <div>
      <PageTitle title="Wishlist" subtitle={active === 'All' ? "What you're considering" : active} />
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ flex: 1, display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {filters.map((it) => (<FilterPill key={it} active={active === it} onClick={() => setActive(it)}>{it}</FilterPill>))}
        </div>
        <SmallActionButton ref={pasteBtnRef} active={pasteOpen} onClick={handlePasteClick}>+ Add</SmallActionButton>
      </div>

      {filtered.length === 0 ? (
        <div
          className="tile"
          style={{ padding: '40px 20px', textAlign: 'center', color: COLORS.textMuted, fontStyle: 'italic', fontSize: '13.5px' }}
        >
          {active === 'All' ? 'No items yet. Tap + Add to drop in a product link.' : `Nothing in ${active} yet.`}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
          {filtered.map((it) => (<WishlistTile key={it.id} item={it} onClick={() => onSelectItem(it)} />))}
          <EmptyTile onClick={handlePasteClick} />
        </div>
      )}

      {pasteOpen && (
        <PasteUrlDropdown
          pos={pasteBtnPos}
          onClose={() => onPasteOpenChange(false)}
          onSave={(item) => {
            onSave(item)
            onPasteOpenChange(false)
          }}
          presetCategory={active}
        />
      )}
    </div>
  )
}
