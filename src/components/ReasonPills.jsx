import { useState } from 'react'

const REASONS = ['Schedule default', 'Worker confirmed', 'Dispute – follow up', 'Other']

export default function ReasonPills({ selected, onChange }) {
  const [showOther, setShowOther] = useState(false)
  const [otherText, setOtherText] = useState('')

  function handleSelect(reason) {
    if (reason === 'Other') {
      setShowOther(true)
      onChange(reason)
    } else {
      setShowOther(false)
      onChange(reason)
    }
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        {REASONS.map((r) => {
          const isOther = r === 'Other'
          const isSelected = selected === r
          return (
            <button
              key={r}
              onClick={() => handleSelect(r)}
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
                transition: 'all 0.15s ease',
              }}
            >
              {r}
            </button>
          )
        })}
      </div>
      {showOther && (
        <textarea
          autoFocus
          value={otherText}
          onChange={(e) => setOtherText(e.target.value)}
          placeholder="Describe reason…"
          style={{
            marginTop: 12,
            width: '100%',
            minHeight: 80,
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-btn)',
            padding: '10px 12px',
            fontSize: 14,
            fontFamily: 'var(--font)',
            color: 'var(--text-primary)',
            resize: 'vertical',
            outline: 'none',
          }}
        />
      )}
    </div>
  )
}
