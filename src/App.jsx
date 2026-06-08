import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './tokens.css'
import { AnnotationProvider } from './contexts/AnnotationContext'
import { PresentationProvider } from './contexts/PresentationContext'
import SlideIndicator from './components/SlideIndicator'
import SlideContainer from './components/SlideContainer'

// ─── Slide imports ────────────────────────────────────────────────────────────
import CoverSlide from './slides/CoverSlide'
import AgendaSlide from './slides/AgendaSlide'
import MarketRealitySlide from './slides/MarketRealitySlide'
import CompetitiveGlobalSlide from './slides/CompetitiveGlobalSlide'
import CompetitiveLocalSlide from './slides/CompetitiveLocalSlide'
import VerdictSlide from './slides/VerdictSlide'
import GtmOptionsSlide from './slides/GtmOptionsSlide'
import GtmStagedSlide from './slides/GtmStagedSlide'
import PainMatrixSlide from './slides/PainMatrixSlide'
import ProblemSelectionSlide from './slides/ProblemSelectionSlide'
import CoreInsightSlide from './slides/CoreInsightSlide'
import TwoUsersSlide from './slides/TwoUsersSlide'
import SolutionArchSlide from './slides/SolutionArchSlide'
import FlowBlockersSlide from './slides/FlowBlockersSlide'
import PrototypeSlide from './slides/PrototypeSlide'
import AiArchitectureSlide from './slides/AiArchitectureSlide'
import ValidationPlanSlide from './slides/ValidationPlanSlide'
import AiReflectionSlide from './slides/AiReflectionSlide'
import RoadmapSlide from './slides/RoadmapSlide'

// ─── Theme toggle ─────────────────────────────────────────────────────────────
function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px 0',
        flexShrink: 0,
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

// ─── Slide registry ───────────────────────────────────────────────────────────
const SLIDES = [
  { id: 'cover',              label: 'Blue colar segment solution exploration', component: CoverSlide },
  { id: 'agenda',             label: 'Agenda',           component: AgendaSlide },
  { id: 'market',             label: 'Market Reality',   component: MarketRealitySlide },
  { id: 'comp-global',        label: 'Global Players',   component: CompetitiveGlobalSlide },
  { id: 'comp-local',         label: 'Local Incumbents', component: CompetitiveLocalSlide },
  { id: 'verdict',            label: 'Should PF Enter Blue-Collar?', component: VerdictSlide },
  { id: 'gtm-options',        label: 'Three Options',      component: GtmOptionsSlide },
  { id: 'gtm-staged',         label: 'Design-Partner Stages',       component: GtmStagedSlide },
  { id: 'two-users',          label: 'All Users — Who, When, Why',         component: TwoUsersSlide },
  { id: 'pain-matrix',        label: 'Pain Matrix',      component: PainMatrixSlide },
  { id: 'problem-selection',  label: 'Why This, Not That',        component: ProblemSelectionSlide },
  { id: 'core-insight',       label: 'Key Hypotheses',   component: CoreInsightSlide },
  { id: 'flow-blockers',      label: 'Flowchart',         component: FlowBlockersSlide },
  { id: 'solution-arch',      label: 'Solution',         component: SolutionArchSlide },
  { id: 'prototype',          label: 'Correction Flow Prototype',        component: PrototypeSlide },
  { id: 'ai-arch',            label: 'AI Architecture — Where Yes, Where No',               component: AiArchitectureSlide },
  { id: 'validation',         label: 'Validation Plan',       component: ValidationPlanSlide },
  { id: 'ai-reflection',      label: 'AI Workflow Reflection',       component: AiReflectionSlide },
  { id: 'roadmap',            label: 'What\'s Next — Phase Roadmap',          component: RoadmapSlide },
]

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (dark) {
      document.documentElement.dataset.theme = 'dark'
    } else {
      delete document.documentElement.dataset.theme
    }
  }, [dark])

  if (isMobile) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--page-bg)',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: 48, marginBottom: 24 }}>🖥️</span>
        <h1 style={{
          fontSize: 24,
          fontWeight: 800,
          color: 'var(--page-nav-text)',
          marginBottom: 12,
          letterSpacing: '-0.5px'
        }}>
          Please Use Desktop
        </h1>
        <p style={{
          fontSize: 16,
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          maxWidth: 320,
          margin: 0
        }}>
          For the best experience and to interact with the prototypes, please open this link on a desktop computer.
        </p>
      </div>
    )
  }

  return (
    <AnnotationProvider>
      <BrowserRouter>
        <PresentationProvider slides={SLIDES}>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--page-bg)' }}>

            {/* ── Top nav bar ── */}
            <div style={{
              height: 52,
              background: 'var(--page-nav-bg)',
              borderBottom: '1px solid var(--page-nav-border)',
              display: 'grid',
              gridTemplateColumns: '1fr minmax(0, auto) 1fr',
              alignItems: 'center',
              padding: '0 24px',
              flexShrink: 0,
              position: 'sticky',
              top: 0,
              zIndex: 100,
            }}>
              {/* Left — branding */}
              <span style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--page-nav-text)',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                opacity: 0.5,
              }}>
                Test-Assignment - Stanislav Stefaniuk
              </span>

              {/* Center — slide indicator */}
              <SlideIndicator />

              {/* Right — theme toggle */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
              </div>
            </div>

            {/* ── Slide content ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
              <SlideContainer />
            </div>

          </div>
        </PresentationProvider>
      </BrowserRouter>
    </AnnotationProvider>
  )
}
