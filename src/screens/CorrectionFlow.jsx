import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnomalyChip from '../components/AnomalyChip'
import ConfidenceBar from '../components/ConfidenceBar'
import StickyActions from '../components/StickyActions'
import { workers } from '../data/workers'

const HIGH_THRESHOLD = 85

export default function CorrectionFlow() {
  const navigate = useNavigate()
  const [approved, setApproved] = useState([])
  const [expanded, setExpanded] = useState(false)

  const highConf = workers.filter((w) => w.confidence >= HIGH_THRESHOLD)
  const lowConf = workers.filter((w) => w.confidence < HIGH_THRESHOLD)
  const pendingHigh = highConf.filter((w) => !approved.includes(w.id))
  const pendingLow = lowConf.filter((w) => !approved.includes(w.id))
  const allDone = pendingHigh.length === 0 && pendingLow.length === 0

  function bulkApprove() {
    const ids = pendingHigh.map((w) => w.id)
    const newApproved = [...approved, ...ids]
    setApproved(newApproved)
    const stillLow = lowConf.filter((w) => !newApproved.includes(w.id))
    if (stillLow.length === 0) {
      navigate('/confirm', { state: { total: workers.length, submitted: workers.length } })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header */}
      <div style={{ padding: '28px 20px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            color: 'var(--text-secondary)',
            fontSize: 22,
            lineHeight: 1,
            padding: '4px 8px 4px 0',
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
        {/* High-confidence group */}
        {pendingHigh.length > 0 && (
          <div style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-card)',
            overflow: 'hidden',
          }}>
            <div
              style={{
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
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
              }}>
                ›
              </span>
            </div>

            {expanded && (
              <div style={{ borderTop: '1px solid var(--border)' }}>
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
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                        {w.name}
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                        {w.role} · suggested {w.suggestedTime}
                      </p>
                    </div>
                    <div style={{ minWidth: 100 }}>
                      <ConfidenceBar score={w.confidence} />
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
          }}>
            <span style={{ fontSize: 20, color: 'var(--accent)' }}>✓</span>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>
              {highConf.length} approved
            </p>
          </div>
        )}

        {/* Low-confidence group */}
        {pendingLow.length > 0 && (
          <div>
            <p style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 10,
            }}>
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
          </div>
        )}

        {allDone && (
          <div style={{
            background: '#e6f9ee',
            borderRadius: 'var(--radius-card)',
            padding: '20px 18px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent)' }}>All corrections reviewed ✓</p>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      {!allDone && (
        <StickyActions
          primary={
            pendingHigh.length > 0
              ? { label: `Approve ${pendingHigh.length}`, onClick: bulkApprove }
              : { label: 'Review remaining', onClick: () => navigate(`/correction/${pendingLow[0]?.id}`) }
          }
        />
      )}
      {allDone && (
        <StickyActions
          primary={{
            label: 'Submit all',
            onClick: () => navigate('/confirm', { state: { total: workers.length, submitted: workers.length } }),
          }}
        />
      )}
    </div>
  )
}
