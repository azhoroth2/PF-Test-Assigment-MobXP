import SlideLayout, { Tag } from './SlideLayout'

const BLOCKERS = [
  { id: 1, title: 'Missed clock-out silent propagation', desc: 'Gap enters payroll unnoticed. No alarm, no flag, no correction window.', severity: 'Critical' },
  { id: 2, title: 'Notification at wrong moment', desc: 'Foreman gets notified during shift — impossible to act. 30-min post-shift delay solves this.', severity: 'High' },
  { id: 3, title: 'Factory floor connectivity + app friction', desc: 'Poor WiFi, no company email, gloves. App must work with minimal input.', severity: 'High' },
  { id: 4, title: 'Foreman approves blind', desc: 'No data to back decision. AI confidence + pre-defined reasons solve this.', severity: 'Critical' },
  { id: 5, title: 'HR approves blind = legal risk', desc: 'HR stamps correction with no audit trail. PLN 3k–50k fine risk per event.', severity: 'Critical' },
  { id: 6, title: 'AI numbers undefendable at PIP audit', desc: 'If AI reasoning isn\'t expandable to source data, it\'s theater not evidence.', severity: 'High' },
  { id: 7, title: 'Return-to-foreman creates unresolved loop', desc: 'HR sends back to foreman — but foreman already started next shift. SLA needed.', severity: 'Medium' },
  { id: 8, title: 'Export errors surface at worst moment', desc: 'Payroll export fails at deadline. Pre-built format + pre-export validation.', severity: 'High' },
]

const DECISIONS = [
  { decision: '30-min post-shift notification delay', rationale: 'Foreman can\'t act during a shift — wait until handoff.' },
  { decision: 'Bulk approve at ≥90% confidence only', rationale: 'High confidence = safe for one-tap. Below threshold = individual review.' },
  { decision: 'Pre-defined tap reasons, zero typing', rationale: 'Gloves + factory floor = no keyboard. Tap selection covers ≥85% of cases.' },
  { decision: 'Export locked until all flags acknowledged', rationale: 'Forces HR to review every flagged item before payroll export.' },
]

export default function FlowBlockersSlide() {
  return (
    <SlideLayout
      sectionNumber={12}
      sectionLabel="Flow & Prototype"
      title="End-to-End Flow + 8 Blockers"
      subtitle="Every blocker in the attendance correction flow — and the design decision that addresses it."
    >
      {/* Blocker cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320, 1fr))',
        gap: 12,
        marginBottom: 36,
      }}>
        {BLOCKERS.map((b) => {
          const severityColor = b.severity === 'Critical' ? '#ef4444' : b.severity === 'High' ? '#f59e0b' : 'var(--text-secondary)'
          return (
            <div key={b.id} style={{
              padding: '16px 20px',
              background: 'var(--surface)',
              borderRadius: 12,
              border: '1px solid var(--border)',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
            }}>
              <span style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: 'var(--page-bg)',
                border: '1.5px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 800,
                color: 'var(--page-nav-text)',
                flexShrink: 0,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {b.id}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--page-nav-text)', margin: 0, lineHeight: 1.3 }}>
                    {b.title}
                  </p>
                  <Tag color={severityColor}>{b.severity}</Tag>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Key design decisions */}
      <div>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 14,
        }}>
          Key design decisions
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {DECISIONS.map((d, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 16,
              alignItems: 'baseline',
              padding: '12px 18px',
              background: 'rgba(0,185,80,0.03)',
              border: '1px solid rgba(0,185,80,0.12)',
              borderRadius: 10,
            }}>
              <span style={{
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--accent)',
                flexShrink: 0,
              }}>
                ✓
              </span>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--page-nav-text)' }}>
                  {d.decision}
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 8 }}>
                  — {d.rationale}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
