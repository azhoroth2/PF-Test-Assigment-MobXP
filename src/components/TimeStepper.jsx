const MAX_MINS = 23 * 60 + 55

function parseTime(str) {
  const [h, m] = str.split(':').map(Number)
  return h * 60 + (m || 0)
}

function formatTime(mins) {
  const clamped = Math.min(Math.max(mins, 0), MAX_MINS)
  const h = Math.floor(clamped / 60)
  const m = clamped % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export default function TimeStepper({ value, onChange, minMins = 0 }) {
  const current = parseTime(value)
  const atMin = current <= minMins
  const atMax = current >= MAX_MINS

  function adjust(delta) {
    const next = current + delta
    if (next < minMins || next > MAX_MINS) return
    onChange(formatTime(next))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0' }}>
        <button
          onClick={() => adjust(-5)}
          disabled={atMin}
          aria-label="Subtract 5 minutes"
          style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-btn)',
            background: 'var(--surface)',
            color: atMin ? 'var(--text-muted)' : 'var(--text-primary)',
            fontSize: 20,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: atMin ? 0.4 : 1,
            cursor: atMin ? 'not-allowed' : 'pointer',
          }}
        >
          −5
        </button>
        <span style={{
          fontSize: 32,
          fontWeight: 700,
          color: 'var(--text-primary)',
          flex: 1,
          textAlign: 'center',
          letterSpacing: 1,
        }}>
          {value}
        </span>
        <button
          onClick={() => adjust(5)}
          disabled={atMax}
          aria-label="Add 5 minutes"
          style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-btn)',
            background: 'var(--surface)',
            color: atMax ? 'var(--text-muted)' : 'var(--text-primary)',
            fontSize: 20,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: atMax ? 0.4 : 1,
            cursor: atMax ? 'not-allowed' : 'pointer',
          }}
        >
          +5
        </button>
      </div>
      {atMin && minMins > 0 && (
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, textAlign: 'center' }}>
          Can't be before clock-in ({formatTime(minMins)})
        </p>
      )}
    </div>
  )
}
