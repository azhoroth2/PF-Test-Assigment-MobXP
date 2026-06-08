import SlideLayout, { FlowArrow, FlowBox, Tag } from './SlideLayout'

const DOES = [
  'Anomaly detection — flags missed clock-outs within 30 min post-shift',
  'Correction suggestion — AI-generated time + confidence score',
  'Human approval — foreman reviews, selects reason, confirms',
  'Clean data flows downstream — compliance engine gets validated entries',
]

const DOES_NOT = [
  { label: 'Shift scheduling', reason: 'No scheduling engine in PF yet' },
  { label: 'Worker app', reason: 'Phase 2 — needs pilot data' },
  { label: 'Hardware procurement', reason: 'QR/RFID already exists on factory floors' },
  { label: 'Biometric clock-in', reason: 'Banned in Poland — NSA ruling' },
]

export default function SolutionArchSlide() {
  return (
    <SlideLayout
      sectionNumber={13}
      sectionLabel="Solution Design"
      title="Solution"
      subtitle="Where the correction layer sits in PF's existing stack — and what it explicitly does not touch."
      validations={[
        {
          id: 'V8',
          risk: 'Low',
          question: 'Does pre-built format actually eliminate export errors in the wild?',
          assumption: 'Pre-formatted payroll export prevents formatting errors at the export step.',
          test: 'Pilot: count export errors before vs after pre-built format.',
          ifFails: 'Add pre-export validation step with error preview.',
        }
      ]}
    >
      {/* Stack diagram */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 0,
        marginBottom: 40,
        padding: '28px 20px',
        background: 'var(--surface)',
        borderRadius: 14,
        border: '1px solid var(--border)',
      }}>
        <FlowBox isExisting>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>Hardware</div>
            Clock-in<br />(QR / RFID)
          </div>
        </FlowBox>
        <FlowArrow />
        <FlowBox isNew>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>NEW — Designed here</div>
            Correction<br />Layer
          </div>
        </FlowBox>
        <FlowArrow />
        <FlowBox isExisting>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>Existing</div>
            PF Compliance<br />Engine
          </div>
        </FlowBox>

        <FlowArrow />
        <FlowBox isExisting>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>Output</div>
            Payroll
          </div>
        </FlowBox>
      </div>

      {/* Two columns: does / does not */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* What it does */}
        <div style={{
          flex: 1,
          minWidth: 320,
          padding: '24px',
          borderRadius: 14,
          border: '1.5px solid rgba(0,185,80,0.2)',
          background: 'rgba(0,185,80,0.03)',
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--accent)',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 16,
          }}>
            What correction layer does
          </p>
          {DOES.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              marginBottom: 12,
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
                {i + 1}
              </span>
              <span style={{
                fontSize: 14,
                color: 'var(--page-nav-text)',
                lineHeight: 1.45,
                fontWeight: 500,
              }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* What it does NOT */}
        <div style={{
          flex: 1,
          minWidth: 320,
          padding: '24px',
          borderRadius: 14,
          border: '1.5px solid rgba(239,68,68,0.15)',
          background: 'rgba(239,68,68,0.02)',
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#ef4444',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 16,
          }}>
            What it explicitly does NOT do
          </p>
          {DOES_NOT.map((item) => (
            <div key={item.label} style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              marginBottom: 12,
            }}>
              <span style={{
                fontSize: 14,
                color: '#ef4444',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: 1,
              }}>
                ✗
              </span>
              <div>
                <span style={{
                  fontSize: 14,
                  color: 'var(--page-nav-text)',
                  fontWeight: 700,
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(239,68,68,0.3)',
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  marginLeft: 8,
                }}>
                  — {item.reason}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
