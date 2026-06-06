import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './tokens.css'
import ShiftSummary from './screens/ShiftSummary'
import CorrectionFlow from './screens/CorrectionFlow'
import PerWorkerCard from './screens/PerWorkerCard'
import Confirmation from './screens/Confirmation'
import Flowchart from './components/Flowchart'
import HrRequest from './screens/HrRequest'

const PHONE_W = 390
const PHONE_H = 844

export default function App() {
  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        background: '#ffffff',
      }}>
        {/* Flowchart — sticky sidebar */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          padding: '32px 16px 32px 32px',
          flexShrink: 0,
          background: '#ffffff',
          borderRight: '1px solid #e8ecf0',
        }}>
          <Flowchart />
        </div>

        {/* Phone — centered horizontally and vertically */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'stretch',
          minHeight: '100vh',
        }}>
        <div style={{
          flex: 1,
          margin: '32px',
          borderRadius: 16,
          background: '#E8ECF0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div style={{
          width: PHONE_W,
          height: PHONE_H,
          maxWidth: '100vw',
          background: 'var(--bg)',
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}>
          {/* Status bar */}
          <div style={{
            height: 44,
            background: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            flexShrink: 0,
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>9:41</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--text-primary)' }}>●●● WiFi 🔋</span>
            </div>
          </div>

          {/* Scrollable screen area */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <Routes>
              <Route path="/" element={<ShiftSummary />} />
              <Route path="/corrections" element={<CorrectionFlow />} />
              <Route path="/correction/:workerId" element={<PerWorkerCard />} />
              <Route path="/confirm" element={<Confirmation />} />
              <Route path="/hr-request" element={<HrRequest />} />
            </Routes>
          </div>
        </div>
        </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
