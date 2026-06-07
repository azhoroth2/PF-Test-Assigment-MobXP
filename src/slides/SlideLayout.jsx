export default function SlideLayout({
  sectionNumber,
  sectionLabel,
  title,
  subtitle,
  children,
  fullBleed = false,
  verticalCenter = false,
  validations = null,
}) {
  return (
    <div style={{
      minHeight: 'calc(100vh - 52px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: fullBleed ? 'stretch' : 'center',
      justifyContent: verticalCenter ? 'center' : 'flex-start',
      background: 'var(--page-bg)',
      overflowY: 'auto',
    }}>
      <div style={{
        width: '100%',
        maxWidth: fullBleed ? '100%' : 1160,
        padding: fullBleed ? '56px 0 0 0' : '56px 64px 64px',
        display: 'flex',
        flexDirection: 'column',
        flex: verticalCenter ? undefined : 1,
      }}>
        {/* Header Block with conditional padding for fullBleed */}
        <div style={{ padding: fullBleed ? '0 64px' : 0 }}>
          {/* Section label */}
          {sectionNumber && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
            }}>
              <span style={{
                fontSize: 11,
                fontWeight: 800,
                color: 'var(--accent)',
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {String(sectionNumber).padStart(2, '0')}
              </span>
              <div style={{
                width: 24,
                height: 1.5,
                background: 'var(--accent)',
                opacity: 0.4,
                borderRadius: 1,
              }} />
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}>
                {sectionLabel}
              </span>
            </div>
          )}

          {/* Title */}
          {title && (
            <h1 style={{
              fontSize: 42,
              fontWeight: 800,
              color: 'var(--page-nav-text)',
              letterSpacing: '-1.2px',
              lineHeight: 1.1,
              margin: 0,
              marginBottom: subtitle ? 12 : 32,
            }}>
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p style={{
              fontSize: 18,
              fontWeight: 400,
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              margin: 0,
              marginBottom: 40,
              maxWidth: 720,
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
          
          {/* Validations Footer */}
          {validations && validations.length > 0 && (
            <div style={{ marginTop: 'auto', paddingTop: 64 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
                padding: fullBleed ? '0 64px' : 0,
              }}>
                <div style={{ width: 16, height: 2, background: 'var(--accent)' }} />
                <span style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: 'var(--page-nav-text)',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                }}>
                  De-Risking / Validation Plan
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: fullBleed ? '0 64px' : 0 }}>
                {validations.map((h) => {
                  const riskColor = h.risk === 'Highest' ? '#ef4444' : h.risk === 'High' ? '#f59e0b' : h.risk === 'Medium' ? 'var(--text-secondary)' : 'var(--text-muted)'
                  const riskBg = h.risk === 'Highest' ? 'rgba(239,68,68,0.06)' : h.risk === 'High' ? 'rgba(245,158,11,0.04)' : 'transparent'

                  return (
                    <div key={h.id} style={{
                      padding: '16px 20px',
                      background: riskBg,
                      borderRadius: 12,
                      border: h.critical ? '1.5px solid rgba(239,68,68,0.2)' : '1px solid var(--border)',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                    }}>
                      {/* Risk badge */}
                      <div style={{
                        flexShrink: 0,
                        marginTop: 2,
                      }}>
                        <Tag color={riskColor}>{h.risk}</Tag>
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: 'var(--page-nav-text)',
                          lineHeight: 1.35,
                          marginBottom: 8,
                          marginTop: 0,
                        }}>
                          {h.question}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                          <div>
                            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4, marginTop: 0 }}>
                              Assumption
                            </p>
                            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                              {h.assumption}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4, marginTop: 0 }}>
                              Test method
                            </p>
                            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                              {h.test}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: 10, fontWeight: 700, color: h.critical ? '#ef4444' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4, marginTop: 0 }}>
                              If disconfirmed
                            </p>
                            <p style={{ fontSize: 12, color: h.critical ? '#ef4444' : 'var(--text-secondary)', lineHeight: 1.4, margin: 0, fontWeight: h.critical ? 600 : 400 }}>
                              {h.ifFails}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Shared sub-components ─────────────────────────────────────────────────── */

