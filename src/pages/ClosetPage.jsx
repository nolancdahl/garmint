import React, { useState, useRef, useMemo } from 'react'
import { COLORS, FONTS } from '../lib/theme'
import { CLOSET_CATEGORIES } from '../lib/constants'
import { PageTitle, FilterPill, SmallActionButton, EmptyTile } from '../components/Primitives'
import { PickerRow } from '../components/PickerRow'
import { AddItemDropdown } from '../components/AddItemDropdown'

const ItemTile = ({ item, onClick }) => (
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
    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '20px 10px 8px',
        background: 'linear-gradient(to top, rgba(19,37,27,0.7), transparent)',
        color: COLORS.cream,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.sub,
          fontSize: '11.5px',
          fontWeight: 600,
          lineHeight: 1.2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {item.name}
      </div>
      {item.brand && (
        <div style={{ fontFamily: FONTS.sub, fontSize: '10px', opacity: 0.8, marginTop: '1px' }}>{item.brand}</div>
      )}
    </div>
  </div>
)

export const ClosetPage = ({ items, addOpen, onAddOpenChange, onSelectItem, onSaveItem }) => {
  const [filter, setFilter] = useState('All')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerCat, setPickerCat] = useState(null)
  const [addPos, setAddPos] = useState({ top: 200, right: 18 })
  const addBtnRef = useRef(null)

  const handleAll = () => {
    setFilter('All')
    setPickerOpen(false)
    setPickerCat(null)
  }

  const handlePickToggle = () => {
    if (pickerOpen) {
      setPickerOpen(false)
      setPickerCat(null)
    } else setPickerOpen(true)
  }

  const handleCategoryClick = (cat) => {
    if (cat.subs) setPickerCat(cat)
    else {
      setFilter(cat.name)
      setPickerOpen(false)
      setPickerCat(null)
    }
  }

  const handleSubClick = (sub) => {
    setFilter(sub)
    setPickerOpen(false)
    setPickerCat(null)
  }

  const handleAddClick = () => {
    if (addBtnRef.current) {
      const rect = addBtnRef.current.getBoundingClientRect()
      setAddPos({ top: rect.bottom + 8, right: Math.max(12, window.innerWidth - rect.right) })
    }
    onAddOpenChange(!addOpen)
  }

  const pickLabel = pickerOpen ? 'Pick' : filter !== 'All' ? filter : 'Pick'

  const filteredItems = useMemo(() => {
    if (filter === 'All') return items
    const isSub = CLOSET_CATEGORIES.some((c) => c.subs && c.subs.includes(filter))
    if (isSub) return items.filter((it) => it.subcategory === filter)
    return items.filter((it) => it.category === filter)
  }, [filter, items])

  return (
    <div>
      <PageTitle title="The Closet" subtitle={filter === 'All' ? 'What you own' : filter} />

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '16px' }}>
        <FilterPill active={!pickerOpen && filter === 'All'} onClick={handleAll}>All</FilterPill>
        <FilterPill active={pickerOpen || filter !== 'All'} onClick={handlePickToggle}>{pickLabel}</FilterPill>
        <div style={{ flex: 1 }} />
        <SmallActionButton ref={addBtnRef} active={addOpen} onClick={handleAddClick}>+ Add</SmallActionButton>
      </div>

      {pickerOpen ? (
        <div className="tile" style={{ padding: 0, overflow: 'hidden' }}>
          {pickerCat ? (
            <>
              <PickerRow onClick={() => setPickerCat(null)} isBack uppercase>{pickerCat.name}</PickerRow>
              {pickerCat.subs.map((s) => (
                <PickerRow key={s} onClick={() => handleSubClick(s)}>{s}</PickerRow>
              ))}
            </>
          ) : (
            CLOSET_CATEGORIES.map((c) => (
              <PickerRow key={c.name} onClick={() => handleCategoryClick(c)} hasChildren={!!c.subs} uppercase>
                {c.name}
              </PickerRow>
            ))
          )}
        </div>
      ) : filteredItems.length === 0 ? (
        <div
          className="tile"
          style={{ padding: '40px 20px', textAlign: 'center', color: COLORS.textMuted, fontStyle: 'italic', fontSize: '13.5px' }}
        >
          {filter === 'All' ? 'Your closet is empty. Tap + Add to log your first piece.' : `Nothing here under ${filter} yet.`}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
          {filteredItems.map((item) => (<ItemTile key={item.id} item={item} onClick={() => onSelectItem(item)} />))}
          <EmptyTile onClick={handleAddClick} />
        </div>
      )}

      {addOpen && (
        <AddItemDropdown
          pos={addPos}
          onClose={() => onAddOpenChange(false)}
          onSave={(item) => {
            onSaveItem(item)
            onAddOpenChange(false)
          }}
        />
      )}
    </div>
  )
}
