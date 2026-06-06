import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom'
import ConfidenceBar from '../components/ConfidenceBar'
import ReasonPills from '../components/ReasonPills'
import TimeStepper from '../components/TimeStepper'
import StickyActions from '../components/StickyActions'
import { workers } from '../data/workers'

const DEMO_STATES = ['high-confidence', 'low-confidence', 'conflict', 'dispute', 'full-conflict', 'loading']
const LOW_CONF = workers.filter((w) => w.confidence < 85)

function getDefaultReason(demoState) {
  if (demoState === 'dispute' || demoState === 'full-conflict') return 'Dispute – follow up'
  if (demoState === 'high-confidence') return 'Schedule default'
  return null
}

function getDemoState(searchParam, worker) {
  if (DEMO_STATES.includes(searchParam)) return searchParam
  if (worker.confidence >= 85) return 'high-confidence'
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

function calcTotal(clockIn, clockOut) {
  if (!clockIn || !clockOut) return null
  const [ih, im] = clockIn.split(':').map(Number)
  const [oh, om] = clockOut.split(':').map(Number)
  const mins = (oh * 60 + om) - (ih * 60 + im)
  if (mins <= 0) return null
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

function ShiftStrip({ clockIn, clockOut }) {
  const total = calcTotal(clockIn, clockOut)
  const na = { color: 'var(--text-muted)', fontWeight: 700 }
  const val = { color: 'var(--text-primary)', fontWeight: 700 }
  const coStyle = clockOut ? val : na
  const totStyle = total ? val : na
  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius-card)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Clock-in</p>
        <p style={{ fontSize: 22, lineHeight: 1, ...(clockIn ? val : na) }}>{clockIn ?? 'N/A'}</p>
      </div>

      <span style={{ fontSize: 13, color: 'var(--border)', margin: '0 12px', marginTop: 10, flexShrink: 0 }}>→</span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Clock-out</p>
        <p style={{ fontSize: 22, lineHeight: 1, ...coStyle }}>{clockOut ?? 'N/A'}</p>
      </div>

      <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch', margin: '0 16px', flexShrink: 0 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Total</p>
        <p style={{ fontSize: 22, lineHeight: 1, ...totStyle }}>{total ?? 'N/A'}</p>
      </div>
    </div>
  )
}

export default function PerWorkerCard() {
  const { workerId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const worker = workers.find((w) => w.id === Number(workerId)) || workers[0]
  const demoState = getDemoState(searchParams.get('demo'), worker)

  const isLoading = demoState === 'loading'

  const effectiveConf = worker.confidence

  const aiSuggestedTime = worker.suggestedTime

  const [selectedReason, setSelectedReason] = useState(() => getDefaultReason(demoState))
  const [reasonValid, setReasonValid] = useState(() => {
    const r = getDefaultReason(demoState)
    return r !== null && r !== 'Other'
  })
  const [showEditCard, setShowEditCard] = useState(false)
  const [confirmedTime, setConfirmedTime] = useState(() => worker.suggestedTime)
  const [showReasonHint, setShowReasonHint] = useState(false)
  const [workerPinged, setWorkerPinged] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const loadingRef = useRef(null)

  useEffect(() => {
    const r = getDefaultReason(demoState)
    setSelectedReason(r)
    setReasonValid(r !== null && r !== 'Other')
    setShowEditCard(false)
    setConfirmedTime(worker.suggestedTime)
    setShowReasonHint(false)
    setWorkerPinged(false)
    setLoadingDone(false)
    if (loadingRef.current) clearTimeout(loadingRef.current)
    if (demoState === 'loading') {
      loadingRef.current = setTimeout(() => setLoadingDone(true), 2500)
    }
  }, [demoState, worker.id])

  useEffect(() => {
    return () => { if (loadingRef.current) clearTimeout(loadingRef.current) }
  }, [])

  useEffect(() => {
    if (!searchParams.get('demo')) {
      setSearchParams({ demo: demoState }, { replace: true, state: location.state })
    }
  }, [workerId])

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

  function handleResetTime() {
    setConfirmedTime(aiSuggestedTime)
    setShowEditCard(false)
  }

  const badgeScan = worker.badgeScan
  const reasoningText =
    demoState === 'full-conflict'
      ? `Schedule ${worker.suggestedTime}${badgeScan ? `, badge scan ${badgeScan}` : ''}, usual departure 16:40. All three signals conflict.`
      : demoState === 'conflict'
      ? `Schedule ${worker.suggestedTime}${badgeScan ? `, badge scan ${badgeScan}` : ''}. Worker usually leaves 16:40. Confirm which is correct.`
      : worker.reasoning

  const isDispute = demoState === 'dispute' || selectedReason === 'Dispute – follow up'

  const from = location.state?.from
  const workerIdx = LOW_CONF.findIndex((w) => w.id === Number(workerId))
  const showStepCounter = from === 'batch' && workerIdx >= 0


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
        <div
          aria-hidden="true"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M14 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3.5L8 15l2.5-3H14a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>
      </div>


      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        {/* M4 — skeleton loading */}
        {isLoading && !loadingDone && <SkeletonBlock />}

        {/* Clock-in / out / total strip */}
        {(!isLoading || loadingDone) && (
          <ShiftStrip clockIn={worker.clockIn} clockOut={worker.clockOut} />
        )}

        {/* AI suggestion card (with inline Edit time action) */}
        {(!isLoading || loadingDone) && (
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
              {!showEditCard && (
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

        {/* Notify worker — button or pending chip */}
        {(!isLoading || loadingDone) && (
          workerPinged ? (
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
                Waiting on worker
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', flexShrink: 0 }}>
                Sent {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setWorkerPinged(true)}
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
              Notify worker
            </button>
          )
        )}

        {/* Edit time card (visible when user opened editor, AI present) */}
        {(!isLoading || loadingDone) && showEditCard && (
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
              minMins={0}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: 0.5 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
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
          disabled: (isLoading && !loadingDone) || !selectedReason || !reasonValid,
          onDisabledTap: () => setShowReasonHint(true),
        }}
        secondary={null}
      />
    </div>
  )
}
