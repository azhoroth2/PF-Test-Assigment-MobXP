import SlideLayout, { Callout } from './SlideLayout'

const YES_ITEMS = [
  {
    title: 'Anomaly detection',
    desc: '+30 min post-shift, 4 flag types (missed clock-out, early departure, OT mismatch, pattern anomaly).',
  },
  {
    title: 'Confidence score',
    desc: '4 signals: worker history, that-day clock-in, pre-approved OT flag, team pattern.',
  },
  {
    title: 'Pre-payroll summary',
    desc: 'Synthesis + acknowledgment gate. Every money claim expandable to legal rule.',
  },
]

const NO_ITEMS = [
  {
    title: 'Final payroll approval',
    reason: 'Legal liability = human only. AI assists, never decides.',
  },
  {
    title: 'Biometric clock-in',
    reason: 'NSA ruling = banned in Poland. Non-negotiable.',
  },
  {
    title: 'Auto-shift formation',
    reason: 'Scheduling doesn\'t exist in PF yet. Can\'t automate what isn\'t built.',
  },
  {
    title: 'GPS framing as surveillance',
    reason: 'Trust and adoption killer in factory context. Workers reject it.',
  },
]

export default function AiArchitectureSlide() {
  return (
    <SlideLayout
      sectionNumber={14}
      sectionLabel="AI & Validation"
      title="AI Architecture — Where Yes, Where No"
      subtitle="AI has a specific, bounded role. Every boundary is a design decision, not a limitation."
    >
      <div style={{ display: 'flex', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
        {/* YES column */}
        <div style={{
          flex: 1,
          minWidth: 320,
          padding: '24px',
          borderRadius: 14,
          border: '1.5px solid rgba(0,185,80,0.2)',
          background: 'rgba(0,185,80,0.03)',
        }}>
          <p style={{
            fontSize: 13,
            fontWeight: 800,
            color: 'var(--accent)',
            textTransform: 'uppercase',
            letterSpacing: 1.2,
            marginBottom: 20,
          }}>
            ✓ AI — Yes
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {YES_ITEMS.map((item) => (
              <div key={item.title} style={{
                padding: '16px',
                background: 'var(--surface)',
                borderRadius: 10,
                border: '1px solid var(--border)',
              }}>
                <p style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--page-nav-text)',
                  marginBottom: 6,
                }}>
                  {item.title}
                </p>
                <p style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.45,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* NO column */}
        <div style={{
          flex: 1,
          minWidth: 320,
          padding: '24px',
          borderRadius: 14,
          border: '1.5px solid rgba(239,68,68,0.15)',
          background: 'rgba(239,68,68,0.02)',
        }}>
          <p style={{
            fontSize: 13,
            fontWeight: 800,
            color: '#ef4444',
            textTransform: 'uppercase',
            letterSpacing: 1.2,
            marginBottom: 20,
          }}>
            ✗ AI — No
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {NO_ITEMS.map((item) => (
              <div key={item.title} style={{
                padding: '16px',
                background: 'var(--surface)',
                borderRadius: 10,
                border: '1px solid var(--border)',
              }}>
                <p style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--page-nav-text)',
                  marginBottom: 6,
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(239,68,68,0.35)',
                }}>
                  {item.title}
                </p>
                <p style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.45,
                  margin: 0,
                }}>
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Callout>
        "Most expensive failure = AI confidently wrong + human rubber-stamps. Every feature engineered to prevent this. Final approval is always human."
      </Callout>
    </SlideLayout>
  )
}
