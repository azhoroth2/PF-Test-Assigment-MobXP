import { useState } from 'react'

const REASONS = ['Schedule default', 'Dispute – follow up', 'Other']

export default function ReasonPills({ selected, onChange, onValidChange }) {
  const [comment, setComment] = useState('')

  function handleSelect(reason) {
    onChange(reason)
    if (reason === 'Other') {
      onValidChange?.(comment.trim().length > 0)
    } else {
      onValidChange?.(true)
    }
  }

  function handleComment(e) {
    setComment(e.target.value)
    if (selected === 'Other') {
      onValidChange?.(e.target.value.trim().length > 0)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {REASONS.map((r) => {
        const isSelected = selected === r
        return (
          <button
            key={r}
            onClick={() => handleSelect(r)}
            aria-pressed={isSelected}
            style={{
              width: '100%',
              minHeight: 56,
              padding: '0 16px',
              borderRadius: 'var(--radius-btn)',
              background: isSelected ? 'rgba(0,185,80,0.10)' : 'var(--surface)',
              color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
              border: isSelected ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
              fontSize: 14,
              fontWeight: isSelected ? 600 : 500,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'background 180ms cubic-bezier(0.25, 1, 0.5, 1), border-color 180ms cubic-bezier(0.25, 1, 0.5, 1), color 150ms ease',
            }}
          >
            <span>{r}</span>
            {isSelected && <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>✓</span>}
          </button>
        )
      })}
      <textarea
        value={comment}
        onChange={handleComment}
        placeholder={selected === 'Other' ? 'Describe the reason (required)' : 'Add a comment (optional)'}
        maxLength={300}
        rows={3}
        style={{
          width: '100%',
          marginTop: 4,
          border: selected === 'Other' && comment.trim().length === 0
            ? '1.5px solid var(--text-secondary)'
            : '1.5px solid var(--border)',
          borderRadius: 'var(--radius-btn)',
          padding: '12px',
          fontSize: 14,
          fontFamily: 'var(--font)',
          color: 'var(--text-primary)',
          background: 'var(--surface)',
          outline: 'none',
          resize: 'none',
          lineHeight: 1.5,
          boxSizing: 'border-box',
          transition: 'border-color 150ms ease',
        }}
      />
    </div>
  )
}
