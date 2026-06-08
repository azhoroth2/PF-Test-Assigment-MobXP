import SlideLayout from './SlideLayout'

const HYPOTHESES = [
  {
    type: 'Problem — Foreman',
    belief: 'We believe a Foreman spends 30–60 minutes per shift manually tracking missed clock-outs and logging corrections without an audit trail. This creates fragmented data HR cannot verify.',
    threshold: 'Confirmed if ≥3 of 5 Foremen name this a daily operational pain.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.05)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    type: 'Problem — HR Manager',
    belief: 'We believe an HR Manager spends 4–8 hours monthly on manual attendance reconciliation before payroll. Errors generate compliance violations and PIP fine risk of PLN 1k–30k.',
    threshold: 'Confirmed if ≥3 of 5 HR managers name this a top-3 pain.',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.03)',
    border: 'rgba(239,68,68,0.15)',
  },
  {
    type: 'Solution',
    belief: 'We believe if the system automatically detects attendance anomalies and proposes corrections with an audit trail — Foreman confirms in 2 minutes instead of 30, HR closes the payroll cycle in 1 hour instead of 8.',
    threshold: 'Confirmed when pre-payroll reconciliation time drops 70%+ in pilot.',
    color: 'var(--accent)',
    bg: 'rgba(0,185,80,0.04)',
    border: 'rgba(0,185,80,0.2)',
  },
]

export default function CoreInsightSlide() {
  return (
    <SlideLayout
      sectionNumber={11}
      sectionLabel="Key Hypotheses"
      title="Key Hypotheses"
      subtitle="Three core hypotheses that must be true for this product to succeed, with explicit confirmation thresholds."
    >
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'stretch' }}>
        {HYPOTHESES.map((h) => (
          <div key={h.type} style={{
            flex: 1,
            minWidth: 300,
            padding: '24px',
            background: 'var(--surface)',
            borderRadius: 14,
            border: `1.5px solid ${h.border}`,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <p style={{
              fontSize: 11,
              fontWeight: 800,
              color: h.color,
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 16,
            }}>
              {h.type}
            </p>
            
            <p style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--page-nav-text)',
              lineHeight: 1.5,
              marginBottom: 24,
              flex: 1,
            }}>
              "{h.belief}"
            </p>

            <div style={{
              padding: '12px 16px',
              background: h.bg,
              borderRadius: 8,
              border: `1px solid ${h.border}`,
            }}>
              <p style={{
                fontSize: 10,
                fontWeight: 700,
                color: h.color,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 4,
                margin: 0,
              }}>
                Confirmation Threshold
              </p>
              <p style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {h.threshold}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}
