import React, { useState, useRef, useEffect, useCallback } from 'react'
import { COLORS, FONTS } from '../lib/theme'
import { CLOSET_CATEGORIES } from '../lib/constants'
import { fileToResizedDataUrl } from '../lib/storage'
import { AnchoredDropdown } from './AnchoredDropdown'
import { PickerRow } from './PickerRow'
import { FieldLabel, TextInput } from './Primitives'
import { CameraIcon, XIcon, ChevronLeft, ChevronRight } from './Icons'

export const AddItemDropdown = ({ pos, onClose, onSave }) => {
  const [imageData, setImageData] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState(null)
  const [subcategory, setSubcategory] = useState(null)
  const [pickerCat, setPickerCat] = useState(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef(null)

  const processFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setProcessing(true)
    try {
      const url = await fileToResizedDataUrl(file)
      setImageData(url)
    } catch (e) {
      console.error(e)
    } finally {
      setProcessing(false)
    }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (!e.clipboardData) return
      const items = e.clipboardData.items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          const file = items[i].getAsFile()
          if (file) {
            processFile(file)
            e.preventDefault()
          }
          return
        }
      }
    }
    document.addEventListener('paste', handler)
    return () => document.removeEventListener('paste', handler)
  }, [processFile])

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer?.files
    if (files && files.length > 0) processFile(files[0])
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) processFile(file)
  }

  const canSave = !!imageData && !!category

  const handleSave = () => {
    if (!canSave) return
    onSave({
      id: Date.now().toString(),
      image: imageData,
      name: name.trim() || 'Untitled',
      brand: brand.trim() || null,
      category,
      subcategory,
      addedAt: new Date().toISOString(),
    })
  }

  const categoryLabel = subcategory ? `${category} · ${subcategory}` : category || 'Pick a category'

  return (
    <AnchoredDropdown pos={pos} onClose={onClose}>
      <div
        style={{
          padding: '14px 16px',
          borderBottom: `1px solid ${COLORS.greenLine}`,
          background: COLORS.green,
          color: COLORS.cream,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div>
          <div className="title-bold" style={{ fontSize: '17px', color: COLORS.cream }}>Add a piece</div>
          <div
            style={{
              fontFamily: FONTS.sub,
              fontSize: '9.5px',
              color: 'rgba(244, 238, 224, 0.7)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginTop: '3px',
              fontWeight: 500,
            }}
          >
            Upload, paste, or drop
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: COLORS.cream, cursor: 'pointer', padding: '5px' }}>
          <XIcon size={18} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <div
          onClick={() => fileRef.current && fileRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            aspectRatio: '4/3',
            background: imageData ? `url(${imageData}) center/cover` : isDragging ? 'rgba(31, 61, 46, 0.10)' : COLORS.creamDeep,
            border: imageData ? 'none' : `1px ${isDragging ? 'solid' : 'dashed'} ${isDragging ? COLORS.green : COLORS.greenLine}`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isDragging ? COLORS.green : COLORS.textMuted,
            flexDirection: 'column',
            gap: '6px',
            marginBottom: '16px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 0.15s, border-color 0.15s',
          }}
        >
          {processing ? (
            <div style={{ fontFamily: FONTS.sub, fontSize: '12px', color: COLORS.textFaint, fontStyle: 'italic' }}>Processing…</div>
          ) : !imageData ? (
            <>
              <CameraIcon size={26} strokeWidth={1.3} />
              <div style={{ fontFamily: FONTS.sub, fontSize: '11.5px', textAlign: 'center', lineHeight: 1.4 }}>
                {isDragging ? 'Drop the image here' : 'Tap to upload, paste, or drag in'}
              </div>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setImageData(null)
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(19, 37, 27, 0.7)',
                color: COLORS.cream,
                border: 'none',
                borderRadius: '999px',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <XIcon size={13} />
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        </div>

        <FieldLabel>Name</FieldLabel>
        <TextInput value={name} onChange={setName} placeholder="e.g. Wool flannel trousers" />

        <FieldLabel>Brand</FieldLabel>
        <TextInput value={brand} onChange={setBrand} placeholder="Optional" />

        <FieldLabel required>Category</FieldLabel>
        <button
          onClick={() => setPickerOpen((v) => !v)}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: '6px',
            border: `1px solid ${pickerOpen ? COLORS.green : COLORS.greenLine}`,
            background: COLORS.white,
            fontFamily: FONTS.sub,
            fontSize: '13.5px',
            color: category ? COLORS.text : COLORS.textFaint,
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{categoryLabel}</span>
          {pickerOpen ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
        </button>

        {pickerOpen && (
          <div className="tile" style={{ padding: 0, overflow: 'hidden', marginTop: '8px' }}>
            {pickerCat ? (
              <>
                <PickerRow onClick={() => setPickerCat(null)} isBack uppercase>{pickerCat.name}</PickerRow>
                {pickerCat.subs.map((s) => (
                  <PickerRow
                    key={s}
                    onClick={() => {
                      setCategory(pickerCat.name)
                      setSubcategory(s)
                      setPickerCat(null)
                      setPickerOpen(false)
                    }}
                  >
                    {s}
                  </PickerRow>
                ))}
              </>
            ) : (
              CLOSET_CATEGORIES.map((c) => (
                <PickerRow
                  key={c.name}
                  hasChildren={!!c.subs}
                  uppercase
                  onClick={() => {
                    if (c.subs) {
                      setPickerCat(c)
                    } else {
                      setCategory(c.name)
                      setSubcategory(null)
                      setPickerOpen(false)
                    }
                  }}
                >
                  {c.name}
                </PickerRow>
              ))
            )}
          </div>
        )}
      </div>

      <div
        style={{
          padding: '12px 16px',
          borderTop: `1px solid ${COLORS.greenLine}`,
          display: 'flex',
          gap: '8px',
          background: COLORS.cream,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: '11px',
            background: 'transparent',
            border: `1px solid ${COLORS.greenLine}`,
            borderRadius: '6px',
            fontFamily: FONTS.sub,
            fontSize: '11.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: COLORS.green,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!canSave}
          style={{
            flex: 1.4,
            padding: '11px',
            background: canSave ? COLORS.green : COLORS.greenLine,
            color: COLORS.cream,
            border: 'none',
            borderRadius: '6px',
            fontFamily: FONTS.sub,
            fontSize: '11.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: canSave ? 'pointer' : 'not-allowed',
            opacity: canSave ? 1 : 0.6,
          }}
        >
          Save item
        </button>
      </div>
    </AnchoredDropdown>
  )
}
