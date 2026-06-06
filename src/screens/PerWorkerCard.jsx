import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom'
import ConfidenceBar from '../components/ConfidenceBar'
import ReasonPills from '../components/ReasonPills'
import TimeStepper from '../components/TimeStepper'
import StickyActions from '../components/StickyActions'
import { workers } from '../data/workers'

const DEMO_STATES = ['high-confidence', 'low-confidence', 'conflict', 'dispute', 'ai-unavailable', 'full-conflict', 'time-bounds', 'wrong-roster', 'loading']
const LOW_CONF = workers.filter((w) => w.confidence < 85)

function parseClockIn(shift) {
  const match = shift?.match(/^(\d{2}:\d{2})/)
  if (!match) return 0
  const [h, m] = match[1].split(':').map(Number)
  return h * 60 + m
}

function getDefaultReason(worker, demoState) {
  if (demoState === 'dispute' || demoState === 'full-conflict') return 'Dispute – follow up'
  if (worker.confidence >= 90 && !['low-confidence', 'conflict', 'ai-unavailable'].includes(demoState)) return 'Schedule default'
  return null
}

function getDemoState(searchParam, worker) {
  if (DEMO_STATES.includes(searchParam)) return searchParam
  if (worker.confidence >= 90) return 'high-confidence'
  if (worker.conflict) return 'conflict'
  return 'low-confidence'
}

