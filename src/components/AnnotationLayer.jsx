import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { annotations } from '../data/annotations'
import { useAnnotations } from '../contexts/AnnotationContext'

const CARD_WIDTH = 224
const PIN_R = 11
const GUTTER = 28

const TAG_COLORS_LIGHT = {
  'V':         { bg: '#dbeafe', color: '#1d4ed8' },
  'AI':        { bg: '#dcfce7', color: '#15803d' },
  'Logic fix': { bg: '#fee2e2', color: '#b91c1c' },
  'Logic':     { bg: '#fef9c3', color: '#a16207' },
  'edge':      { bg: '#f3e8ff', color: '#7e22ce' },
  'Blocker':   { bg: '#ffe4e6', color: '#be123c' },
  'default':   { bg: '#f1f5f9', color: '#475569' },
}

const TAG_COLORS_DARK = {
  'V':         { bg: '#1e3a5f', color: '#93c5fd' },
  'AI':        { bg: '#052e16', color: '#86efac' },
  'Logic fix': { bg: '#450a0a', color: '#fca5a5' },
  'Logic':     { bg: '#451a03', color: '#fcd34d' },
  'edge':      { bg: '#2e1065', color: '#d8b4fe' },
  'Blocker':   { bg: '#4c0519', color: '#fda4af' },
  'default':   { bg: '#1e293b', color: '#94a3b8' },
}

function tagColor(tag, dark) {
  const MAP = dark ? TAG_COLORS_DARK : TAG_COLORS_LIGHT
  if (!tag) return MAP.default
  if (tag.startsWith('V')) return MAP['V']
  if (tag.startsWith('AI')) return MAP['AI']
  if (tag.includes('Logic fix')) return MAP['Logic fix']
  if (tag.includes('Logic')) return MAP['Logic']
  if (tag.startsWith('edge')) return MAP['edge']
  if (tag.startsWith('Blocker')) return MAP['Blocker']
  return MAP.default
}

function screenMatches(ann, pathname) {
  if (ann.screen === pathname) return true
  if (ann.screen === '/correction/' && pathname.startsWith('/correction/')) return true
  return false
}

function demoMatches(ann, demo) {
  if (ann.demoExclude === demo) return false
  if (ann.demoMatch === 'any') return true
  if (ann.demoMatch === demo) return true
  return false
}

