import SlideLayout from './SlideLayout'

export default function CoverSlide() {
  const sections = [
    { num: '01–02', label: 'Market & Opportunity' },
    { num: '03–04', label: 'Competitive Landscape' },
    { num: '05–06', label: 'Go-to-Market' },
    { num: '07–08', label: 'Problem Selection' },
    { num: '09–11', label: 'Solution Design' },
    { num: '12–13', label: 'Flow & Prototype' },
    { num: '14–15', label: 'AI & Validation' },
    { num: '16–17', label: 'Reflection & Roadmap' },
  ]

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

        {/* Title */}
        <h1 style={{
          fontSize: 56,
          fontWeight: 800,
          color: 'var(--page-nav-text)',
          letterSpacing: '-2px',
          lineHeight: 1.05,
          textAlign: 'center',
          margin: 0,
          marginBottom: 20,
          maxWidth: 800,
        }}>
          Attendance Correction Layer
        </h1>

        <p style={{
          fontSize: 22,
          fontWeight: 500,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          margin: 0,
          marginBottom: 32,
          letterSpacing: '-0.3px',
        }}>
          PeopleForce Blue-Collar
        </p>

        {/* Thesis */}
        <div style={{
          padding: '20px 32px',
          background: 'var(--surface)',
          borderRadius: 14,
          borderLeft: '3px solid var(--accent)',
          marginBottom: 48,
          maxWidth: 640,
        }}>
          <p style={{
            fontSize: 17,
            fontWeight: 500,
            color: 'var(--page-nav-text)',
            lineHeight: 1.5,
            textAlign: 'center',
            margin: 0,
            fontStyle: 'italic',
          }}>
            "PF already has the compliance engine.{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 700, fontStyle: 'normal' }}>
              This is the gate that keeps it clean.
            </span>"
          </p>
        </div>

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

        {/* Section navigation */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
          maxWidth: 720,
        }}>
          {sections.map((s) => (
            <div
              key={s.num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 8,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <span style={{
                fontSize: 11,
                fontWeight: 800,
                color: 'var(--accent)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: 0.5,
              }}>
                {s.num}
              </span>
              <span style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--text-secondary)',
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
