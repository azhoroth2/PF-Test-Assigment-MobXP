import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './tokens.css'
import ShiftSummary from './screens/ShiftSummary'
import CorrectionFlow from './screens/CorrectionFlow'
import PerWorkerCard from './screens/PerWorkerCard'
import Confirmation from './screens/Confirmation'
import Flowchart from './components/Flowchart'
import HrRequest from './screens/HrRequest'

const PHONE_W = 390
const PHONE_H = 844

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px 0',
      }}
    >
      <span style={{ fontSize: 13, color: 'var(--text-muted)', userSelect: 'none' }}>
        {dark ? '☾' : '☀'}
      </span>
      <div style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        background: dark ? 'var(--accent)' : 'var(--page-sidebar-border)',
        position: 'relative',
        transition: 'background 220ms cubic-bezier(0.25, 1, 0.5, 1)',
        flexShrink: 0,
      }}>
        <div style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#ffffff',
          position: 'absolute',
          top: 2,
          left: dark ? 20 : 2,
          transition: 'left 220ms cubic-bezier(0.25, 1, 0.5, 1)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
        }} />
      </div>
    </button>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (dark) {
      document.documentElement.dataset.theme = 'dark'
    } else {
      delete document.documentElement.dataset.theme
    }
  }, [dark])

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--page-bg)' }}>
        {/* Webpage nav bar */}
        <div style={{
          height: 52,
          background: 'var(--page-nav-bg)',
          borderBottom: '1px solid var(--page-nav-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--page-nav-text)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Foreman Prototype
          </span>
          <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
        </div>

        {/* Main content */}
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
            <div style={{
              flex: 1,
              margin: '32px',
              borderRadius: 16,
              background: 'var(--page-phone-area-bg)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div style={{
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
              }}>
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
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto',
                  position: 'relative',
                  background: 'var(--bg)',
                }}>
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
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
