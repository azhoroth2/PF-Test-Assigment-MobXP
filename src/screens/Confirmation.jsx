import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import StickyActions from '../components/StickyActions'

export default function Confirmation() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [searchParams] = useSearchParams()

  const demoParam = searchParams.get('demo')
  const isOffline = demoParam === 'offline'
  const isPartialSync = demoParam === 'partial-sync'
  const submitted = isOffline ? 3 : (demoParam === 'partial' ? 2 : (state?.submitted ?? 3))
  const total = isOffline ? 3 : (demoParam === 'partial' ? 3 : (state?.total ?? 3))
  const partial = !isOffline && !isPartialSync && (demoParam === 'partial' || state?.partial || submitted < total)
  const remaining = total - submitted

  const icon = isOffline ? '⏳' : isPartialSync ? '↻' : partial ? '⚠' : '✓'
  const iconBg = (isOffline || partial || isPartialSync) ? 'var(--surface)' : 'rgba(0,185,80,0.10)'

  const headline = isOffline
    ? 'Saved. Sends to HR when back online.'
    : isPartialSync
    ? '2 sent ✓ · 1 still pending sync'
    : partial
    ? `${submitted} submitted · ${remaining} still need${remaining === 1 ? 's' : ''} your check`
    : `${submitted} correction${submitted !== 1 ? 's' : ''} submitted`

  const subtext = isOffline
    ? 'Queued. Sends automatically when back online.'
    : isPartialSync
    ? 'One sync pending. Will retry automatically when connected.'
    : partial
    ? 'One correction still needs your check.'
    : "Sent to HR. They'll review within 24h."

  const headlineColor = (!isOffline && !partial && !isPartialSync) ? 'var(--accent)' : 'var(--text-primary)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, animation: 'screenEnter 220ms cubic-bezier(0.25, 1, 0.5, 1) both' }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
        textAlign: 'center',
        gap: 16,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isPartialSync ? 36 : 32, lineHeight: 1, marginBottom: 8,
          animation: 'scaleIn 300ms cubic-bezier(0.25, 1, 0.5, 1) 80ms both',
        }}>
          {icon}
        </div>

        <h2 style={{
          fontSize: 20, fontWeight: 600, color: headlineColor,
          animation: 'screenEnter 280ms cubic-bezier(0.25, 1, 0.5, 1) 160ms both',
        }}>
          {headline}
        </h2>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 280, animation: 'fadeIn 260ms cubic-bezier(0.25, 1, 0.5, 1) 240ms both' }}>
          {subtext}
        </p>

        {isPartialSync && (
          <>
            <div style={{
              background: 'var(--surface)',
              border: '1.5px solid var(--border)',
              borderRadius: 10,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              maxWidth: 320,
              animation: 'fadeIn 240ms cubic-bezier(0.25, 1, 0.5, 1) 300ms both',
            }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Piotr W. · Odd duration</span>
              <span style={{
                marginLeft: 'auto',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '2px 6px',
              }}>
                Pending
              </span>
            </div>
            <button
              onClick={() => navigate('/corrections')}
              style={{
                width: '100%',
                maxWidth: 320,
                height: 56,
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--text-primary)',
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-btn)',
                cursor: 'pointer',
                animation: 'fadeIn 240ms cubic-bezier(0.25, 1, 0.5, 1) 360ms both',
              }}
            >
              Retry sync
            </button>
          </>
        )}

      </div>

      <StickyActions
        primary={{
          label: partial ? 'Finish corrections' : 'Done',
          onClick: () => partial ? navigate('/corrections') : navigate('/'),
        }}
        secondary={null}
      />
    </div>
  )
}
