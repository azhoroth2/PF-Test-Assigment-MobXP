import SlideLayout from './SlideLayout'

export default function FlowBlockersSlide() {
  return (
    <SlideLayout
      sectionNumber={11}
      sectionLabel="Flow & Prototype"
      title="End-to-End Flow + 8 Blockers"
      subtitle="Interactive flow diagram showing how attendance data travels from factory floor to payroll."
      fullBleed
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minHeight: '80vh' }}>
        <iframe 
          src="/artifacts/attendance_correction_flow-v3.html"
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'var(--page-bg)',
          }}
          title="Attendance Correction Flow Diagram"
        />
      </div>
    </SlideLayout>
  )
}
