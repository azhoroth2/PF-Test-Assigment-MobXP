import SlideLayout, { Tag, Callout } from './SlideLayout'

const LOCALS = [
  {
    name: 'HRappka',
    features: ['GPS/QR clock-in', 'Offline mode', 'Shift scheduling', 'Worker mobile app'],
    pricing: 'PLN 10–12/user/mo',
    strength: 'Feature-complete for blue-collar',
  },
  {
    name: 'inEwi / Symfonia',
    features: ['QR clock-in', 'GPS check-in', 'Shift scheduling', 'Leave management'],
    pricing: 'PLN 11–13/user/mo',
    strength: 'Entrenched in Polish HR market via Symfonia',
  },
  {
    name: 'Kadromierz',
    features: ['Shift scheduling', 'QR clock-in', 'Worker mobile app', 'Contract templates'],
    pricing: 'PLN 10/user/mo',
    strength: 'Strong scheduling + staffing agency channel',
  },
]

export default function CompetitiveLocalSlide() {
  return (
    <SlideLayout
      sectionNumber={4}
      sectionLabel="Competitive Landscape"
      title="Local Incumbents"
      subtitle="Polish HR tools already own the blue-collar features PF lacks — and the customer relationships."
    >
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {LOCALS.map((l) => (
          <div key={l.name} style={{
            flex: 1,
            minWidth: 280,
            padding: '24px',
            background: 'var(--surface)',
            borderRadius: 14,
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--page-nav-text)', margin: 0 }}>
                {l.name}
              </p>
              <Tag color="var(--text-secondary)" bg="rgba(127,150,178,0.12)">
                {l.pricing}
              </Tag>
            </div>

            <p style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
              margin: 0,
              fontStyle: 'italic',
            }}>
              {l.strength}
            </p>

            <div>
              <p style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                marginBottom: 8,
              }}>
                Features PF lacks
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {l.features.map((f) => (
                  <Tag key={f} color="#ef4444">{f}</Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key point */}
      <div style={{
        padding: '20px 24px',
        background: 'rgba(239,68,68,0.04)',
        border: '1px solid rgba(239,68,68,0.15)',
        borderRadius: 12,
        marginBottom: 24,
      }}>
        <p style={{
          fontSize: 14,
          color: 'var(--page-nav-text)',
          lineHeight: 1.5,
          margin: 0,
        }}>
          <span style={{ fontWeight: 700 }}>Key point:</span>{' '}
          Locals have the blue-collar features PF lacks <span style={{ fontWeight: 700, color: '#ef4444' }}>AND</span>{' '}
          own the market relationships. Entrenched pricing at PLN 10–13/user/month. Switching costs are real.
        </p>
      </div>

      <Callout>"This is differentiated displacement. Not greenfield entry."</Callout>
    </SlideLayout>
  )
}
