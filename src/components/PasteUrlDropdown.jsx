import React, { useState, useEffect, useCallback } from 'react'
import { COLORS, FONTS } from '../lib/theme'
import { SHOPPING_CATEGORIES } from '../lib/constants'
import { AnchoredDropdown } from './AnchoredDropdown'
import { PickerRow } from './PickerRow'
import { FieldLabel } from './Primitives'
import { LinkIcon, XIcon, ChevronLeft, ChevronRight } from './Icons'

export const PasteUrlDropdown = ({ pos, onClose, onSave, presetCategory }) => {
  const [url, setUrl] = useState('')
  const [metadata, setMetadata] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState(presetCategory && presetCategory !== 'All' ? presetCategory : null)
  const [categoryOpen, setCategoryOpen] = useState(false)

  const fetchMetadata = useCallback(async (urlToFetch) => {
    if (!urlToFetch || !urlToFetch.match(/^https?:\/\//)) return
    setFetching(true)
    setError(null)
    setMetadata(null)
    try {
      const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(urlToFetch)}`
      const r = await fetch(apiUrl)
      const data = await r.json()
      if (data.status === 'success') {
        setMetadata({
          title: data.data.title || 'Untitled',
          image: data.data.image && data.data.image.url ? data.data.image.url : null,
          description: data.data.description || '',
          publisher: data.data.publisher || data.data.author || '',
          url: data.data.url || urlToFetch,
        })
      } else {
        setError("Couldn't read that link. You can still save it.")
      }
    } catch (e) {
      setError('Network error. You can still save the link.')
    } finally {
      setFetching(false)
    }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (!e.clipboardData) return
      const text = e.clipboardData.getData('text')
      if (text && text.match(/^https?:\/\//) && !url) {
        setUrl(text)
        fetchMetadata(text)
        e.preventDefault()
      }
    }
    document.addEventListener('paste', handler)
    return () => document.removeEventListener('paste', handler)
  }, [url, fetchMetadata])

  const canSave = !!url && !!category

  const handleUrlChange = (val) => {
    setUrl(val)
    if (val.match(/^https?:\/\/.+/)) fetchMetadata(val)
    else {
      setMetadata(null)
      setError(null)
    }
  }

  const handleSave = () => {
    if (!canSave) return
    onSave({
      id: Date.now().toString(),
      url,
      title: metadata?.title || url,
      image: metadata?.image || null,
      publisher: metadata?.publisher || null,
      description: metadata?.description || '',
      category,
      addedAt: new Date().toISOString(),
    })
  }

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
          <div className="title-bold" style={{ fontSize: '17px', color: COLORS.cream }}>Add to wishlist</div>
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
            Paste a product link
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: COLORS.cream, cursor: 'pointer', padding: '5px' }}>
          <XIcon size={18} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <FieldLabel required>Product URL</FieldLabel>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <input
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://taylorstitch.com/products/..."
            style={{
              width: '100%',
              padding: '12px 14px 12px 38px',
              borderRadius: '6px',
              border: `1px solid ${COLORS.greenLine}`,
              background: COLORS.white,
              fontFamily: FONTS.sub,
              fontSize: '13px',
              color: COLORS.text,
              outline: 'none',
            }}
          />
          <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: COLORS.textFaint }}>
            <LinkIcon size={15} />
          </div>
        </div>

        {fetching && (
          <div
            className="tile"
            style={{ padding: '20px', textAlign: 'center', color: COLORS.textFaint, fontSize: '12px', fontStyle: 'italic', marginBottom: '14px' }}
          >
            Reading the link…
          </div>
        )}

        {error && !fetching && (
          <div
            style={{
              padding: '12px 14px',
              background: 'rgba(140, 58, 46, 0.08)',
              borderRadius: '6px',
              border: '1px solid rgba(140, 58, 46, 0.2)',
              color: COLORS.danger,
              fontFamily: FONTS.sub,
              fontSize: '12px',
              marginBottom: '14px',
            }}
          >
            {error}
          </div>
        )}

        {metadata && !fetching && (
          <div className="tile" style={{ padding: '12px', marginBottom: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {metadata.image && (
              <img
                src={metadata.image}
                alt=""
                style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              {metadata.publisher && (
                <div
                  style={{
                    fontFamily: FONTS.sub,
                    fontSize: '9.5px',
                    color: COLORS.textMuted,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontWeight: 600,
                  }}
                >
                  {metadata.publisher}
                </div>
              )}
              <div
                className="title-bold"
                style={{
                  fontSize: '14px',
                  color: COLORS.text,
                  lineHeight: 1.2,
                  marginTop: '3px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {metadata.title}
              </div>
            </div>
          </div>
        )}

        <FieldLabel required>Category</FieldLabel>
        <button
          onClick={() => setCategoryOpen((v) => !v)}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: '6px',
            border: `1px solid ${categoryOpen ? COLORS.green : COLORS.greenLine}`,
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
          <span>{category || 'Pick a category'}</span>
          {categoryOpen ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
        </button>

        {categoryOpen && (
          <div className="tile" style={{ padding: 0, overflow: 'hidden', marginTop: '8px' }}>
            {SHOPPING_CATEGORIES.map((c) => (
              <PickerRow key={c} uppercase onClick={() => { setCategory(c); setCategoryOpen(false); }}>
                {c}
              </PickerRow>
            ))}
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
          Save
        </button>
      </div>
    </AnchoredDropdown>
  )
}
