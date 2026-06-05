import { useState } from 'react'

const REASONS = ['Schedule default', 'Worker confirmed', 'Dispute – follow up', 'Other']

export default function ReasonPills({ selected, onChange, onValidChange }) {
  const [showOther, setShowOther] = useState(false)
  const [otherText, setOtherText] = useState('')

  function handleSelect(reason) {
    if (reason === 'Other') {
      setShowOther(true)
      onChange(reason)
      onValidChange?.(otherText.trim().length > 0)
    } else {
      setShowOther(false)
      onChange(reason)
      onValidChange?.(true)
    }
  }

  function handleOtherText(e) {
    const val = e.target.value
    setOtherText(val)
    onValidChange?.(val.trim().length > 0)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {REASONS.map((r) => {
          const isOther = r === 'Other'
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
                color: isSelected ? 'var(--accent)' : isOther ? 'var(--text-muted)' : 'var(--text-primary)',
                border: isSelected ? '2px solid var(--accent)' : '2px solid transparent',
                fontSize: isOther ? 13 : 14,
                fontWeight: isOther ? 400 : 500,
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
          <textarea
            autoFocus
            value={otherText}
            onChange={handleOtherText}
            placeholder="Describe reason…"
            maxLength={300}
            aria-label="Other reason description"
            style={{
              width: '100%',
              minHeight: 80,
              border: `1.5px solid ${otherText.trim().length > 0 ? 'var(--border)' : 'var(--accent)'}`,
              borderRadius: 'var(--radius-btn)',
              padding: '10px 12px',
              fontSize: 14,
              fontFamily: 'var(--font)',
              color: 'var(--text-primary)',
              resize: 'vertical',
              outline: 'none',
            }}
          />
          <p style={{
            fontSize: 11,
            color: otherText.trim().length > 0 ? 'var(--text-muted)' : 'var(--accent)',
            marginTop: 4,
          }}>
            {otherText.trim().length === 0 ? 'Required — describe the reason to continue' : `${otherText.length}/300`}
          </p>
        </div>
      )}
    </div>
  )
}
