import SlideLayout from './SlideLayout'

const FOREMAN = {
  name: 'Foreman',
  emoji: '🏗️',
  device: 'Mobile',
  traits: [
    { label: 'Environment', value: 'Factory floor — gloves, noise, poor lighting' },
    { label: 'Input method', value: 'One thumb, no typing' },
    { label: 'Time budget', value: '5 minutes between shift handoffs' },
    { label: 'Scope', value: 'Manages 20+ workers simultaneously' },
    { label: 'Knowledge gap', value: 'Doesn\'t know individual departure times' },
    { label: 'Stake', value: 'Payroll accuracy — errors cost workers money' },
  ],
}

const HR = {
  name: 'HR Manager (Marta)',
  emoji: '👩‍💼',
  device: 'Desktop',
  traits: [
    { label: 'Environment', value: 'Office — desk, keyboard, multiple tabs' },
    { label: 'Primary fear', value: 'Compliance liability — PIP audit' },
    { label: 'Pain cycle', value: 'Pre-payroll reconciliation panic (monthly)' },
    { label: 'Current workflow', value: 'Approves corrections blind — no context' },
    { label: 'Stake', value: 'Legal risk — PLN 3k–50k fine per violation' },
    { label: 'Needs from foreman', value: 'Correction reasons + timing context' },
  ],
}

function PersonaCard({ persona }) {
  return (
    <div style={{
      flex: 1,
      minWidth: 340,
      borderRadius: 14,
      border: '1px solid var(--border)',
      overflow: 'hidden',
      background: 'var(--surface)',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(0,185,80,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
          }}>
            {persona.emoji}
          </span>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--page-nav-text)', margin: 0, lineHeight: 1.2 }}>
              {persona.name}
            </p>
          </div>
        </div>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--text-secondary)',
          background: 'var(--page-bg)',
          padding: '4px 10px',
          borderRadius: 6,
          border: '1px solid var(--border)',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          {persona.device}
        </span>
      </div>

      {/* Traits */}
      <div style={{ padding: '16px 24px 20px' }}>
        {persona.traits.map((t, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: 12,
            alignItems: 'baseline',
            padding: '10px 0',
            borderBottom: i < persona.traits.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              minWidth: 110,
              flexShrink: 0,
            }}>
              {t.label}
            </span>
            <span style={{
              fontSize: 13,
              color: 'var(--page-nav-text)',
              lineHeight: 1.4,
              fontWeight: 500,
            }}>
              {t.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TwoUsersSlide() {
  return (
    <SlideLayout
      sectionNumber={10}
      sectionLabel="Solution Design"
      title="The Two Users That Matter"
      subtitle="Two roles, two devices, one shared outcome: clean data reaching payroll."
    >
      <div style={{ display: 'flex', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
        <PersonaCard persona={FOREMAN} />
        <PersonaCard persona={HR} />
      </div>

      {/* Phase 2 note */}
      <div style={{
        padding: '12px 20px',
        background: 'var(--surface)',
        borderRadius: 10,
        border: '1px solid var(--border)',
        display: 'flex',
        gap: 10,
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          background: 'var(--border)',
          padding: '2px 8px',
          borderRadius: 4,
        }}>
          Phase 2
        </span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Worker mobile app — out of scope for correction layer. Requires factory pilot data to design meaningfully.
        </span>
      </div>
    </SlideLayout>
  )
}
