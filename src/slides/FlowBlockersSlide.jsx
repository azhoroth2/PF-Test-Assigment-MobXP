import { useEffect, useState } from 'react'
import SlideLayout from './SlideLayout'

export default function FlowBlockersSlide() {
  const [iframeHeight, setIframeHeight] = useState(2000)

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'resize' && e.data.height) {
        setIframeHeight(e.data.height + 40) // Add a little padding to be safe
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <SlideLayout
      sectionNumber={11}
      sectionLabel="Flow & Prototype"
      title="Flowchart"
      subtitle="Interactive flow diagram showing how attendance data travels from factory floor to payroll."
      fullBleed
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: iframeHeight, transition: 'height 0.3s ease' }}>
        <iframe 
          src="/artifacts/attendance_correction_flow-v3.html"
          scrolling="no"
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'var(--page-bg)',
            overflow: 'hidden'
          }}
          title="Attendance Correction Flow Diagram"
        />
      </div>
    </SlideLayout>
  )
}