export function StatCard({ value, label, sublabel, accent = false }) {
  return (
    <div style={{
      flex: 1,
      minWidth: 200,
      padding: '28px 24px',
      background: 'var(--surface)',
      borderRadius: 14,
      border: accent ? '1.5px solid var(--accent)' : '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}>
      <span style={{
        fontSize: 36,
        fontWeight: 800,
        color: accent ? 'var(--accent)' : 'var(--page-nav-text)',
        letterSpacing: '-1px',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {value}
      </span>
      <span style={{
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--page-nav-text)',
        lineHeight: 1.35,
      }}>
        {label}
      </span>
      {sublabel && (
        <span style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          lineHeight: 1.4,
        }}>
          {sublabel}
        </span>
      )}
    </div>
  )
}

export function DataTable({ columns, rows, highlightRow, highlightColor = 'rgba(0,185,80,0.06)' }) {
  return (
    <div style={{
      borderRadius: 12,
      border: '1px solid var(--border)',
      overflow: 'hidden',
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 13,
        lineHeight: 1.4,
      }}>
        <thead>
          <tr style={{ background: 'var(--surface)' }}>
            {columns.map((col, i) => (
              <th key={i} style={{
                padding: '12px 16px',
                textAlign: col.align || 'left',
                fontWeight: 700,
                color: 'var(--page-nav-text)',
                borderBottom: '1px solid var(--border)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                whiteSpace: 'nowrap',
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              style={{
                background: highlightRow === rIdx ? highlightColor : 'transparent',
                borderBottom: rIdx < rows.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {row.map((cell, cIdx) => (
                <td key={cIdx} style={{
                  padding: '11px 16px',
                  color: typeof cell === 'object' ? cell.color : 'var(--text-secondary)',
                  fontWeight: typeof cell === 'object' ? (cell.bold ? 700 : 400) : (cIdx === 0 ? 600 : 400),
                  textAlign: columns[cIdx]?.align || 'left',
                  borderBottom: rIdx < rows.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  {typeof cell === 'object' ? cell.value : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Tag({ children, color = 'var(--accent)', bg }) {
  const bgColor = bg || (color === '#ef4444' ? 'rgba(239,68,68,0.1)' : color === '#f59e0b' ? 'rgba(245,158,11,0.1)' : 'rgba(0,185,80,0.1)')
  return (
    <span style={{
      display: 'inline-flex',
      padding: '3px 10px',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 600,
      color,
      background: bgColor,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}

export function FlowArrow() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px',
      flexShrink: 0,
    }}>
      <div style={{ width: 20, height: 1.5, background: 'var(--border)' }} />
      <div style={{
        width: 0, height: 0,
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: '7px solid var(--border)',
      }} />
    </div>
  )
}

export function FlowBox({ children, isNew, isExisting, isMissing }) {
  let borderStyle = '1.5px solid var(--border)'
  let bg = 'var(--surface)'
  let color = 'var(--page-nav-text)'
  if (isNew) { borderStyle = '2px solid var(--accent)'; bg = 'rgba(0,185,80,0.06)'; color = 'var(--accent)' }
  if (isMissing) { borderStyle = '2px dashed #ef4444'; bg = 'rgba(239,68,68,0.04)'; color = '#ef4444' }
  if (isExisting) { borderStyle = '1.5px solid var(--border)'; bg = 'var(--surface)' }

  return (
    <div style={{
      padding: '14px 20px',
      borderRadius: 10,
      border: borderStyle,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 13,
      fontWeight: 700,
      color,
      lineHeight: 1.3,
      minWidth: 120,
    }}>
      {children}
    </div>
  )
}

export function Callout({ children, icon = '→' }) {
  return (
    <div style={{
      padding: '16px 20px',
      background: 'var(--surface)',
      borderLeft: '3px solid var(--accent)',
      borderRadius: '0 10px 10px 0',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--page-nav-text)',
      lineHeight: 1.45,
      fontStyle: 'italic',
    }}>
      {children}
    </div>
  )
}
