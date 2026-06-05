import { useNavigate, useSearchParams } from 'react-router-dom'
import AnomalyChip from '../components/AnomalyChip'
import StickyActions from '../components/StickyActions'
import { workers as allWorkers } from '../data/workers'

const STATES = ['default', 'single', 'empty']

export default function ShiftSummary() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const demoParam = searchParams.get('demo')
  const demoState = STATES.includes(demoParam) ? demoParam : 'default'

  const workers =
    demoState === 'empty' ? [] :
    demoState === 'single' ? [allWorkers[2]] :
    allWorkers

  const count = workers.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header */}
      <div style={{ padding: '28px 20px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
          Shift summary
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Line A · ended 16:00 · reviewed 16:30
        </p>
      </div>

      <div style={{ flex: 1, padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Summary band */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-card)',
          padding: 18,
        }}>
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

        {/* Flagged list */}
        {workers.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {workers.map((w) => (
              <div
                key={w.id}
                onClick={() => navigate(`/correction/${w.id}`, { state: { from: 'list' } })}
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
                <div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {w.name}
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                    {w.role} · {w.shift}
                  </p>
                </div>
                <AnomalyChip label={w.anomaly} />
              </div>
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
