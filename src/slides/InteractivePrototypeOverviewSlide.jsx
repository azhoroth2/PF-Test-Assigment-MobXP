import SlideLayout, { Tag } from './SlideLayout'

const SCREENS = [
  {
    num: 1,
    name: 'Foreman Shift Summary',
    device: 'Mobile',
    problem: '3 workers flagged after shift — one notification, one list, one tap.',
    route: '/',
  },
  {
    num: 2,
    name: 'Foreman Correction Flow',
    device: 'Mobile',
    problem: 'AI confidence score + pre-defined tap reasons — no typing on factory floor.',
    route: '/corrections',
  },
  {
    num: 3,
    name: 'HR Corrections Dashboard',
    device: 'Desktop',
    problem: 'AI reasoning trail visible per correction — Foreman\'s context surfaced, SLA countdown shown.',
    route: null,
    phase2: true,
  },
  {
    num: 4,
    name: 'HR Pre-Payroll AI Summary',
    device: 'Desktop',
    problem: 'Every flag expandable to source data + calculation — export locked until all acknowledged.',
    route: null,
    hero: true,
    phase2: true,
  },
]

export default function InteractivePrototypeOverviewSlide() {
  return (
    <SlideLayout
      sectionNumber={13}
      sectionLabel="Flow & Prototype"
      title="Interactive Prototype"
      subtitle="4 screens, each solving one specific blocker in the correction flow."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        {SCREENS.map((s) => (
          <div key={s.num} style={{
            padding: '24px',
            borderRadius: 14,
            border: s.hero ? '2px solid var(--accent)' : '1px solid var(--border)',
            background: s.hero ? 'rgba(0,185,80,0.03)' : 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            position: 'relative',
          }}>
            {s.hero && (
              <span style={{
                position: 'absolute',
                top: -10,
                right: 16,
                fontSize: 10,
                fontWeight: 800,
                color: 'var(--accent-text)',
                background: 'var(--accent)',
                padding: '3px 10px',
                borderRadius: 5,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                HERO Screen
              </span>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: s.hero ? 'var(--accent)' : 'var(--page-bg)',
                  border: s.hero ? 'none' : '1.5px solid var(--border)',
                  color: s.hero ? 'var(--accent-text)' : 'var(--page-nav-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 800,
                }}>
                  {s.num}
                </span>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--page-nav-text)' }}>
                  {s.name}
                </span>
              </div>
              <Tag
                color={s.device === 'Mobile' ? 'var(--accent)' : 'var(--text-secondary)'}
                bg={s.device === 'Mobile' ? 'rgba(0,185,80,0.1)' : 'rgba(127,150,178,0.12)'}
              >
                {s.device}
              </Tag>
            </div>

            <p style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              margin: 0,
              fontStyle: 'italic',
            }}>
              "{s.problem}"
            </p>

            {s.phase2 && (
              <div style={{
                marginTop: 'auto',
                paddingTop: 8,
              }}>
                <Tag color="var(--text-muted)" bg="rgba(127,150,178,0.08)">
                  Phase 2 — not prototyped
                </Tag>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        padding: '14px 20px',
        background: 'var(--surface)',
        borderRadius: 10,
        border: '1px solid var(--border)',
        fontSize: 13,
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
      }}>
        <span style={{ fontWeight: 700, color: 'var(--page-nav-text)' }}>→ Next slide:</span>{' '}
        Interactive prototype for screens 1 & 2 (Foreman mobile flow). Navigate using the Flowchart sidebar.
      </div>
    </SlideLayout>
  )
}
