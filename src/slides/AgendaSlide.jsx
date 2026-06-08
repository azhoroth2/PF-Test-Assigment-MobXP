import SlideLayout from './SlideLayout'

const AGENDA_ITEMS = [
  { num: '01–02', label: 'Market & Opportunity', desc: 'Understanding the Polish blue-collar landscape and PeopleForce\'s unique moats.' },
  { num: '03–04', label: 'Competitive Landscape', desc: 'Where the global players fall short and why local context matters.' },
  { num: '05–06', label: 'Go-to-Market', desc: 'Validating demand through a staged design-partner approach.' },
  { num: '07–08', label: 'Problem Selection', desc: 'Why attendance correction is the perfect, contained wedge feature.' },
  { num: '09–11', label: 'Solution Design', desc: 'Architecture, core hypotheses, and explicit boundaries.' },
  { num: '12–13', label: 'Flow & Prototype', desc: 'From hardware to payroll: the complete interactive correction flow.' },
  { num: '14–15', label: 'AI & Validation', desc: 'The role of AI and the plan to validate our riskiest assumptions.' },
  { num: '16–17', label: 'Reflection & Roadmap', desc: 'Why I built this, lessons learned, and what comes next.' },
]

export default function AgendaSlide() {
  return (
    <SlideLayout
      sectionNumber={1}
      sectionLabel="Introduction"
      title="Agenda"
      subtitle="How we will navigate from market opportunity to the final solution."
    >
      <ul style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: '0 0 0 24px',
        margin: 0,
        listStyleType: 'disc',
        color: 'var(--accent)'
      }}>
        {AGENDA_ITEMS.map((item) => (
          <li key={item.num} style={{ paddingLeft: 8 }}>
            <span style={{
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--page-nav-text)',
              lineHeight: 1.4,
            }}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </SlideLayout>
  )
}
