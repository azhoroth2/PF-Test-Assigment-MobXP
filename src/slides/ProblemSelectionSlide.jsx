import SlideLayout, { Tag, Callout } from './SlideLayout'

const REJECTIONS = [
  {
    name: 'Shift scheduling',
    reason: 'PF has no scheduling engine — can\'t correct what doesn\'t exist.',
    icon: '📋',
  },
  {
    name: 'Buddy punch',
    reason: 'Hardware problem. QR/RFID already solves it. Not a software layer.',
    icon: '👊',
  },
  {
    name: 'Worker mobile app',
    reason: 'Phase 2 — building without real factory pilot data is guesswork.',
    icon: '📱',
  },
  {
    name: 'Permit compliance',
    reason: 'Real pain, wrong sprint scope. Requires legal module PF doesn\'t have.',
    icon: '📜',
  },
]

const WINS = [
  'Sits between clock-in hardware and PF\'s existing compliance engine',
  'Prototypable in 4 screens — lean enough for design-partner validation',
  'AI has a specific, non-bullshit role: anomaly detection + confidence scoring',
  'Every competitor gap is addressable without hardware procurement',
]

export default function ProblemSelectionSlide() {
  return (
    <SlideLayout
      sectionNumber={8}
      sectionLabel="Problem Selection"
      title="Why This, Not That"
      subtitle="Explicit rejections — then why attendance correction is the right problem."
    >
      {/* Rejections */}
      <div style={{ marginBottom: 36 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#ef4444',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 14,
        }}>
          Rejected — with reason
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REJECTIONS.map((r) => (
            <div key={r.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '14px 20px',
              background: 'rgba(239,68,68,0.03)',
              border: '1px solid rgba(239,68,68,0.12)',
              borderRadius: 10,
            }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{r.icon}</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--page-nav-text)',
                  minWidth: 140,
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(239,68,68,0.4)',
                }}>
                  {r.name}
                </span>
                <span style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                }}>
                  {r.reason}
                </span>
              </div>
              <Tag color="#ef4444">Rejected</Tag>
            </div>
          ))}
        </div>
      </div>

      {/* Why attendance correction wins */}
      <div style={{ marginBottom: 24 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 14,
        }}>
          Why attendance correction wins
        </p>
        <div style={{
          padding: '20px 24px',
          background: 'rgba(0,185,80,0.04)',
          border: '1.5px solid rgba(0,185,80,0.2)',
          borderRadius: 12,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {WINS.map((w, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}>
                <span style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: 'var(--accent)',
                  color: 'var(--accent-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                  flexShrink: 0,
                }}>
                  ✓
                </span>
                <span style={{
                  fontSize: 14,
                  color: 'var(--page-nav-text)',
                  lineHeight: 1.45,
                  fontWeight: 500,
                }}>
                  {w}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