function useDarkMode() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  useEffect(() => {
    const mo = new MutationObserver(() => {
      setDark(document.documentElement.dataset.theme === 'dark')
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  return dark
}

export default function AnnotationLayer({ containerRef, phoneRef }) {
  const { showAnnotations } = useAnnotations()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const demo = searchParams.get('demo') || ''
  const dark = useDarkMode()

  const [positions, setPositions] = useState([])
  const [activeId, setActiveId] = useState(null)
  const rafRef = useRef(null)

  const measure = useCallback(() => {
    if (!showAnnotations || !containerRef.current || !phoneRef.current) {
      setPositions([])
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const phoneRect = phoneRef.current.getBoundingClientRect()
    const phoneTop = phoneRect.top - containerRect.top
    const phoneBottom = phoneRect.bottom - containerRect.top

    const relevant = annotations.filter(
      (a) => screenMatches(a, location.pathname) && demoMatches(a, demo)
    )

    const measured = []
    const seenAnchors = new Map()

    for (const ann of relevant) {
      const el = document.querySelector(`[data-annotation-id="${ann.anchor}"]`)
      if (!el) continue

      const rect = el.getBoundingClientRect()
      if (rect.bottom < phoneRect.top || rect.top > phoneRect.bottom) continue
      if (rect.width === 0 && rect.height === 0) continue

      // Pin: right edge of element, clamped to phone vertical bounds
      let pinX = rect.right - containerRect.left + 4
      let pinY = (rect.top + rect.bottom) / 2 - containerRect.top
      pinY = Math.max(phoneTop + PIN_R, Math.min(phoneBottom - PIN_R, pinY))

      const dupCount = seenAnchors.get(ann.anchor) || 0
      seenAnchors.set(ann.anchor, dupCount + 1)
      pinY += dupCount * (PIN_R * 2 + 4)

      measured.push({ ann, pinX, pinY })
    }

    measured.sort((a, b) => a.pinY - b.pinY)
    const numbered = measured.map((m, i) => ({ ...m, number: i + 1 }))

    // Cards always in right gutter (never overlapping phone)
    const cardX = phoneRect.right - containerRect.left + GUTTER

    const positioned = numbered.map((m) => {
      const charsPerLine = Math.floor(CARD_WIDTH / 7)
      const lines = Math.ceil(m.ann.text.length / charsPerLine) + 2
      const cardHeight = Math.max(80, lines * 18 + 36)
      // Vertically center card on pin, clamp within phone vertical bounds
      const cardY = Math.max(phoneTop + 8, Math.min(phoneBottom - cardHeight - 8, m.pinY - cardHeight / 2))
      return { ...m, cardX, cardY, cardHeight }
    })

    setPositions(positioned)
  }, [showAnnotations, location.pathname, demo, containerRef, phoneRef])

  useEffect(() => {
    if (!showAnnotations) { setPositions([]); return }
    const id = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(measure)
    })
    return () => { cancelAnimationFrame(id); cancelAnimationFrame(rafRef.current) }
  }, [showAnnotations, location.pathname, demo, measure])

  useEffect(() => {
    if (!showAnnotations) return
    const scrollEl = document.getElementById('phone-scroll-area')
    if (!scrollEl) return
    scrollEl.addEventListener('scroll', measure, { passive: true })
    return () => scrollEl.removeEventListener('scroll', measure)
  }, [showAnnotations, measure])

  useEffect(() => {
    if (!showAnnotations || !containerRef.current) return
    const ro = new ResizeObserver(() => {
      rafRef.current = requestAnimationFrame(measure)
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [showAnnotations, containerRef, measure])

  useEffect(() => {
    if (!showAnnotations) return
    const scrollEl = document.getElementById('phone-scroll-area')
    if (!scrollEl) return
    const mo = new MutationObserver(() => {
      rafRef.current = requestAnimationFrame(measure)
    })
    mo.observe(scrollEl, { childList: true, subtree: true, attributes: false })
    return () => mo.disconnect()
  }, [showAnnotations, measure])

  if (!showAnnotations || positions.length === 0) return null

  const cardBg     = dark ? '#1e1b4b' : '#f5f3ff'
  const cardBorder = dark ? '#818cf8' : '#4f46e5'
  const cardText   = dark ? '#c7d2fe' : '#334155'
  const cardShadow = dark
    ? '0 4px 16px rgba(79,70,229,0.35), 0 1px 4px rgba(0,0,0,0.4)'
    : '0 4px 16px rgba(79,70,229,0.18), 0 1px 4px rgba(0,0,0,0.08)'

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'visible',
      }}
    >
      {/* Pins */}
      {positions.map(({ ann, number, pinX, pinY }) => {
        const isActive = activeId === ann.id
        return (
          <div
            key={ann.id}
            onMouseEnter={() => setActiveId(ann.id)}
            onMouseLeave={() => setActiveId(null)}
            style={{
              position: 'absolute',
              left: pinX,
              top: pinY - PIN_R,
              width: PIN_R * 2,
              height: PIN_R * 2,
              borderRadius: '50%',
              background: '#4f46e5',
              color: '#fff',
              fontSize: 9,
              fontWeight: 700,
              fontFamily: 'system-ui, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isActive
                ? '0 0 0 3px rgba(79,70,229,0.3), 0 2px 8px rgba(79,70,229,0.4)'
                : '0 1px 4px rgba(0,0,0,0.25)',
              cursor: 'pointer',
              pointerEvents: 'auto',
              zIndex: 62,
              transition: 'box-shadow 140ms ease',
              userSelect: 'none',
              letterSpacing: -0.3,
            }}
          >
            {number}
          </div>
        )
      })}

      {/* Cards — right gutter, hidden until pin hovered */}
      {positions.map(({ ann, number, cardX, cardY }) => {
        const isActive = activeId === ann.id
        const tc = tagColor(ann.tag, dark)
        return (
          <div
            key={ann.id}
            onMouseEnter={() => setActiveId(ann.id)}
            onMouseLeave={() => setActiveId(null)}
            style={{
              position: 'absolute',
              left: cardX,
              top: cardY,
              width: CARD_WIDTH,
              background: cardBg,
              border: `1.5px solid ${cardBorder}`,
              borderRadius: 8,
              padding: '9px 11px 10px',
              boxShadow: cardShadow,
              pointerEvents: isActive ? 'auto' : 'none',
              cursor: 'default',
              zIndex: 65,
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 140ms ease, transform 140ms ease',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: '#4f46e5',
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  letterSpacing: -0.3,
                }}
              >
                {number}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: tc.color,
                  background: tc.bg,
                  padding: '1px 6px',
                  borderRadius: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: CARD_WIDTH - 44,
                }}
              >
                {ann.tag}
              </span>
            </div>
            <p style={{ fontSize: 11.5, lineHeight: 1.55, color: cardText, margin: 0 }}>
              {ann.text}
            </p>
          </div>
        )
      })}
    </div>
  )
}
