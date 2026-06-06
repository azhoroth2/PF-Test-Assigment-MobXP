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
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            {isMultiLine ? 'Lines A & B' : 'Line A'} · ended 16:00 · reviewed 16:30
          </p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* A1 — offline banner */}
        {isOffline && (
          <div style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: 10,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            animation: 'fadeIn 200ms cubic-bezier(0.25, 1, 0.5, 1) both',
          }}>
            <span style={{ fontSize: 15, color: 'var(--text-secondary)', flexShrink: 0 }}>⚠</span>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, fontWeight: 500 }}>
              Showing last sync · 16:30. You can still review.
            </p>
          </div>
        )}

        {/* Summary band */}
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-card)', padding: 18 }}>
          {count === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 28 }}>✓</span>
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent)' }}>All clear</p>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>21 clocked out cleanly ✓</p>
              </div>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                {count} worker{count !== 1 ? 's' : ''} need{count === 1 ? 's' : ''} a clock-out
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                {21 - count} clocked out cleanly ✓
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
                Nothing else needs you tonight.
              </p>
            </>
          )}
        </div>

        {/* Empty state affirmation */}
        {count === 0 && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6, maxWidth: 220 }}>
              You're done for the day — nothing else needs you tonight.
            </p>
          </div>
        )}

        {/* Multi-line: Line A group */}
        {isMultiLine && lineAWorkers.length > 0 && (
          <WorkerGroup
            label="Line A"
            workers={lineAWorkers}
            onTap={(w) => navigate(`/correction/${w.id}`, { state: { from: 'list' } })}
          />
        )}

        {/* Multi-line: Line B group */}
        {isMultiLine && lineBWorkers.length > 0 && (
          <WorkerGroup
            label="Line B"
            workers={lineBWorkers}
            onTap={() => {}}
          />
        )}

        {/* Single-line: flat list */}
        {!isMultiLine && lineAWorkers.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lineAWorkers.map((w) => (
              <WorkerRow
                key={w.id}
                worker={w}
                onTap={() => navigate(`/correction/${w.id}`, { state: { from: 'list' } })}
              />
            ))}
          </div>
        )}
      </div>

      {count > 0 && (
        <StickyActions
          primary={{
            label: `Review ${count} correction${count !== 1 ? 's' : ''}`,
            onClick: () => navigate('/corrections'),
          }}
        />
      )}
    </div>
  )
}

function WorkerGroup({ label, workers, onTap }) {
  return (
    <div>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
        {label} · {workers.length} worker{workers.length !== 1 ? 's' : ''}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {workers.map((w) => (
          <WorkerRow key={w.id} worker={w} onTap={() => onTap(w)} />
        ))}
      </div>
    </div>
  )
}

function WorkerRow({ worker: w, onTap }) {
  return (
    <div
      onClick={onTap}
      style={{
        background: 'var(--bg)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        padding: '16px 18px',
        minHeight: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-card)',
        gap: 12,
      }}
    >
      <div style={{ minWidth: 0, overflow: 'hidden' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {w.name}
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {w.role} · {w.shift}
        </p>
      </div>
      <AnomalyChip label={w.anomaly} />
    </div>
  )
}
