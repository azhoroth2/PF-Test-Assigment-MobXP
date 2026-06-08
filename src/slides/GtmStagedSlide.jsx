import SlideLayout, { Tag, Callout } from './SlideLayout'

const STAGES = [
  {
    num: 1,
    title: 'Additional Discovery',
    duration: '0–8 wks',
    desc: 'Identify 1 existing PF client already facing the problem. No new sales effort — discovery runs inside an existing relationship via interview, observation, and shadowing.',
    gate: 'Problem confirmed as top-3 operational pain, willingness to pay premium established.',
    status: 'current',
  },
  {
    num: 2,
    title: 'Pilot Cohort',
    duration: '2–4 mo',
    desc: 'Pilot customer with mobile application for worker and everything else. Extend to 3–5 pilot clients building alongside them. Thin MVP built from what Stage 1 validated.',
    gate: '≥3 paid pilots convert within 90 days, sales cycle under 90 days.',
    status: 'next',
  },
  {
    num: 3,
    title: 'CEE Market Expansion',
    duration: 'Scale',
    desc: 'Proven motion scales outward step-by-step. Each new market gates on: product-market fit proven in existing base + local payroll integration investment justified by pipeline.',
    gate: 'Design-partner ≠ bespoke. Each feature must generalize into the product or it does not ship.',
    status: 'future',
  },
]

export default function GtmStagedSlide() {
  return (
    <SlideLayout
      sectionNumber={7}
      sectionLabel="Go-to-Market"
      title="Design-Partner Stages"
      subtitle="A phased approach to validate demand with real revenue before committing to full build."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {STAGES.map((s, i) => {
          const isCurrent = s.status === 'current'
          return (
            <div key={s.num} style={{
              display: 'flex',
              gap: 20,
              padding: '24px',
              background: 'var(--surface)',
              borderRadius: 14,
              border: isCurrent ? '2px solid var(--accent)' : '1px solid var(--border)',
              position: 'relative',
            }}>

              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: isCurrent ? 'var(--accent)' : 'var(--page-bg)',
                border: isCurrent ? 'none' : '2px solid var(--border)',
                color: isCurrent ? 'var(--accent-text)' : 'var(--page-nav-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 800,
                flexShrink: 0,
                zIndex: 1,
              }}>
                {s.num}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--page-nav-text)', margin: 0 }}>
                    {s.title}
                  </h3>
                  <Tag color="var(--text-secondary)" bg="rgba(127,150,178,0.12)">{s.duration}</Tag>
                </div>
                
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16, maxWidth: 800 }}>
                  {s.desc}
                </p>

                <div style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  padding: '12px 16px',
                  background: 'rgba(127,150,178,0.06)',
                  borderRadius: 8,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--page-nav-text)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>Gate:</span>
                  <span style={{ fontSize: 13, color: 'var(--page-nav-text)', lineHeight: 1.4, fontWeight: 600 }}>{s.gate}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Callout>Over-fitting risk: run 2-3 pilots in parallel — features average out to product-level, not custom to one client.</Callout>
    </SlideLayout>
  )
}
