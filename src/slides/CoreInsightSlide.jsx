import SlideLayout, { FlowArrow, FlowBox } from './SlideLayout'

export default function CoreInsightSlide() {
  return (
    <SlideLayout verticalCenter>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        padding: '0 32px',
      }}>
        {/* Overline */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 12,
        }}>
          <span style={{
            fontSize: 11,
            fontWeight: 800,
            color: 'var(--accent)',
            letterSpacing: 1.2,
            textTransform: 'uppercase',
          }}>
            09 — Core Insight
          </span>
        </div>

        {/* Big statement */}
        <h1 style={{
          fontSize: 44,
          fontWeight: 800,
          color: 'var(--page-nav-text)',
          letterSpacing: '-1.5px',
          lineHeight: 1.15,
          textAlign: 'center',
          margin: 0,
          marginBottom: 12,
          maxWidth: 700,
        }}>
          Garbage In,{' '}
          <span style={{ color: '#ef4444' }}>Garbage Out</span>
        </h1>

        <p style={{
          fontSize: 22,
          fontWeight: 500,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          margin: 0,
          marginBottom: 56,
          maxWidth: 600,
          lineHeight: 1.45,
        }}>
          PF already has the compliance engine.{' '}
          <span style={{ fontWeight: 700, color: 'var(--page-nav-text)' }}>
            The problem is what reaches it.
          </span>
        </p>

        {/* Pipeline diagram */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 0,
          marginBottom: 48,
          width: '100%',
          maxWidth: 900,
        }}>
          <FlowBox isExisting>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Hardware</div>
              Clock-in<br />(QR / RFID)
            </div>
          </FlowBox>
          <FlowArrow />
          <FlowBox isMissing>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>MISSING</div>
              Correction Layer
            </div>
          </FlowBox>
          <FlowArrow />
          <FlowBox isExisting>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Existing</div>
              PF Compliance<br />Engine
            </div>
          </FlowBox>
          <FlowArrow />
          <FlowBox isExisting>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Moat</div>
              Optima /<br />enova365
            </div>
          </FlowBox>
          <FlowArrow />
          <FlowBox isExisting>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Output</div>
              Payroll
            </div>
          </FlowBox>
        </div>

        {/* Bottom statement */}
        <div style={{
          padding: '20px 32px',
          background: 'var(--surface)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: '0 12px 12px 0',
          maxWidth: 640,
        }}>
          <p style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--page-nav-text)',
            lineHeight: 1.5,
            textAlign: 'center',
            margin: 0,
            fontStyle: 'italic',
          }}>
            "This is not a feature redesign. It is the gate that protects everything downstream."
          </p>
        </div>
      </div>
    </SlideLayout>
  )
}
