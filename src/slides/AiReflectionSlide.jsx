import SlideLayout, { DataTable } from './SlideLayout'

const COLUMNS = [
  { label: 'Tool', align: 'left' },
  { label: 'What it helped with', align: 'left' },
  { label: 'What stayed mine', align: 'left' },
]

const ROWS = [
  [
    { value: 'Claude', bold: true, color: 'var(--page-nav-text)' },
    'Market research synthesis, persona validation, blocker mapping, interactive HTML artifacts.',
    'Problem selection, "correction layer not module redesign" framing, AI-where-not calls.',
  ],
  [
    { value: 'Perplexity', bold: true, color: 'var(--page-nav-text)' },
    'Competitive synthesis across 48 sources. Cross-referencing vendor claims against primary data.',
    'Phase 1/Phase 2 scope boundary. Design-partner model over horizontal build recommendation.',
  ],
  [
    { value: 'Google Antigravity', bold: true, color: 'var(--page-nav-text)' },
    'Build prototype and presentation.',
    'Presentation narrative and design decisions.',
  ],
]

const REJECTED = [
  {
    claim: 'Vendor-sourced "no-show" stat',
    reason: 'Confirmed confabulated — no primary source found after verification. Explicitly dropped from all materials.',
  },
]

const MINE = [
  'Problem selection — why attendance correction, not scheduling or buddy punch',
  '"Correction layer, not module redesign" framing',
  'AI-where-not calls — which AI uses to reject, not just which to include',
  'Phase 1 / Phase 2 scope boundary — what to prototype, what to defer',
  'Design-partner model over horizontal build recommendation',
]

export default function AiReflectionSlide() {
  return (
    <SlideLayout
      sectionNumber={17}
      sectionLabel="Reflection & Roadmap"
      title="AI Workflow Reflection"
      subtitle="What AI helped with, what it got wrong, and what stayed entirely mine."
    >
      {/* Tool table */}
      <div style={{ marginBottom: 32 }}>
        <DataTable columns={COLUMNS} rows={ROWS} />
      </div>

      {/* Rejected outputs */}
      <div style={{ marginBottom: 32 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#ef4444',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 12,
        }}>
          Rejected AI outputs
        </p>
        {REJECTED.map((r, i) => (
          <div key={i} style={{
            padding: '14px 20px',
            background: 'rgba(239,68,68,0.03)',
            border: '1px solid rgba(239,68,68,0.12)',
            borderRadius: 10,
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>✗</span>
            <div>
              <p style={{
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--page-nav-text)',
                marginBottom: 4,
                textDecoration: 'line-through',
                textDecorationColor: 'rgba(239,68,68,0.35)',
              }}>
                {r.claim}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                {r.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Decisions that stayed mine */}
      <div>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 12,
        }}>
          Decisions that stayed entirely mine
        </p>
        <div style={{
          padding: '20px 24px',
          background: 'rgba(0,185,80,0.03)',
          border: '1.5px solid rgba(0,185,80,0.15)',
          borderRadius: 12,
        }}>
          {MINE.map((m, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              marginBottom: i < MINE.length - 1 ? 10 : 0,
            }}>
              <span style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: 'var(--accent)',
                color: 'var(--accent-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 800,
                flexShrink: 0,
                marginTop: 1,
              }}>
                ✓
              </span>
              <span style={{
                fontSize: 14,
                color: 'var(--page-nav-text)',
                lineHeight: 1.45,
                fontWeight: 500,
              }}>
                {m}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
