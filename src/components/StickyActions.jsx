import { useState } from 'react'

export default function StickyActions({ primary, secondary }) {
  const [submitting, setSubmitting] = useState(false)

  async function handlePrimary() {
    if (submitting) return
    if (primary.disabled) { primary.onDisabledTap?.(); return }
    setSubmitting(true)
    try {
      await primary.onClick()
    } finally {
      setSubmitting(false)
    }
  }

  const primaryDisabled = primary.disabled || submitting

  return (
    <div style={{
      marginTop: 'auto',
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: '12px 20px 20px',
      display: 'flex',
      gap: 12,
    }}>
      {secondary && (
        <button
          onClick={secondary.onClick}
          style={{
            flex: 1,
            height: 56,
            borderRadius: 'var(--radius-btn)',
            background: '#f1f5f8',
            color: 'var(--text-primary)',
            fontSize: 16,
            fontWeight: 600,
            border: 'none',
          }}
        >
          {secondary.label}
        </button>
      )}
      <button
        onClick={handlePrimary}
        disabled={primaryDisabled}
        aria-busy={submitting}
        style={{
          flex: secondary ? 2 : 1,
          height: 56,
          borderRadius: 'var(--radius-btn)',
          background: primaryDisabled ? 'var(--text-muted)' : 'var(--accent)',
          color: 'var(--accent-text)',
          fontSize: 16,
          fontWeight: 600,
          border: 'none',
          opacity: primaryDisabled ? 0.6 : 1,
          cursor: primaryDisabled ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.15s ease, transform 100ms cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {submitting ? '…' : primary.label}
      </button>
    </div>
  )
}
