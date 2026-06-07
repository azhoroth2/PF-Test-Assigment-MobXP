import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './tokens.css'
import { AnnotationProvider } from './contexts/AnnotationContext'
import { PresentationProvider } from './contexts/PresentationContext'
import SlideIndicator from './components/SlideIndicator'
import SlideContainer from './components/SlideContainer'

// ─── Slide imports ────────────────────────────────────────────────────────────
import CoverSlide from './slides/CoverSlide'
import MarketRealitySlide from './slides/MarketRealitySlide'
import CompetitiveGlobalSlide from './slides/CompetitiveGlobalSlide'
import CompetitiveLocalSlide from './slides/CompetitiveLocalSlide'
import GtmOptionsSlide from './slides/GtmOptionsSlide'
import GtmStagedSlide from './slides/GtmStagedSlide'
import PainMatrixSlide from './slides/PainMatrixSlide'
import ProblemSelectionSlide from './slides/ProblemSelectionSlide'
import CoreInsightSlide from './slides/CoreInsightSlide'
import TwoUsersSlide from './slides/TwoUsersSlide'
import SolutionArchSlide from './slides/SolutionArchSlide'
import FlowBlockersSlide from './slides/FlowBlockersSlide'
import InteractivePrototypeOverviewSlide from './slides/InteractivePrototypeOverviewSlide'
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
  { id: 'cover',              label: 'Cover',            component: CoverSlide },
  { id: 'market',             label: 'Market',           component: MarketRealitySlide },
  { id: 'comp-global',        label: 'Global',           component: CompetitiveGlobalSlide },
  { id: 'comp-local',         label: 'Local',            component: CompetitiveLocalSlide },
  { id: 'gtm-options',        label: 'GTM Options',      component: GtmOptionsSlide },
  { id: 'gtm-staged',         label: 'GTM Stages',       component: GtmStagedSlide },
  { id: 'pain-matrix',        label: 'Pain Matrix',      component: PainMatrixSlide },
  { id: 'problem-selection',  label: 'Selection',        component: ProblemSelectionSlide },
  { id: 'core-insight',       label: 'Core Insight',     component: CoreInsightSlide },
  { id: 'two-users',          label: 'Users',            component: TwoUsersSlide },
  { id: 'solution-arch',      label: 'Architecture',     component: SolutionArchSlide },
  { id: 'flow-blockers',      label: 'Blockers',         component: FlowBlockersSlide },
  { id: 'prototype-overview', label: 'Screens',          component: InteractivePrototypeOverviewSlide },
  { id: 'prototype',          label: 'Prototype',        component: PrototypeSlide },
  { id: 'ai-arch',            label: 'AI',               component: AiArchitectureSlide },
  { id: 'validation',         label: 'Validation',       component: ValidationPlanSlide },
  { id: 'ai-reflection',      label: 'Reflection',       component: AiReflectionSlide },
  { id: 'roadmap',            label: 'Roadmap',          component: RoadmapSlide },
]

// ─── App ──────────────────────────────────────────────────────────────────────
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
              gridTemplateColumns: '1fr auto 1fr',
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
                PeopleForce · MobXP
              </span>

              {/* Center — slide indicator */}
              <SlideIndicator />

              {/* Right — theme toggle */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
              </div>
            </div>

            {/* ── Slide content ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <SlideContainer />
            </div>

          </div>
        </PresentationProvider>
      </BrowserRouter>
    </AnnotationProvider>
  )
}
