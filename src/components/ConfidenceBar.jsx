export default function ConfidenceBar({ score }) {
  const high = score >= 85
  const color = high ? 'var(--accent)' : 'var(--text-secondary)'
  const label = high ? `${score}%` : `${score}% – please check`

  return (
    <div>
      <div style={{
        height: 6,
        borderRadius: 3,
        background: 'var(--surface)',
        overflow: 'hidden',
        marginBottom: 6,
      }}>
        <div style={{
          height: '100%',
          width: `${score}%`,
          background: color,
          borderRadius: 3,
          transition: 'width 0.3s ease',
        }} />
      </div>
      <span style={{
        fontSize: 14,
        fontWeight: 600,
        color: high ? 'var(--text-primary)' : 'var(--text-secondary)',
      }}>
        {label}
      </span>
    </div>
  )
}
