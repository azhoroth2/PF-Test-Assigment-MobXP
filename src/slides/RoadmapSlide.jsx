import SlideLayout, { Tag, Callout } from './SlideLayout'

const PHASES = [
  {
    num: 1,
    title: 'Correction Layer',
    timeline: 'This assignment',
    desc: 'Foreman mobile + HR Manager desktop. Attendance correction flow with AI-assisted anomaly detection and confidence scoring.',
    status: 'current',
    items: ['Foreman shift summary (mobile)', 'Foreman correction flow (mobile)', 'HR corrections dashboard (desktop)', 'HR pre-payroll AI summary (desktop)'],
  },
  {
    num: 2,
    title: 'In-depth Validation',
    timeline: 'Next step',
    desc: 'In-depth validation + consulting with GTM and CSM representatives.',
    status: 'next',
    items: ['Validation with GTM', 'Consulting with CSM', 'Iterate feedback'],
  },
  {
    num: 3,
    title: 'Worker Mobile App',
    timeline: 'Design-partner phase',
    desc: 'Multilingual worker mobile app + SMS-OTP login (no company email required). Workers see their own attendance, dispute corrections, submit leave.',
    status: 'future',
    items: ['SMS-OTP onboarding (no company email)', 'Worker attendance view', 'Correction dispute flow', 'Multilingual (PL + UA + EN)'],
  },
  {
    num: 4,
    title: 'CEE Expansion',
    timeline: 'Future phase',
    desc: 'CEE market entry — CEE payroll integration feasible within budget.',
    status: 'future',
    items: ['CEE payroll integration (assessment)', 'CEE labor law compliance', 'CEE language support', 'Cross-market reporting'],
  },
]

export default function RoadmapSlide() {
  return (
    <SlideLayout
      sectionNumber={18}
      sectionLabel="Reflection & Roadmap"
      title="What's Next — Phase Roadmap"
      subtitle="Each phase is gated. No phase begins without the previous one proving revenue."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 32 }}>
        {PHASES.map((phase, idx) => {
          const isCurrent = phase.status === 'current'
          const isNext = phase.status === 'next'
          const borderColor = isCurrent ? 'var(--accent)' : isNext ? 'var(--border)' : 'var(--border)'
          const bg = isCurrent ? 'rgba(0,185,80,0.03)' : 'transparent'

          return (
            <div key={phase.num}>
              {/* Connector */}
              {idx > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '4px 0',
                }}>
                  <div style={{
                    width: 1.5,
                    height: 20,
                    background: isCurrent ? 'var(--accent)' : 'var(--border)',
                  }} />
                </div>
              )}

              <div style={{
                padding: '20px 24px',
                borderRadius: 14,
                border: `${isCurrent ? '2px' : '1px'} solid ${borderColor}`,
                background: bg,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                  flexWrap: 'wrap',
                  gap: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      background: isCurrent ? 'var(--accent)' : 'var(--surface)',
                      border: isCurrent ? 'none' : '1.5px solid var(--border)',
                      color: isCurrent ? 'var(--accent-text)' : 'var(--page-nav-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 800,
                    }}>
                      {phase.num}
                    </span>
                    <span style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: isCurrent ? 'var(--accent)' : 'var(--page-nav-text)',
                    }}>
                      {phase.title}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Tag
                      color={isCurrent ? 'var(--accent)' : 'var(--text-secondary)'}
                      bg={isCurrent ? 'rgba(0,185,80,0.1)' : 'rgba(127,150,178,0.12)'}
                    >
                      {phase.timeline}
                    </Tag>
                    {isCurrent && (
                      <span style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                      }} />
                    )}
                  </div>
                </div>

                <p style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: 14,
                }}>
                  {phase.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {phase.items.map((item) => (
                    <span key={item} style={{
                      padding: '4px 10px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--page-nav-text)',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 6,
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SlideLayout>
  )
}
