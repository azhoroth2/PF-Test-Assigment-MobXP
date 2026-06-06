import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AnomalyChip from '../components/AnomalyChip'
import StickyActions from '../components/StickyActions'
import { workers as allWorkers } from '../data/workers'

const STATES = ['default', 'single', 'empty', 'offline', 'multi-line']

const lineB = [
  { id: 4, name: 'Anna P.', role: 'Assembly B', shift: '08:00–16:00', anomaly: 'Missing clock-out' },
  { id: 5, name: 'Tom B.', role: 'Assembly B', shift: '08:00–16:00', anomaly: 'Odd duration' },
]

export default function ShiftSummary() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const demoParam = searchParams.get('demo')
  const demoState = STATES.includes(demoParam) ? demoParam : 'default'

  const [allNotified, setAllNotified] = useState(false)

  const isOffline = demoState === 'offline'
  const isMultiLine = demoState === 'multi-line'

  const lineAWorkers =
    demoState === 'empty' ? [] :
    demoState === 'single' ? [allWorkers[2]] :
    allWorkers

  const lineBWorkers = isMultiLine ? lineB : []

  const count = isMultiLine
    ? lineAWorkers.length + lineBWorkers.length
    : lineAWorkers.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, animation: 'screenEnter 220ms cubic-bezier(0.25, 1, 0.5, 1) both' }}>
      {/* Header */}
      <div style={{ padding: '28px 20px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            color: 'var(--text-secondary)',
            fontSize: 22,
            lineHeight: 1,
            minHeight: 56,
            display: 'flex',
            alignItems: 'center',
            padding: '0',
          }}
        >
          ‹
        </button>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            Shift summary
          </h1>
          <p data-annotation-id="shift.timestamp" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            {isMultiLine ? 'Lines A & B' : 'Line A'} · ended 16:00 · reviewed 16:30
          </p>
        </div>
      </div>

      {count === 0 ? (
        <div
          data-annotation-id="shift.empty-state"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 32px',
            textAlign: 'center',
            gap: 16,
          }}
        >
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(0,185,80,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            animation: 'scaleIn 300ms cubic-bezier(0.25, 1, 0.5, 1) 80ms both',
          }}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M6 16L13 23L26 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--accent)',
            animation: 'screenEnter 280ms cubic-bezier(0.25, 1, 0.5, 1) 160ms both',
          }}>
            All clear
          </h2>
          <p style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 260,
            animation: 'fadeIn 260ms cubic-bezier(0.25, 1, 0.5, 1) 240ms both',
          }}>
            21 workers clocked out cleanly. No corrections needed.
          </p>
        </div>
      ) : (
        <>
          <div style={{ flex: 1, padding: '0 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* A1 — offline banner */}
            {isOffline && (
              <div
                data-annotation-id="shift.offline-banner"
                style={{
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  animation: 'fadeIn 200ms cubic-bezier(0.25, 1, 0.5, 1) both',
                }}
              >
                <span style={{ fontSize: 15, color: 'var(--text-secondary)', flexShrink: 0 }}>⚠</span>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, fontWeight: 500 }}>
                  Showing last sync · 16:30. You can still review.
                </p>
              </div>
            )}

            {/* Summary band */}
            <div
              data-annotation-id="shift.multiline-count"
              style={{ background: 'var(--surface)', borderRadius: 'var(--radius-card)', padding: 18 }}
            >
              <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                {count} issue{count !== 1 ? 's' : ''} found
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                {21 - count} clocked out cleanly ✓
              </p>
            </div>

            {/* Notify all */}
            {allNotified ? (
              <div style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-card)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                animation: 'fadeSlideDown 200ms cubic-bezier(0.25, 1, 0.5, 1) both',
              }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>⏳</span>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>
                Waiting on {count} workers
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', flexShrink: 0 }}>
                Sent {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </p>
              </div>
            ) : (
              <button
                onClick={() => setAllNotified(true)}
                style={{
                  width: '100%',
                  minHeight: 52,
                  borderRadius: 'var(--radius-card)',
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M14 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3.5L8 15l2.5-3H14a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                Notify all {count} workers
              </button>
            )}

            {/* Multi-line: Line A group */}
            {isMultiLine && lineAWorkers.length > 0 && (
              <WorkerGroup
                label="Line A"
                workers={lineAWorkers}
                firstAnnotationId="shift.worker-card"
                firstChipAnnotationId="shift.anomaly-chip"
                onTap={(w) => navigate(`/correction/${w.id}`, { state: { from: 'list' } })}
              />
            )}

            {/* Multi-line: Line B group */}
            {isMultiLine && lineBWorkers.length > 0 && (
              <WorkerGroup
                label="Line B"
                workers={lineBWorkers}
                firstAnnotationId="shift.lineb-worker"
                onTap={() => {}}
              />
            )}

            {/* Single-line: flat list */}
            {!isMultiLine && lineAWorkers.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {lineAWorkers.map((w, i) => (
                  <WorkerRow
                    key={w.id}
                    worker={w}
                    annotationId={i === 0 ? 'shift.worker-card' : undefined}
                    chipAnnotationId={i === 0 ? 'shift.anomaly-chip' : undefined}
                    onTap={() => navigate(`/correction/${w.id}`, { state: { from: 'list' } })}
                  />
                ))}
              </div>
            )}
          </div>

          <StickyActions
            data-annotation-id="shift.review-cta"
            primary={{
              label: `Review ${count} correction${count !== 1 ? 's' : ''}`,
              onClick: () => navigate('/corrections'),
            }}
          />
        </>
      )}
    </div>
  )
}

function WorkerGroup({ label, workers, firstAnnotationId, firstChipAnnotationId, onTap }) {
  return (
    <div>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
        {label} · {workers.length} worker{workers.length !== 1 ? 's' : ''}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {workers.map((w, i) => (
          <WorkerRow
            key={w.id}
            worker={w}
            annotationId={i === 0 ? firstAnnotationId : undefined}
            chipAnnotationId={i === 0 ? firstChipAnnotationId : undefined}
            onTap={() => onTap(w)}
          />
        ))}
      </div>
    </div>
  )
}

function WorkerRow({ worker: w, onTap, annotationId, chipAnnotationId }) {
  return (
    <div
      data-annotation-id={annotationId}
      onClick={onTap}
      style={{
        background: 'var(--bg)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        padding: '16px 18px',
        minHeight: 72,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-card)',
        gap: 12,
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {w.name}
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {w.role} · {w.shift}
        </p>
        <AnomalyChip label={w.anomaly} annotationId={chipAnnotationId} />
      </div>
      <span style={{ fontSize: 20, color: 'var(--text-muted)', flexShrink: 0, lineHeight: 1, alignSelf: 'center' }}>›</span>
    </div>
  )
}
