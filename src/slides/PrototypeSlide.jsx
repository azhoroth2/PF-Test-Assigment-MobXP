import { useRef, useState, useEffect } from 'react'
import { Routes, Route, useLocation, useMatch, useSearchParams } from 'react-router-dom'
import Flowchart, { NODES } from '../components/Flowchart'
import ShiftSummary from '../screens/ShiftSummary'
import CorrectionFlow from '../screens/CorrectionFlow'
import PerWorkerCard from '../screens/PerWorkerCard'
import Confirmation from '../screens/Confirmation'
import HrRequest from '../screens/HrRequest'
import AnnotationLayer from '../components/AnnotationLayer'
import { useAnnotations } from '../contexts/AnnotationContext'
import { workers } from '../data/workers'

const PHONE_W = 390
const PHONE_H = 844

function useDarkMode() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.dataset.theme === 'dark')
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

function useScreenName() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const workerMatch = useMatch('/correction/:workerId')
  const demo = searchParams.get('demo') || ''

  let phase = ''
  if (workerMatch) {
    const worker = workers.find((w) => w.id === Number(workerMatch.params.workerId))
    phase = worker ? worker.name : 'Worker'
  } else if (location.pathname === '/') phase = 'Shift Summary'
  else if (location.pathname === '/corrections') phase = 'Corrections'
  else if (location.pathname === '/confirm') phase = 'Confirmation'
  else if (location.pathname === '/hr-request') phase = 'HR Request'

  let step = ''
  outer: for (const node of NODES) {
    for (const row of node.rows) {
      for (const item of row.items) {
        if (item.active(location.pathname, demo)) { step = item.label; break outer }
      }
    }
  }

  if (!step || step === phase) return phase
  return `${phase} — ${step}`
}

function ScreenTitle() {
  const name = useScreenName()
  return (
    <div style={{
      position: 'absolute',
      top: 24,
      left: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.8 }}>
        Screen
      </span>
      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-secondary)' }}>
        {name}
      </span>
    </div>
  )
}

function AnnotationToggle() {
  const { showAnnotations, toggle } = useAnnotations()
  return (
    <label
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: 0.1 }}>
        Annotations
      </span>
      <div
        onClick={() => toggle(!showAnnotations)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: showAnnotations ? '#4f46e5' : 'var(--page-sidebar-border)',
          position: 'relative',
          transition: 'background 200ms cubic-bezier(0.25, 1, 0.5, 1)',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#ffffff',
          position: 'absolute',
          top: 2,
          left: showAnnotations ? 18 : 2,
          transition: 'left 200ms cubic-bezier(0.25, 1, 0.5, 1)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
        }} />
      </div>
    </label>
  )
}

function PhoneArea() {
  const dark = useDarkMode()
  const containerRef = useRef(null)
  const phoneRef = useRef(null)

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        margin: '32px',
        borderRadius: 16,
        background: 'var(--page-phone-area-bg)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <ScreenTitle />
      <AnnotationToggle />
      <AnnotationLayer containerRef={containerRef} phoneRef={phoneRef} />

      <div
        ref={phoneRef}
        style={{
          width: PHONE_W,
          height: PHONE_H,
          maxWidth: '100%',
          background: 'var(--bg)',
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: dark
            ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)'
            : '0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Status bar */}
        <div style={{
          height: 44,
          background: 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
          borderBottom: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--text-primary)' }}>●●● WiFi 🔋</span>
          </div>
        </div>

        {/* Scrollable screen area */}
        <div
          id="phone-scroll-area"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            position: 'relative',
            background: 'var(--bg)',
          }}
        >
          <Routes>
            <Route path="/" element={<ShiftSummary />} />
            <Route path="/corrections" element={<CorrectionFlow />} />
            <Route path="/correction/:workerId" element={<PerWorkerCard />} />
            <Route path="/confirm" element={<Confirmation />} />
            <Route path="/hr-request" element={<HrRequest />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default function PrototypeSlide() {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
      {/* Flowchart — sticky sidebar */}
      <div style={{
        position: 'sticky',
        top: 52,
        height: 'calc(100vh - 52px)',
        overflowY: 'auto',
        padding: '32px 16px 32px 32px',
        flexShrink: 0,
        background: 'var(--page-sidebar-bg)',
        borderRight: '1px solid var(--page-sidebar-border)',
      }}>
        <Flowchart />
      </div>

      {/* Phone area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
        <PhoneArea />
      </div>
    </div>
  )
}
