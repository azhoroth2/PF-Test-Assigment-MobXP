import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StickyActions from '../components/StickyActions'

export default function HrRequest() {
  const navigate = useNavigate()
  const [notMineDone, setNotMineDone] = useState(false)

  function handleNotMine() {
    setNotMineDone(true)
    setTimeout(() => navigate('/'), 1600)
  }

  if (notMineDone) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center', gap: 16, animation: 'scaleIn 220ms cubic-bezier(0.25, 1, 0.5, 1) both' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
          ✓
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Sent to HR. Removed from your list.</p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>HR will route this to the right foreman.</p>
      </div>
    )
  }

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
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
            HR request
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Clock-out review</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Notification card */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-card)',
          padding: '18px',
          display: 'flex',
          gap: 14,
          alignItems: 'flex-start',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', background: 'var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
          }}>
            ⚠
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              HR needs a detail on Piotr W.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Review Piotr's clock-out from Tuesday before payroll closes.
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>Received 17:42</p>
          </div>
        </div>

        {/* What HR flagged */}
        <div style={{
          background: 'var(--bg)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-card)',
          padding: '16px 18px',
          boxShadow: 'var(--shadow-card)',
        }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
            What HR flagged
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Clock out time missing for Piotr W. Please clarify, escalate if necessary.
          </p>
        </div>
      </div>

      <StickyActions
        primary={{
          label: 'Open correction',
          onClick: () => navigate({ pathname: '/correction/3', search: '?demo=full-conflict' }),
        }}
        secondary={null}
      />
    </div>
  )
}
