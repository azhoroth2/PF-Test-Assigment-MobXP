import SlideLayout, { Callout } from './SlideLayout'

const COMPETITORS = ['PF', 'Connecteam', 'Quinyx', 'Deputy', 'Factorial', 'WorkJam', 'Jibble']

const FEATURES = [
  { feature: 'Clock-in (QR/RFID)',      scores: [0, 1, 1, 1, 0, 1, 1], pfUnique: false, pfZero: true },
  { feature: 'Shift scheduling',        scores: [0, 1, 1, 1, 0, 1, 0], pfUnique: false, pfZero: true },
  { feature: 'Kiosk mode',              scores: [0, 1, 1, 1, 0, 1, 1], pfUnique: false, pfZero: true },
  { feature: 'GPS check-in',            scores: [0, 1, 1, 1, 0, 1, 1], pfUnique: false, pfZero: true },
  { feature: 'Offline mode',            scores: [0, 1, 0, 1, 0, 0, 0], pfUnique: false, pfZero: true },
  { feature: 'Worker mobile app',       scores: [0, 1, 1, 1, 0, 1, 1], pfUnique: false, pfZero: true },
  { feature: 'Multilingual UI (PL+UA)', scores: [1, 0, 0, 0, 0, 0, 0], pfUnique: true,  pfZero: false },
  { feature: 'Polish payroll (Optima/enova)', scores: [1, 0, 0, 0, 0, 0, 0], pfUnique: true,  pfZero: false },
  { feature: 'Core HR / Leave mgmt',    scores: [1, 0, 1, 0, 1, 0, 0], pfUnique: false, pfZero: false },
  { feature: 'Compliance engine',        scores: [1, 0, 1, 0, 1, 0, 0], pfUnique: false, pfZero: false },
]

function Cell({ value, highlight }) {
  const icon = value ? '✓' : '—'
  const color = value ? 'var(--accent)' : 'var(--text-muted)'
  return (
    <td style={{
      padding: '10px 12px',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: value ? 700 : 400,
      color,
      borderBottom: '1px solid var(--border)',
      background: highlight || 'transparent',
    }}>
      {icon}
    </td>
  )
}

export default function CompetitiveGlobalSlide() {
  // Score totals per competitor
  const totals = COMPETITORS.map((_, ci) =>
    FEATURES.reduce((sum, f) => sum + f.scores[ci], 0)
  )
  const maxTotal = Math.max(...totals)

  return (
    <SlideLayout
      sectionNumber={3}
      sectionLabel="Competitive Landscape"
      title="Global Players"
      subtitle="Feature-by-feature comparison — PF vs global workforce management tools."
    >
      <div style={{
        borderRadius: 12,
        border: '1px solid var(--border)',
        overflow: 'hidden',
        marginBottom: 24,
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
          lineHeight: 1.4,
        }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: 700,
                color: 'var(--page-nav-text)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                borderBottom: '1px solid var(--border)',
                minWidth: 180,
              }}>
                Feature
              </th>
              {COMPETITORS.map((c, i) => (
                <th key={c} style={{
                  padding: '12px 10px',
                  textAlign: 'center',
                  fontWeight: i === 0 ? 800 : 600,
                  color: i === 0 ? 'var(--accent)' : 'var(--page-nav-text)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 0.4,
                  borderBottom: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((f) => {
              const rowBg = f.pfUnique
                ? 'rgba(0,185,80,0.05)'
                : f.pfZero
                ? 'rgba(239,68,68,0.03)'
                : 'transparent'
              return (
                <tr key={f.feature}>
                  <td style={{
                    padding: '10px 16px',
                    fontWeight: 600,
                    color: f.pfUnique ? 'var(--accent)' : f.pfZero ? '#ef4444' : 'var(--page-nav-text)',
                    borderBottom: '1px solid var(--border)',
                    background: rowBg,
                    fontSize: 13,
                  }}>
                    {f.feature}
                    {f.pfUnique && (
                      <span style={{
                        marginLeft: 8,
                        fontSize: 10,
                        fontWeight: 700,
                        color: 'var(--accent)',
                        background: 'rgba(0,185,80,0.1)',
                        padding: '2px 6px',
                        borderRadius: 4,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}>
                        MOAT
                      </span>
                    )}
                    {f.pfZero && (
                      <span style={{
                        marginLeft: 8,
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#ef4444',
                        background: 'rgba(239,68,68,0.08)',
                        padding: '2px 6px',
                        borderRadius: 4,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}>
                        GAP
                      </span>
                    )}
                  </td>
                  {f.scores.map((s, ci) => (
                    <Cell key={ci} value={s} highlight={rowBg} />
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Score bars */}
      <div style={{ marginBottom: 24 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 12,
        }}>
          Feature coverage score
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {COMPETITORS.map((c, i) => (
            <div key={c} style={{ flex: 1, minWidth: 100 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: i === 0 ? 800 : 600,
                  color: i === 0 ? 'var(--accent)' : 'var(--page-nav-text)',
                }}>
                  {c}
                </span>
                <span style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {totals[i]}/{FEATURES.length}
                </span>
              </div>
              <div style={{
                height: 6,
                background: 'var(--border)',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${(totals[i] / maxTotal) * 100}%`,
                  background: i === 0 ? 'var(--accent)' : 'var(--text-secondary)',
                  borderRadius: 3,
                  transition: 'width 300ms ease-out',
                  opacity: i === 0 ? 1 : 0.5,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Callout>"Global players have the features. They don't have the moats."</Callout>
    </SlideLayout>
  )
}
