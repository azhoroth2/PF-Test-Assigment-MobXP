import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import StickyActions from '../components/StickyActions'

export default function Confirmation() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [searchParams] = useSearchParams()

  const demoParam = searchParams.get('demo')
  const submitted = demoParam === 'partial' ? 2 : (state?.submitted ?? 3)
  const total = demoParam === 'partial' ? 3 : (state?.total ?? 3)
  const partial = demoParam === 'partial' || state?.partial || submitted < total
  const remaining = total - submitted

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
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
          background: partial ? 'var(--surface)' : '#e6f9ee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          marginBottom: 8,
        }}>
          {partial ? '⚠' : '✓'}
        </div>

        {/* Headline */}
        <h2 style={{
          fontSize: 20,
          fontWeight: 600,
          color: partial ? 'var(--text-primary)' : 'var(--accent)',
        }}>
          {partial
            ? `${submitted} submitted · ${remaining} still need${remaining === 1 ? 's' : ''} your check`
            : `${submitted} correction${submitted !== 1 ? 's' : ''} submitted`}
        </h2>

        {/* Subtext */}
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 280 }}>
          {partial
            ? 'The unfinished correction is still waiting. Come back when you can.'
            : "Sent to HR for approval · they'll review within 24h"}
        </p>

        {!partial && (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 260 }}>
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
          partial
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
