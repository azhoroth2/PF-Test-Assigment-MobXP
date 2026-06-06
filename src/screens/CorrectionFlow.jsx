import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AnomalyChip from '../components/AnomalyChip'
import ConfidenceBar from '../components/ConfidenceBar'
import StickyActions from '../components/StickyActions'
import { workers } from '../data/workers'

const HIGH_THRESHOLD = 85

export default function CorrectionFlow() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const demoParam = searchParams.get('demo') || 'bulk'

  const isOffline = demoParam === 'offline'

  const highConf = workers.filter((w) => w.confidence >= HIGH_THRESHOLD)
  const lowConf = workers.filter((w) => w.confidence < HIGH_THRESHOLD)
  const highConfIds = highConf.map((w) => w.id)

  const initApproved = (demoParam === 'undo' || demoParam === 'manual') ? highConfIds : []

  const [approved, setApproved] = useState(initApproved)
  const [expanded, setExpanded] = useState(false)
  const [undoState, setUndoState] = useState(
    demoParam === 'undo' ? { count: highConf.length, prevApproved: [] } : null
  )
  const undoTimerRef = useRef(null)

  useEffect(() => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current)
    if (demoParam === 'undo') {
      setApproved(highConfIds)
      setUndoState({ count: highConf.length, prevApproved: [] })
      undoTimerRef.current = setTimeout(() => setUndoState(null), 5000)
    } else if (demoParam === 'manual') {
      setApproved(highConfIds)
      setUndoState(null)
    } else {
      setApproved([])
      setUndoState(null)
    }
    setExpanded(false)
  }, [demoParam])

  useEffect(() => {
    return () => { if (undoTimerRef.current) clearTimeout(undoTimerRef.current) }
  }, [])

  const pendingHigh = highConf.filter((w) => !approved.includes(w.id))
  const pendingLow = lowConf.filter((w) => !approved.includes(w.id))
  const allDone = pendingHigh.length === 0 && pendingLow.length === 0

  function bulkApprove() {
    const ids = pendingHigh.map((w) => w.id)
    const prevApproved = [...approved]
    const newApproved = [...approved, ...ids]
    setApproved(newApproved)
    setUndoState({ count: ids.length, prevApproved })
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current)
    undoTimerRef.current = setTimeout(() => setUndoState(null), 5000)
    const stillLow = lowConf.filter((w) => !newApproved.includes(w.id))
    if (!isOffline && stillLow.length === 0) {
      navigate('/confirm', { state: { total: workers.length, submitted: workers.length } })
    }
  }

  function handleUndo() {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current)
    setApproved(undoState.prevApproved)
    setUndoState(null)
  }

  const primaryLabel = isOffline
    ? 'Saved — will send when online'
    : pendingHigh.length > 0
    ? `Approve ${pendingHigh.length}`
    : 'Review remaining'

  const primaryAction = isOffline
    ? () => {}
    : pendingHigh.length > 0
    ? bulkApprove
    : () => navigate(`/correction/${pendingLow[0]?.id}`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, animation: 'screenEnter 220ms cubic-bezier(0.25, 1, 0.5, 1) both' }}>
      {/* Header */}
      <div style={{ padding: '28px 20px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => navigate('/')}
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
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
            Corrections
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Line A · 3 workers</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* M5 — offline banner */}
        {isOffline && (
          <div style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: 10,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 15, color: 'var(--text-secondary)', flexShrink: 0 }}>⚠</span>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, fontWeight: 500 }}>
              Offline — changes will sync when you reconnect.
            </p>
            <span style={{
              marginLeft: 'auto',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              fontSize: 11,
              color: 'var(--text-primary)',
              padding: '2px 8px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>1 pending</span>
          </div>
        )}

        {/* High-confidence group */}
        {pendingHigh.length > 0 && (
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            <div
              style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => setExpanded((e) => !e)}
            >
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                  Ready to approve · high confidence
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  {pendingHigh.length} worker{pendingHigh.length !== 1 ? 's' : ''} · AI matched to shift schedule
                </p>
              </div>
              <span style={{
                fontSize: 18,
                color: 'var(--text-muted)',
                transform: expanded ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.15s ease',
                display: 'inline-block',
              }}>›</span>
            </div>

            {expanded && (
              <div style={{ borderTop: '1px solid var(--border)', animation: 'fadeSlideDown 200ms cubic-bezier(0.25, 1, 0.5, 1) both' }}>
                {pendingHigh.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => navigate(`/correction/${w.id}`, { state: { from: 'batch' } })}
                    style={{
                      padding: '14px 18px',
                      borderBottom: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      gap: 12,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {w.name}
                      </p>
                      {/* V1: no truncation on subtitle so time always shows */}
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                        suggested {w.suggestedTime}
                      </p>
                    </div>
                    <div style={{ flexShrink: 0, width: 90 }}>
                      <ConfidenceBar score={w.confidence} compact />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Approved high-conf notice */}
        {approved.length > 0 && pendingHigh.length === 0 && highConf.length > 0 && (
          <div style={{
            background: '#e6f9ee',
            borderRadius: 'var(--radius-card)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            animation: 'fadeIn 200ms cubic-bezier(0.25, 1, 0.5, 1) both',
          }}>
            <span style={{ fontSize: 20, color: 'var(--accent)' }}>✓</span>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>{highConf.length} approved</p>
          </div>
        )}

        {/* Low-confidence group */}
        {pendingLow.length > 0 && (
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>
              Needs your check · {pendingLow.length} worker{pendingLow.length !== 1 ? 's' : ''}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pendingLow.map((w) => (
                <div
                  key={w.id}
                  onClick={() => navigate(`/correction/${w.id}`, { state: { from: 'batch' } })}
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
              ))}
            </div>
          </div>
        )}

        {allDone && (
          <div style={{ background: '#e6f9ee', borderRadius: 'var(--radius-card)', padding: '20px 18px', textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent)' }}>All corrections reviewed ✓</p>
          </div>
        )}
      </div>

      {/* D4 — undo chip */}
      {undoState && (
        <div style={{ padding: '0 20px 12px', animation: 'fadeIn 200ms cubic-bezier(0.25, 1, 0.5, 1) both' }}>
          <div style={{
            background: '#e6f9ee',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>Approved {undoState.count}</p>
            <button
              onClick={handleUndo}
              style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', background: 'none', padding: '4px 8px' }}
            >
              Undo
            </button>
          </div>
        </div>
      )}

      {!allDone && (
        <StickyActions primary={{ label: primaryLabel, onClick: primaryAction }} />
      )}
      {allDone && (
        <StickyActions
          primary={{
            label: isOffline ? 'Saved — will send when online' : 'Submit all',
            onClick: () => !isOffline && navigate('/confirm', { state: { total: workers.length, submitted: workers.length } }),
          }}
        />
      )}
    </div>
  )
}
