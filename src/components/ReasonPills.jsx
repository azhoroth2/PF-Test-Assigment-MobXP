import { useState } from 'react'

const REASONS = ['Schedule default', 'Worker confirmed', 'Dispute – follow up', 'Other']

export default function ReasonPills({ selected, onChange, onValidChange }) {
  const [otherText, setOtherText] = useState('')

  function handleSelect(reason) {
    onChange(reason)
    if (reason === 'Other') {
      onValidChange?.(otherText.trim().length > 0)
    } else {
      onValidChange?.(true)
    }
  }

  function handleOtherText(e) {
    const val = e.target.value
    setOtherText(val)
    onValidChange?.(val.trim().length > 0)
  }

  const showOther = selected === 'Other'

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {REASONS.map((r) => {
          const isSelected = selected === r
          return (
            <button
              key={r}
              onClick={() => handleSelect(r)}
              aria-pressed={isSelected}
              style={{
                minHeight: 56,
                padding: '0 16px',
                borderRadius: 'var(--radius-btn)',
                background: isSelected ? '#e6f9ee' : 'var(--surface)',
                color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                border: isSelected ? '2px solid var(--accent)' : '2px solid transparent',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 180ms cubic-bezier(0.25, 1, 0.5, 1), border-color 180ms cubic-bezier(0.25, 1, 0.5, 1), color 150ms ease, transform 100ms cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {r}
            </button>
          )
        })}
      </div>
      {showOther && (
        <div style={{ marginTop: 12 }}>
          <input
            autoFocus
            type="text"
            value={otherText}
            onChange={handleOtherText}
            placeholder="Add a short reason…"
            maxLength={200}
            aria-label="Other reason"
            style={{
              width: '100%',
              height: 48,
              border: `1.5px solid ${otherText.trim().length > 0 ? 'var(--border)' : 'var(--accent)'}`,
              borderRadius: 'var(--radius-btn)',
              padding: '0 12px',
              fontSize: 14,
              fontFamily: 'var(--font)',
              color: 'var(--text-primary)',
              background: 'var(--bg)',
              outline: 'none',
            }}
          />
          <p style={{ fontSize: 11, color: otherText.trim().length > 0 ? 'var(--text-muted)' : 'var(--text-secondary)', marginTop: 4 }}>
            {otherText.trim().length === 0 ? 'Required — describe the reason to continue' : `${otherText.length}/200`}
          </p>
        </div>
      )}
    </div>
  )
}
