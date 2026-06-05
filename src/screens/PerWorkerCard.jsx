import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom'
import ConfidenceBar from '../components/ConfidenceBar'
import ReasonPills from '../components/ReasonPills'
import TimeStepper from '../components/TimeStepper'
import StickyActions from '../components/StickyActions'
import { workers } from '../data/workers'

const DEMO_STATES = ['high-confidence', 'low-confidence', 'conflict', 'dispute', 'ai-unavailable', 'full-conflict']

function getDefaultReason(worker, demoState) {
  if (demoState === 'dispute' || demoState === 'full-conflict') return 'Dispute – follow up'
  if (worker.confidence >= 90 && demoState !== 'low-confidence' && demoState !== 'conflict' && demoState !== 'ai-unavailable') return 'Schedule default'
  return null
}

function getDemoState(searchParam, worker) {
  if (DEMO_STATES.includes(searchParam)) return searchParam
  if (worker.confidence >= 90) return 'high-confidence'
  if (worker.conflict) return 'conflict'
  return 'low-confidence'
}

export default function PerWorkerCard() {
  const { workerId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const worker = workers.find((w) => w.id === Number(workerId)) || workers[0]
  const demoState = getDemoState(searchParams.get('demo'), worker)

  const isAiUnavailable = demoState === 'ai-unavailable'

  const effectiveConf =
    demoState === 'high-confidence' ? 94 :
    demoState === 'low-confidence' ? 62 :
    demoState === 'conflict' ? 58 :
    demoState === 'full-conflict' ? 42 :
    62

  const [selectedReason, setSelectedReason] = useState(() => getDefaultReason(worker, demoState))
  const [reasonValid, setReasonValid] = useState(() => {
    const r = getDefaultReason(worker, demoState)
    return r !== null && r !== 'Other'
  })
  const [showStepper, setShowStepper] = useState(() => demoState === 'ai-unavailable')
  const [confirmedTime, setConfirmedTime] = useState(worker.suggestedTime)

  // Reset interaction state when demo state changes (flowchart navigation)
  useEffect(() => {
    const r = getDefaultReason(worker, demoState)
    setSelectedReason(r)
    setReasonValid(r !== null && r !== 'Other')
    setShowStepper(demoState === 'ai-unavailable')
    setConfirmedTime(worker.suggestedTime)
  }, [demoState, worker.id])

  const handleReasonChange = useCallback((r) => setSelectedReason(r), [])
  const handleValidChange = useCallback((v) => setReasonValid(v), [])

  function handleTimeChange(t) {
    setConfirmedTime(t)
    setSelectedReason('Worker confirmed')
  }

  function handleConfirm() {
    const from = location.state?.from
    navigate('/confirm', {
      state: {
        total: workers.length,
        submitted: from === 'batch' ? workers.length : 1,
        partial: from !== 'batch' && workers.length > 1,
      },
    })
  }

  const reasoningText =
    demoState === 'full-conflict'
      ? 'Schedule says 16:00 but clock data and team pattern disagree — confirm with worker.'
      : demoState === 'conflict'
      ? `Schedule says ${worker.suggestedTime} but worker usually leaves 16:40 – confirm with worker`
      : worker.reasoning

  const isDispute = demoState === 'dispute' || selectedReason === 'Dispute – follow up'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, animation: 'screenEnter 220ms cubic-bezier(0.25, 1, 0.5, 1) both' }}>
      {/* Header */}
      <div style={{ padding: '28px 20px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigate(-1)}
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
        <div style={{ minWidth: 0, overflow: 'hidden' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {worker.name}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {worker.role} · {worker.shift} shift
          </p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        {/* AI suggestion block */}
        {isAiUnavailable ? (
          <div style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-card)',
            padding: '18px',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 20, color: 'var(--text-secondary)', marginTop: 1, flexShrink: 0 }}>⚠</span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                AI couldn't suggest a time
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Enter it manually below.
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'var(--bg)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-card)',
            padding: '18px 18px 16px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
              AI suggestion
            </p>
            <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14 }}>
              {confirmedTime}
            </p>

            <ConfidenceBar score={effectiveConf} />

            <p style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              marginTop: 12,
              lineHeight: 1.5,
              borderTop: '1px solid var(--border)',
              paddingTop: 12,
            }}>
              {reasoningText}
            </p>
          </div>
        )}

        {/* Time stepper (edit mode) */}
        {showStepper && (
          <div style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-card)',
            padding: '16px 18px',
            animation: 'fadeSlideDown 180ms cubic-bezier(0.25, 1, 0.5, 1) both',
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Adjust clock-out time
            </p>
            <TimeStepper value={confirmedTime} onChange={handleTimeChange} />
          </div>
        )}

        {/* Reason section */}
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
            Why confirming this time?
          </p>
          <ReasonPills
            selected={selectedReason}
            onChange={handleReasonChange}
            onValidChange={handleValidChange}
          />
        </div>
      </div>

      <StickyActions
        primary={{
          label: isDispute ? 'Submit dispute' : `Confirm ${confirmedTime}`,
          onClick: handleConfirm,
          disabled: !selectedReason || !reasonValid,
        }}
        secondary={
          !isDispute && !isAiUnavailable
            ? {
                label: showStepper ? 'Use suggestion' : 'Edit time',
                onClick: () => setShowStepper((s) => !s),
              }
            : null
        }
      />
    </div>
  )
}
