import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import StickyActions from '../components/StickyActions'

export default function Confirmation() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [searchParams] = useSearchParams()

  const demoParam = searchParams.get('demo')
  const isOffline = demoParam === 'offline'
  const submitted = isOffline ? 3 : (demoParam === 'partial' ? 2 : (state?.submitted ?? 3))
  const total = isOffline ? 3 : (demoParam === 'partial' ? 3 : (state?.total ?? 3))
  const partial = !isOffline && (demoParam === 'partial' || state?.partial || submitted < total)
  const remaining = total - submitted

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
        {/* Icon */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: isOffline ? 'var(--surface)' : (partial ? 'var(--surface)' : '#e6f9ee'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          marginBottom: 8,
          animation: 'scaleIn 300ms cubic-bezier(0.25, 1, 0.5, 1) 80ms both',
        }}>
          {isOffline ? '⏳' : (partial ? '⚠' : '✓')}
        </div>

        {/* Headline */}
        <h2 style={{
          fontSize: 20,
          fontWeight: 600,
          color: isOffline ? 'var(--text-primary)' : (partial ? 'var(--text-primary)' : 'var(--accent)'),
          animation: 'screenEnter 280ms cubic-bezier(0.25, 1, 0.5, 1) 160ms both',
        }}>
          {isOffline
            ? 'Saved — will send to HR when back online'
            : (partial
                ? `${submitted} submitted · ${remaining} still need${remaining === 1 ? 's' : ''} your check`
                : `${submitted} correction${submitted !== 1 ? 's' : ''} submitted`)}
        </h2>

        {/* Subtext */}
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 280, animation: 'fadeIn 260ms cubic-bezier(0.25, 1, 0.5, 1) 240ms both' }}>
          {isOffline
            ? "Your corrections are queued. You're free to leave."
            : (partial
                ? 'The unfinished correction is still waiting. Come back when you can.'
                : "Sent to HR for approval · they'll review within 24h")}
        </p>

        {!partial && !isOffline && (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 260, animation: 'fadeIn 240ms cubic-bezier(0.25, 1, 0.5, 1) 300ms both' }}>
            We'll only ping you if HR needs a detail.
          </p>
        )}
      </div>

      <StickyActions
        primary={{
          label: 'Done',
          onClick: () => navigate('/'),
        }}
        secondary={
          !isOffline && partial
            ? {
                label: 'Finish corrections',
                onClick: () => navigate('/corrections'),
              }
            : null
        }
      />
    </div>
  )
}
