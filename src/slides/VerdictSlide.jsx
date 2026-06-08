import SlideLayout from './SlideLayout'

export default function VerdictSlide() {
  return (
    <SlideLayout
      sectionNumber={5}
      sectionLabel="Verdict"
      title="Should PeopleForce Enter Blue-Collar?"
      subtitle="Direct verdict. No hedging."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 40 }}>
        
        {/* Anchor Verdict */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
          padding: '32px 40px',
          background: 'rgba(0,185,80,0.05)',
          border: '2px solid var(--accent)',
          borderRadius: 16,
        }}>
          <h2 style={{
            fontSize: 48,
            fontWeight: 900,
            color: 'var(--accent)',
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-1px'
          }}>
            YES — as a platform extension.
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ padding: '6px 14px', background: 'var(--surface)', borderRadius: 8, fontSize: 14, fontWeight: 700, color: 'var(--page-nav-text)', border: '1px solid var(--border)' }}>Not a separate product.</span>
            <span style={{ padding: '6px 14px', background: 'var(--surface)', borderRadius: 8, fontSize: 14, fontWeight: 700, color: 'var(--page-nav-text)', border: '1px solid var(--border)' }}>Not a horizontal build.</span>
            <span style={{ padding: '6px 14px', background: 'var(--surface)', borderRadius: 8, fontSize: 14, fontWeight: 700, color: 'var(--page-nav-text)', border: '1px solid var(--border)' }}>Not all of CEE at once.</span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>The condition:</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--page-nav-text)' }}>Build as extension of existing platform • Enter through existing customers • Poland first</span>
          </div>
        </div>

        {/* Three Reasons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {/* Reason 1 */}
          <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--page-bg)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--page-nav-text)' }}>1</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--page-nav-text)', margin: 0, lineHeight: 1.3 }}>ICP is real & countable</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              7,500 Polish manufacturing/logistics SMBs in the exact size band. Addressable without building new sales infrastructure (existing PF base is the entry point).
            </p>
          </div>
          {/* Reason 2 */}
          <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--page-bg)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--page-nav-text)' }}>2</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--page-nav-text)', margin: 0, lineHeight: 1.3 }}>Moats are already paid for</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Multilingual UI and native Optima/enova365 integrations exist. Marginal cost of extending the platform is low. No global competitor can replicate these without years of localization.
            </p>
          </div>
          {/* Reason 3 */}
          <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--page-bg)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--page-nav-text)' }}>3</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--page-nav-text)', margin: 0, lineHeight: 1.3 }}>Window is open now</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Category is venture-validated globally ($265M+ raised into frontline WFM since 2022). No funded CEE-native leader exists. Local incumbents are bootstrapped and lack platform breadth.
            </p>
          </div>
        </div>

        {/* Counter & Reframe */}
        <div style={{
          padding: '24px',
          background: 'var(--surface)',
          borderRadius: 12,
          borderLeft: '4px solid #f59e0b',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1 }}>Honest Counter</span>
          </div>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--page-nav-text)', margin: 0, fontStyle: 'italic' }}>
            "But local competitors already serve this niche."
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--page-nav-text)' }}>The Reframe:</strong> HRappka and inEwi have the blue-collar features. They do not have the HRM platform, the payroll integrations, or the multilingual product foundation. PF's play is not feature parity — it is platform consolidation for buyers currently running two systems.
          </p>
        </div>

      </div>
    </SlideLayout>
  )
}
