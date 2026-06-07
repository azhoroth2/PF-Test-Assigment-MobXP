import SlideLayout, { DataTable, Tag } from './SlideLayout'

const COLUMNS = [
  { label: 'Dimension', align: 'left' },
  { label: 'Bespoke', align: 'left' },
  { label: 'Design-Partner', align: 'left' },
  { label: 'Full Horizontal', align: 'left' },
]

const ROWS = [
  [
    'Approach',
    'Build for 1 customer',
    { value: 'Co-build with 3–5 pilots', bold: true, color: 'var(--page-nav-text)' },
    'Build for the market',
  ],
  [
    'Investment',
    'Lowest',
    { value: 'Moderate', bold: false, color: 'var(--text-secondary)' },
    'Highest — full eng + GTM',
  ],
  [
    'Validation',
    'One data point',
    { value: 'Real revenue from real customers', bold: true, color: 'var(--accent)' },
    'Assumed demand',
  ],
  [
    'Risk',
    'Over-fit to one client',
    { value: 'Moderate — mitigated by parallel pilots', bold: false, color: 'var(--text-secondary)' },
    'High — large capex before demand proven',
  ],
  [
    'Speed',
    'Fast',
    { value: '2–4 months to pilot', bold: false, color: 'var(--text-secondary)' },
    'Slow — 6–12 months to market',
  ],
  [
    'Moat leverage',
    'Incidental',
    { value: 'Moats already funded — extend, don\'t rebuild', bold: true, color: 'var(--accent)' },
    'Requires re-justifying moat ROI',
  ],
]

const VERDICT_ROW = [
  { value: 'Verdict', bold: true, color: 'var(--page-nav-text)' },
  { value: '⚠ Risky — one data point is not validation', color: '#f59e0b' },
  { value: '✓ Recommended — validates demand on real revenue before major capex', bold: true, color: 'var(--accent)' },
  { value: '✗ Premature — unvalidated at this stage', color: '#ef4444' },
]

export default function GtmOptionsSlide() {
  const allRows = [...ROWS, VERDICT_ROW]

  return (
    <SlideLayout
      sectionNumber={5}
      sectionLabel="Go-to-Market"
      title="Three Options"
      subtitle="Design-partner model wins: moats are already funded, feature gap is finite, validates demand on real revenue before major capex."
    >
      <DataTable
        columns={COLUMNS}
        rows={allRows}
        highlightRow={allRows.length - 1}
        highlightColor="rgba(0,185,80,0.06)"
      />

    </SlideLayout>
  )
}