function SkeletonBlock() {
  const shimmerStyle = {
    background: 'linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)',
    backgroundSize: '800px 100%',
    animation: 'shimmer 1.4s ease-in-out infinite',
    borderRadius: 4,
  }
  return (
    <div style={{
      background: 'var(--bg)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      padding: '18px 18px 16px',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{ ...shimmerStyle, height: 12, width: 80, marginBottom: 12 }} />
      <div style={{ ...shimmerStyle, height: 36, width: 120, marginBottom: 16 }} />
      <div style={{ ...shimmerStyle, height: 6, width: '100%', borderRadius: 3, marginBottom: 8 }} />
      <div style={{ ...shimmerStyle, height: 14, width: 100 }} />
    </div>
  )
}

export default function PerWorkerCard() {
  const { workerId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const worker = workers.find((w) => w.id === Number(workerId)) || workers[0]
  const demoState = getDemoState(searchParams.get('demo'), worker)

  const isAiUnavailable = demoState === 'ai-unavailable'
  const isLoading = demoState === 'loading'
  const isWrongRoster = demoState === 'wrong-roster'
  const isTimeBounds = demoState === 'time-bounds'

  const effectiveConf =
    demoState === 'high-confidence' ? 94 :
    demoState === 'low-confidence' ? 62 :
    demoState === 'conflict' ? 58 :
    demoState === 'full-conflict' ? 42 :
    62

  const clockInMins = parseClockIn(worker.shift)
  const aiSuggestedTime = worker.suggestedTime

  const [selectedReason, setSelectedReason] = useState(() => getDefaultReason(worker, demoState))
  const [reasonValid, setReasonValid] = useState(() => {
    const r = getDefaultReason(worker, demoState)
    return r !== null && r !== 'Other'
  })
  const [showEditCard, setShowEditCard] = useState(() => isAiUnavailable || isTimeBounds)
  const [confirmedTime, setConfirmedTime] = useState(() => isTimeBounds ? '08:05' : worker.suggestedTime)
  const [showReasonHint, setShowReasonHint] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const loadingRef = useRef(null)

  useEffect(() => {
    const r = getDefaultReason(worker, demoState)
    setSelectedReason(r)
    setReasonValid(r !== null && r !== 'Other')
    setShowEditCard(demoState === 'ai-unavailable' || demoState === 'time-bounds')
    setConfirmedTime(demoState === 'time-bounds' ? '08:05' : worker.suggestedTime)
    setShowReasonHint(false)
    setLoadingDone(false)
    if (loadingRef.current) clearTimeout(loadingRef.current)
    if (demoState === 'loading') {
      loadingRef.current = setTimeout(() => setLoadingDone(true), 2500)
    }
  }, [demoState, worker.id])

  useEffect(() => {
    return () => { if (loadingRef.current) clearTimeout(loadingRef.current) }
  }, [])

  const handleReasonChange = useCallback((r) => {
    setSelectedReason(r)
    setShowReasonHint(false)
  }, [])
  const handleValidChange = useCallback((v) => setReasonValid(v), [])

  function handleTimeChange(t) {
    setConfirmedTime(t)
    setSelectedReason(null)
    setReasonValid(false)
    setShowReasonHint(false)
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

  function handleNotMine() {
    navigate('/', { state: { notMineConfirmed: true } })
  }

  function handleResetTime() {
    setConfirmedTime(aiSuggestedTime)
    setShowEditCard(false)
  }

  const reasoningText =
    demoState === 'full-conflict'
      ? 'Schedule says 16:00 but clock data and team pattern disagree — confirm with worker.'
      : demoState === 'conflict'
      ? `Schedule says ${worker.suggestedTime} but worker usually leaves 16:40 – confirm with worker`
      : worker.reasoning

  const isDispute = demoState === 'dispute' || selectedReason === 'Dispute – follow up'

  const from = location.state?.from
  const workerIdx = LOW_CONF.findIndex((w) => w.id === Number(workerId))
  const showStepCounter = from === 'batch' && workerIdx >= 0

  const showAiUnavailable = isAiUnavailable || (isLoading && loadingDone)

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
        <div style={{ minWidth: 0, overflow: 'hidden', flex: 1 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {worker.name}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {showStepCounter
              ? `Worker ${workerIdx + 1} of ${LOW_CONF.length} · manual review`
              : `${worker.role} · ${worker.shift} shift`}
          </p>
        </div>
      </div>

      {/* M9 — wrong-roster warning */}
      {isWrongRoster && (
        <div style={{
          margin: '0 20px 4px',
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
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Not on your line — confirm this is yours before submitting.
          </p>
        </div>
      )}

      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        {/* M4 — skeleton loading */}
        {isLoading && !loadingDone && <SkeletonBlock />}

        {/* AI unavailable: notice + stepper */}
        {!isLoading && showAiUnavailable && (
          <>
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
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-card)',
              padding: '16px 18px',
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Adjust clock-out time
              </p>
              <TimeStepper
                value={confirmedTime}
                onChange={handleTimeChange}
                minMins={0}
              />
            </div>
          </>
        )}

        {/* AI suggestion card (with inline Edit time action) */}
        {!isLoading && !showAiUnavailable && (
          <div style={{
            background: 'var(--bg)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)',
            padding: '18px 18px 16px',
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
              AI suggestion
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-primary)' }}>
                {aiSuggestedTime}
              </p>
              {!showEditCard && !isDispute && (
                <button
                  onClick={() => setShowEditCard(true)}
                  aria-label="Edit time"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
            <ConfidenceBar score={effectiveConf} />
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.5, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
              {reasoningText}
            </p>
          </div>
        )}

        {/* Edit time card (visible when user opened editor, AI present) */}
        {!isLoading && !showAiUnavailable && showEditCard && (
          <div style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-card)',
            padding: '16px 18px',
            animation: 'fadeSlideDown 180ms cubic-bezier(0.25, 1, 0.5, 1) both',
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Adjust clock-out time
            </p>
            <TimeStepper
              value={confirmedTime}
              onChange={handleTimeChange}
              minMins={isTimeBounds ? clockInMins : 0}
            />
            {confirmedTime !== aiSuggestedTime && (
              <button
                onClick={handleResetTime}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: 13,
                  cursor: 'pointer',
                  padding: '8px 0 2px',
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--border)',
                  textUnderlineOffset: 2,
                  display: 'block',
                }}
              >
                Reset to suggested
              </button>
            )}
          </div>
        )}

        {/* Reason section */}
        {!isLoading && (
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
              Why this time?
            </p>
            <ReasonPills
              selected={selectedReason}
              onChange={handleReasonChange}
              onValidChange={handleValidChange}
            />
            {/* M1 — validation hint on disabled CTA tap */}
            {showReasonHint && (
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 10, animation: 'fadeIn 180ms ease both' }}>
                Pick a reason so HR understands.
              </p>
            )}
          </div>
        )}
      </div>

      <StickyActions
        primary={{
          label: isDispute ? 'Submit dispute' : `Confirm ${confirmedTime}`,
          onClick: handleConfirm,
          disabled: !isLoading && (!selectedReason || !reasonValid),
          onDisabledTap: () => setShowReasonHint(true),
        }}
        secondary={
          isWrongRoster
            ? { label: 'Not mine — send to HR', onClick: handleNotMine }
            : null
        }
      />
    </div>
  )
}
