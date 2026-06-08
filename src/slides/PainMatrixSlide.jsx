import SlideLayout from './SlideLayout'

const GREEN = { bg: 'rgba(0,185,80,0.08)', color: 'var(--accent)', icon: '✓' }
const AMBER = { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b', icon: '◐' }
const RED   = { bg: 'rgba(239,68,68,0.08)', color: '#ef4444', icon: '✗' }

function StatusCell({ status }) {
  const s = status === 'Y' ? GREEN : status === 'N' ? RED : AMBER
  return (
    <td style={{
      padding: '12px 14px',
      textAlign: 'center',
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 7,
        background: s.bg,
        color: s.color,
        fontSize: 14,
        fontWeight: 700,
      }}>
        {s.icon}
      </span>
    </td>
  )
}

function SeverityBar({ value }) {
  return (
    <td style={{
      padding: '12px 14px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          flex: 1,
          height: 6,
          background: 'var(--border)',
          borderRadius: 3,
          overflow: 'hidden',
          maxWidth: 60,
        }}>
          <div style={{
            height: '100%',
            width: `${(value / 5) * 100}%`,
            borderRadius: 3,
            background: value >= 4 ? '#ef4444' : value >= 3 ? '#f59e0b' : 'var(--text-muted)',
          }} />
        </div>
        <span style={{
          fontSize: 13,
          fontWeight: 700,
          color: value >= 4 ? '#ef4444' : value >= 3 ? '#f59e0b' : 'var(--text-muted)',
          fontVariantNumeric: 'tabular-nums',
          minWidth: 16,
        }}>
          {value}
        </span>
      </div>
    </td>
  )
}

function GapCell({ level }) {
  const color = level === 'High' ? 'var(--accent)' : level === 'Med' ? '#f59e0b' : '#ef4444'
  const bg = level === 'High' ? 'rgba(0,185,80,0.1)' : level === 'Med' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)'
  return (
    <td style={{
      padding: '12px 14px',
      textAlign: 'center',
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{
        display: 'inline-flex',
        padding: '3px 10px',
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 700,
        color,
        background: bg,
      }}>
        {level}
      </span>
    </td>
  )
}

const ROWS = [
  { pain: 'Missed clock-out / correction', severity: 5, pfSolve: 'Y', gap: 'High', proto: 'Y', winner: true },
  { pain: 'Buddy punch', severity: 4, pfSolve: 'N', gap: 'Low', proto: 'N', winner: false },
  { pain: 'Shift scheduling', severity: 4, pfSolve: 'N', gap: 'Low', proto: 'N', winner: false },
  { pain: 'Worker mobile app', severity: 3, pfSolve: 'N', gap: 'Med', proto: 'N', winner: false },
  { pain: 'Permit compliance', severity: 4, pfSolve: 'Partial', gap: 'Med', proto: 'N', winner: false },
  { pain: 'Pre-payroll reconciliation', severity: 5, pfSolve: 'Partial', gap: 'High', proto: 'Y', winner: false },
  { pain: 'GPS check-in', severity: 3, pfSolve: 'N', gap: 'Low', proto: 'N', winner: false },
]

const COLUMNS = ['Pain Point', 'Severity', 'PF Can Solve Now', 'Competitor Gap', 'Prototypable (4 screens)']

export default function PainMatrixSlide() {
  return (
    <SlideLayout
      sectionNumber={9}
      sectionLabel="Problem Selection"
      title="Pain Matrix"
      subtitle="Attendance correction is the only pain that scores green across all four columns."
    >
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
              {COLUMNS.map((col, i) => (
                <th key={i} style={{
                  padding: '12px 14px',
                  textAlign: i === 0 ? 'left' : 'center',
                  fontWeight: 700,
                  color: 'var(--page-nav-text)',
                  borderBottom: '1px solid var(--border)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  whiteSpace: 'nowrap',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.pain} style={{
                background: row.winner ? 'rgba(0,185,80,0.05)' : 'transparent',
              }}>
                <td style={{
                  padding: '12px 14px',
                  fontWeight: row.winner ? 700 : 600,
                  color: row.winner ? 'var(--accent)' : 'var(--page-nav-text)',
                  borderBottom: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}>
                  {row.pain}
                  {row.winner && (
                    <span style={{
                      marginLeft: 8,
                      fontSize: 10,
                      fontWeight: 800,
                      color: 'var(--accent-text)',
                      background: 'var(--accent)',
                      padding: '2px 8px',
                      borderRadius: 4,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}>
                      SELECTED
                    </span>
                  )}
                </td>
                <SeverityBar value={row.severity} />
                <StatusCell status={row.pfSolve} />
                <GapCell level={row.gap} />
                <StatusCell status={row.proto} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{
        marginTop: 20,
        fontSize: 13,
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
      }}>
        <span style={{ fontWeight: 700, color: 'var(--page-nav-text)' }}>Reading guide:</span>{' '}
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>✓</span> = Yes{' · '}
        <span style={{ color: '#f59e0b', fontWeight: 600 }}>◐</span> = Partial{' · '}
        <span style={{ color: '#ef4444', fontWeight: 600 }}>✗</span> = No.{' '}
        Every row except attendance correction has at least one blocking red cell.
      </p>
    </SlideLayout>
  )
}
