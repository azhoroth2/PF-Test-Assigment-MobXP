function parseTime(str) {
  const [h, m] = str.split(':').map(Number)
  return h * 60 + m
}

function formatTime(mins) {
  const h = Math.floor(((mins % 1440) + 1440) % 1440 / 60)
  const m = ((mins % 1440) + 1440) % 1440 % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export default function TimeStepper({ value, onChange }) {
  function adjust(delta) {
    const current = parseTime(value)
    onChange(formatTime(current + delta))
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 0',
    }}>
      <button
        onClick={() => adjust(-5)}
        style={{
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-btn)',
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          fontSize: 20,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
        style={{
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-btn)',
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          fontSize: 20,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        +5
      </button>
    </div>
  )
}
