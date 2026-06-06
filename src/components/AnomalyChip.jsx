export default function AnomalyChip({ label, annotationId }) {
  return (
    <span data-annotation-id={annotationId} style={{
      background: 'rgba(214, 130, 0, 0.10)',
      color: '#a06000',
      border: '1.5px solid rgba(214, 130, 0, 0.28)',
      borderRadius: 'var(--radius-btn)',
      fontSize: 12,
      fontWeight: 600,
      padding: '4px 10px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      ⚠ {label}
    </span>
  )
}
