import SlideLayout, { StatCard, Callout } from './SlideLayout'

export default function MarketRealitySlide() {
  return (
    <SlideLayout
      sectionNumber={2}
      sectionLabel="Market & Opportunity"
      title="Market Reality"
      subtitle="The blue-collar HR gap in Polish manufacturing is quantifiable, underserved, and growing."
    >
      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
        <StatCard
          value="7,500"
          label="Polish manufacturing & logistics SMBs"
          sublabel="ICP band: 50–249 employees"
          accent
        />
        <StatCard
          value="PLN 3k–50k"
          label="Fine per compliance violation"
          sublabel="Per worker — per event"
        />
        <StatCard
          value="73%"
          label="CEE manufacturing SMEs on Excel or paper"
          sublabel="HR processes not digitized"
        />
      </div>

      {/* Moats */}
      <div style={{ marginBottom: 32 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 14,
        }}>
          PF's 2 structural moats
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { icon: '🌐', label: 'Multilingual UI', desc: 'Polish + Ukrainian — critical for factory floor workforce' },
            { icon: '🔗', label: 'Native payroll integrations', desc: 'Optima / enova365 — locked into Polish compliance stack' },
          ].map((moat) => (
            <div key={moat.label} style={{
              flex: 1,
              minWidth: 280,
              padding: '20px 24px',
              background: 'var(--surface)',
              border: '1.5px solid var(--accent)',
              borderRadius: 12,
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 24, flexShrink: 0, lineHeight: 1 }}>{moat.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--page-nav-text)', marginBottom: 4 }}>
                  {moat.label}
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {moat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Callout>Why Poland & CEE? High density of manufacturing SMBs, complex local labor laws, and a massive shift from paper to digital currently underway.</Callout>
    </SlideLayout>
  )
}
