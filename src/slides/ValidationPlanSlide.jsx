import SlideLayout, { Tag } from './SlideLayout'

const HYPOTHESES = [
  {
    id: 'V1',
    risk: 'Highest',
    question: 'Is missed clock-out actually the core problem — or a rare edge case?',
    assumption: 'Missed clock-outs happen frequently enough to justify a dedicated correction layer.',
    test: 'Discovery interviews with 20–30 foremen: frequency of missed clock-outs per shift.',
    ifFails: 'Problem selection is wrong. Pivot to a different pain point entirely.',
    critical: true,
  },
  {
    id: 'V4',
    risk: 'Highest',
    question: 'Is the confidence score actually trustworthy — calibration unproven?',
    assumption: 'AI can generate a reliable confidence score from 4 signals.',
    test: 'Backtest against 90 days of historical clock-in/out data from 3 pilot factories.',
    ifFails: 'AI feature is wrong — confidence score becomes misleading, not helpful.',
    critical: true,
  },
  {
    id: 'V3',
    risk: 'High',
    question: 'Will foremen trust and use bulk-approve without re-opening each item?',
    assumption: 'At ≥90% confidence, foremen will accept bulk approval without reviewing individually.',
    test: 'Usability testing with 5 foremen: measure tap-through rate vs individual review rate.',
    ifFails: 'Bulk-approve UX needs redesign — possibly show summary of all items before confirm.',
  },
  {
    id: 'V7',
    risk: 'High',
    question: 'Does the expandable audit trail create genuine HR confidence or theater?',
    assumption: 'HR managers will review expanded AI reasoning and feel confident enough to approve.',
    test: 'Task-based testing with 3 HR managers: can they explain why a correction was approved?',
    ifFails: 'Audit trail is decoration. Need to redesign what information is surfaced.',
  },
  {
    id: 'V6',
    risk: 'Medium',
    question: 'Is a 24h SLA realistic for a foreman running the next shift?',
    assumption: 'Foremen can review and submit corrections within 24 hours of shift end.',
    test: 'Pilot data: measure median time from notification to submission.',
    ifFails: 'Extend SLA to 48h or add shift-start reminder notification.',
  },
  {
    id: 'V2',
    risk: 'Medium',
    question: 'Is +30 min the right notification delay?',
    assumption: '30 minutes post-shift gives foreman enough time to finish handoff.',
    test: 'A/B test: 15 min vs 30 min vs 45 min delay — measure open rate + completion rate.',
    ifFails: 'Adjust delay — likely to 45 min based on shift handoff duration data.',
  },
  {
    id: 'V5',
    risk: 'Medium',
    question: 'Do pre-defined tap reasons cover ≥85% of real correction causes?',
    assumption: 'Three reason categories (Schedule default, Dispute, Other) cover most cases.',
    test: 'Pilot data: measure frequency of "Other" reason selection.',
    ifFails: 'Add 1–2 more reason categories based on "Other" freetext analysis.',
  },
  {
    id: 'V8',
    risk: 'Low',
    question: 'Does pre-built format actually eliminate export errors in the wild?',
    assumption: 'Pre-formatted payroll export prevents formatting errors at the export step.',
    test: 'Pilot: count export errors before vs after pre-built format.',
    ifFails: 'Add pre-export validation step with error preview.',
  },
]

export default function ValidationPlanSlide() {
  return (
    <SlideLayout
      sectionNumber={15}
      sectionLabel="AI & Validation"
      title="Validation Plan"
      subtitle="8 hypotheses in de-risk priority order. V1 and V4 are existential — if they fail, the problem or AI feature is wrong."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {HYPOTHESES.map((h) => {
          const riskColor = h.risk === 'Highest' ? '#ef4444' : h.risk === 'High' ? '#f59e0b' : h.risk === 'Medium' ? 'var(--text-secondary)' : 'var(--text-muted)'
          const riskBg = h.risk === 'Highest' ? 'rgba(239,68,68,0.06)' : h.risk === 'High' ? 'rgba(245,158,11,0.04)' : 'transparent'

          return (
            <div key={h.id} style={{
              padding: '16px 20px',
              background: riskBg,
              borderRadius: 12,
              border: h.critical ? '1.5px solid rgba(239,68,68,0.2)' : '1px solid var(--border)',
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}>
              {/* ID badge */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                flexShrink: 0,
                minWidth: 40,
              }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: h.critical ? '#ef4444' : 'var(--page-nav-text)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {h.id}
                </span>
                <Tag color={riskColor}>{h.risk}</Tag>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--page-nav-text)',
                  lineHeight: 1.35,
                  marginBottom: 8,
                }}>
                  {h.question}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>
                      Assumption
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                      {h.assumption}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>
                      Test method
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                      {h.test}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: h.critical ? '#ef4444' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>
                      If disconfirmed
                    </p>
                    <p style={{ fontSize: 12, color: h.critical ? '#ef4444' : 'var(--text-secondary)', lineHeight: 1.4, margin: 0, fontWeight: h.critical ? 600 : 400 }}>
                      {h.ifFails}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SlideLayout>
  )
}
