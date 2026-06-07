import SlideLayout, { Tag } from './SlideLayout'

const PERSONAS = [
  {
    role: 'Foreman (Mfg Shop Floor)',
    verdict: 'PRIMARY USER',
    stage: 'Stage 1',
    color: 'green',
    pain: 'Missed clock-outs, correction logging with no audit trail',
  },
  {
    role: 'Marta Kowalczyk (HR Manager, Mfg SMB 150–500)',
    verdict: 'PRIMARY BUYER',
    stage: 'Stage 1',
    color: 'green',
    pain: 'Pre-payroll reconciliation panic, PIP audit liability, approves corrections blind',
  },
  {
    role: 'Krzysztof Jabłoński (Payroll Admin)',
    verdict: 'DOWNSTREAM GATEKEEPER',
    stage: 'Stage 1 (Export)',
    color: 'green',
    pain: 'Optima/enova365 data quality, doubled PIP fines 2026, compliance accuracy',
  },
  {
    role: 'Tomasz Wiśniewski (Shift/Ops Manager, Logistics)',
    verdict: 'SECONDARY',
    stage: 'Stage 2',
    color: 'amber',
    pain: 'Same correction pain, different context. Needs scheduling before correction layer is useful',
  },
  {
    role: 'Agnieszka Nowicka (HR Coordinator, Staffing Agency)',
    verdict: 'LATER CHANNEL',
    stage: 'Stage 3',
    color: 'amber',
    pain: 'Permit expiry tracking, mass short-tenure onboarding, per-project billing',
  },
  {
    role: 'Oksana Kovalenko (Frontline Worker)',
    verdict: 'PHASE 2',
    stage: 'Deferred',
    color: 'grey',
    pain: 'No company email, language barriers, employer-app trust deficit. Waiting for worker app + SMS-OTP',
  },
  {
    role: 'Dawid Malinowski (Construction Site Manager)',
    verdict: 'LOWEST FIT',
    stage: 'Phase 3+',
    color: 'grey',
    pain: 'GPS offline, per-project labour costing, paper-based crews',
  },
]

export default function TwoUsersSlide() {
  return (
    <SlideLayout
      sectionNumber={7}
      sectionLabel="Personas"
      title="All Users — Who, When, Why"
      subtitle="7 distinct personas across the ecosystem, evaluated for stage fit and primary pain."
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
              <th style={thStyle}>Role</th>
              <th style={thStyle}>In-Scope Verdict</th>
              <th style={thStyle}>Stage Fit</th>
              <th style={thStyle}>Key Pain</th>
            </tr>
          </thead>
          <tbody>
            {PERSONAS.map((p, i) => {
              const isGreen = p.color === 'green'
              const isAmber = p.color === 'amber'
              const bg = isGreen ? 'rgba(0,185,80,0.06)' : isAmber ? 'rgba(245,158,11,0.06)' : 'transparent'
              const stageColor = isGreen ? 'var(--accent)' : isAmber ? '#f59e0b' : 'var(--text-secondary)'
              const isLast = i === PERSONAS.length - 1
              
              return (
                <tr key={i} style={{
                  background: bg,
                  borderBottom: isLast ? 'none' : '1px solid var(--border)',
                }}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--page-nav-text)' }}>
                    {p.role}
                  </td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'var(--text-secondary)' }}>
                      {p.verdict}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <Tag color={stageColor} bg={isGreen ? 'rgba(0,185,80,0.12)' : isAmber ? 'rgba(245,158,11,0.12)' : 'rgba(127,150,178,0.15)'}>
                      {p.stage}
                    </Tag>
                  </td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>
                    {p.pain}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </SlideLayout>
  )
}

const thStyle = {
  padding: '14px 16px',
  textAlign: 'left',
  fontWeight: 700,
  color: 'var(--page-nav-text)',
  borderBottom: '1px solid var(--border)',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: 0.6,
  whiteSpace: 'nowrap',
}

const tdStyle = {
  padding: '14px 16px',
  verticalAlign: 'middle',
}
