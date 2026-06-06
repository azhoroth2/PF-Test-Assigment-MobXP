export default function AnomalyChip({ label }) {
  const isMissing = label === 'Missing clock-out'
  return (
    <span style={{
      background: isMissing ? 'rgba(71,104,135,0.10)' : 'var(--surface)',
      color: isMissing ? '#476887' : 'var(--text-secondary)',
      border: isMissing ? '1.5px solid rgba(71,104,135,0.25)' : '1.5px solid transparent',
      borderRadius: 'var(--radius-btn)',
      fontSize: 12,
      fontWeight: isMissing ? 600 : 500,
      padding: '4px 10px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {isMissing ? '⏺ ' : ''}{label}
    </span>
  )
}
