export default function StickyActions({ primary, secondary }) {
  return (
    <div style={{
      marginTop: 'auto',
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: '12px 20px 20px',
      display: 'flex',
      gap: 12,
    }}>
      {secondary && (
        <button
          onClick={secondary.onClick}
          style={{
            flex: 1,
            height: 56,
            borderRadius: 'var(--radius-btn)',
            background: '#f1f5f8',
            color: 'var(--text-primary)',
            fontSize: 16,
            fontWeight: 600,
            border: 'none',
          }}
        >
          {secondary.label}
        </button>
      )}
      <button
        onClick={primary.onClick}
        disabled={primary.disabled}
        style={{
          flex: secondary ? 2 : 1,
          height: 56,
          borderRadius: 'var(--radius-btn)',
          background: primary.disabled ? 'var(--text-muted)' : 'var(--accent)',
          color: 'var(--accent-text)',
          fontSize: 16,
          fontWeight: 600,
          border: 'none',
          opacity: primary.disabled ? 0.6 : 1,
        }}
      >
        {primary.label}
      </button>
    </div>
  )
}
