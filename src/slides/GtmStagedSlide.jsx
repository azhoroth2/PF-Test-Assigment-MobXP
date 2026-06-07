import SlideLayout, { Tag } from './SlideLayout'

const STAGES = [
  {
    num: 1,
    timeline: '0–8 weeks',
    title: 'Discovery Interviews',
    desc: '20–30 discovery interviews from existing PF Polish base.',
    gate: '≥40% cite compliance + time tracking as top-3 pain AND willing to pay premium.',
    gateLabel: 'Gate',
    activities: [
      'Interview existing PF Polish customer base',
      'Map clock-out correction pain frequency',
      'Validate willingness to pay for blue-collar module',
    ],
  },
  {
    num: 2,
    timeline: '2–4 months',
    title: 'Pilot Customers',
    desc: '3–5 pilot customers from Polish base, thin MVP.',
    gate: '≥3 paid pilots convert within 90 days, sales cycle under 90 days.',
    gateLabel: 'Gate',
    activities: [
      'Ship thin MVP to 3–5 parallel pilots',
      'Validate bulk-approve flow, AI confidence threshold',
      'Measure foreman adoption + HR correction accuracy',
    ],
  },
  {
    num: 3,
    timeline: '4–9 months',
    title: 'Czech Expansion',
    desc: 'Czech market entry — only after Polish ARR proven.',
    gate: 'Polish ARR proven + Czech payroll integration feasible within budget.',
    gateLabel: 'Gate',
    activities: [
      'Validate Czech payroll integration cost',
      'Adapt multilingual UI for Czech',
      'Leverage Polish reference customers for Czech sales',
    ],
  },
]

const RISKS = [
  { icon: '⚠', label: 'Over-fitting', desc: 'Run 3–5 pilots in parallel, not one. Single-customer tailoring is not validation.' },
  { icon: '⚡', label: 'Incumbents accelerate', desc: 'HRappka/inEwi may add AI features. Speed matters — pilot fast.' },
  { icon: '🔗', label: 'Payroll gates every market', desc: 'Each new country requires payroll integration. Czech only if budget allows.' },
]

export default function GtmStagedSlide() {
  return (
    <SlideLayout
      sectionNumber={6}
      sectionLabel="Go-to-Market"
      title="Staged Approach"
      subtitle="Three stages, each with a kill gate. No stage begins without the previous gate passing."
    >
      {/* Stage timeline */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
        {STAGES.map((stage) => (
          <div key={stage.num} style={{
            flex: 1,
            minWidth: 280,
            borderRadius: 14,
            border: '1px solid var(--border)',
            overflow: 'hidden',
            background: 'var(--surface)',
          }}>
            {/* Header */}
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'var(--accent)',
                  color: 'var(--accent-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 800,
                }}>
                  {stage.num}
                </span>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--page-nav-text)' }}>
                  {stage.title}
                </span>
              </div>
              <Tag color="var(--text-secondary)" bg="rgba(127,150,178,0.12)">
                {stage.timeline}
              </Tag>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 20px' }}>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
                {stage.desc}
              </p>

              {/* Activities */}
              <div style={{ marginBottom: 14 }}>
                {stage.activities.map((a, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'flex-start',
                    marginBottom: 6,
                  }}>
                    <span style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: 'var(--text-muted)',
                      marginTop: 6,
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {a}
                    </span>
                  </div>
                ))}
              </div>

              {/* Gate */}
              <div style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: 'rgba(0,185,80,0.06)',
                border: '1px solid rgba(0,185,80,0.2)',
              }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                  {stage.gateLabel}
                </p>
                <p style={{ fontSize: 12, color: 'var(--page-nav-text)', lineHeight: 1.4, fontWeight: 500 }}>
                  {stage.gate}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scaling risks */}
      <div>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 12,
        }}>
          Scaling Risks
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {RISKS.map((r) => (
            <div key={r.label} style={{
              flex: 1,
              minWidth: 240,
              padding: '14px 16px',
              background: 'rgba(245,158,11,0.04)',
              border: '1px solid rgba(245,158,11,0.15)',
              borderRadius: 10,
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{r.icon}</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--page-nav-text)', marginBottom: 3 }}>
                  {r.label}
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
