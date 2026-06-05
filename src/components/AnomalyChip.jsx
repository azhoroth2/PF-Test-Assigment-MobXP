export default function AnomalyChip({ label }) {
  return (
    <span style={{
      background: 'var(--surface)',
      color: 'var(--text-primary)',
      borderRadius: 'var(--radius-btn)',
      fontSize: 12,
      fontWeight: 500,
      padding: '4px 10px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {label}
    </span>
  )
}
