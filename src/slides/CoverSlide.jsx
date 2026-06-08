import SlideLayout from './SlideLayout'

export default function CoverSlide() {
  return (
    <SlideLayout verticalCenter>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        padding: '0 32px',
      }}>
        {/* Overline */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 28,
        }}>
          <div style={{ width: 32, height: 1.5, background: 'var(--accent)', opacity: 0.5 }} />
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}>
            PeopleForce · Product Design Assignment
          </span>
          <div style={{ width: 32, height: 1.5, background: 'var(--accent)', opacity: 0.5 }} />
        </div>

        <h1 style={{
          fontSize: 64,
          fontWeight: 800,
          color: 'var(--page-nav-text)',
          letterSpacing: '-2px',
          lineHeight: 1.1,
          margin: 0,
          marginBottom: 24,
          textAlign: 'center',
          maxWidth: 900,
        }}>
          Blue colar segment solution exploration
        </h1>



        {/* Author */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          marginBottom: 48,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--page-nav-text)' }}>
            Stanislav Stefaniuk
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Product Designer — Mobile Experience
          </span>
        </div>

        {/* Navigation Note */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          background: 'rgba(127,150,178,0.08)',
          borderRadius: 20,
          border: '1px solid var(--border)',
          marginTop: 16
        }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
            Use
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <kbd style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: 12,
              color: 'var(--page-nav-text)',
              fontFamily: 'inherit',
              boxShadow: '0 1px 1px rgba(0,0,0,0.05)'
            }}>←</kbd>
            <kbd style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: 12,
              color: 'var(--page-nav-text)',
              fontFamily: 'inherit',
              boxShadow: '0 1px 1px rgba(0,0,0,0.05)'
            }}>→</kbd>
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
            keys to navigate
          </span>
        </div>

      </div>
    </SlideLayout>
  )
}
