import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { workers } from '../data/workers'

const EDGE_DEMOS = ['full-conflict', 'loading']
const naturalState = (w) => w.confidence >= 85 ? 'high-confidence' : w.conflict ? 'conflict' : 'low-confidence'

export const NODES = [
  {
    id: 'shift',
    label: 'Shift Summary',
    match: (p) => p === '/',
    rows: [
      {
        label: null,
        items: [
          { label: 'Default', desc: '3 flagged', path: '/', search: 'demo=default', active: (p, q) => p === '/' && (!q || q === 'default') },
          { label: 'Single', desc: '1 flagged', path: '/', search: 'demo=single', active: (p, q) => p === '/' && q === 'single' },
          { label: 'Empty', desc: 'All clear', path: '/', search: 'demo=empty', active: (p, q) => p === '/' && q === 'empty' },
        ],
      },
      {
        label: 'Edge cases',
        items: [
          { label: 'Offline', desc: 'Banner', path: '/', search: 'demo=offline', active: (p, q) => p === '/' && q === 'offline' },
          { label: 'Multi-line', desc: 'Lines A & B', path: '/', search: 'demo=multi-line', active: (p, q) => p === '/' && q === 'multi-line' },
        ],
      },
    ],
  },
  {
    id: 'corrections',
    label: 'Corrections',
    match: (p) => p === '/corrections',
    rows: [
      {
        label: null,
        items: [
          { label: 'Bulk approve', desc: '≥85% conf', path: '/corrections', search: 'demo=bulk', active: (p, q) => p === '/corrections' && (!q || q === 'bulk') },
          { label: 'Undo approve', desc: 'Tap approve', path: '/corrections', search: 'demo=undo', active: (p, q) => p === '/corrections' && q === 'undo' },
        ],
      },
      {
        label: 'Edge cases',
        items: [
          { label: 'Offline', desc: 'Mid-flow sync', path: '/corrections', search: 'demo=offline', active: (p, q) => p === '/corrections' && q === 'offline' },
        ],
      },
    ],
  },
  {
    id: 'worker',
    label: 'Per-Worker',
    match: (p) => p.startsWith('/correction/'),
    rows: [
      {
        label: null,
        items: workers.map((w) => ({
          label: w.name,
          desc: `${w.confidence}% · ${w.role}`,
          path: `/correction/${w.id}`,
          search: `demo=${naturalState(w)}`,
          active: (p, q) => p === `/correction/${w.id}` && !EDGE_DEMOS.includes(q),
        })),
      },
      {
        label: 'Edge cases',
        items: [
          { label: 'Full conflict', desc: 'All signals clash', path: '/correction/3', search: 'demo=full-conflict', active: (p, q) => p.startsWith('/correction/') && q === 'full-conflict' },
          { label: 'Loading', desc: 'Skeleton state', path: '/correction/1', search: 'demo=loading', active: (p, q) => p.startsWith('/correction/') && q === 'loading' },
        ],
      },
    ],
  },
  {
    id: 'hr-request',
    label: 'HR Request',
    entryPoint: true,
    match: (p) => p === '/hr-request',
    rows: [
      {
        label: null,
        items: [
          { label: 'Detail needed', desc: 'Bounce-back', path: '/hr-request', search: '', active: (p) => p === '/hr-request' },
        ],
      },
    ],
  },
  {
    id: 'confirm',
    label: 'Confirmation',
    match: (p) => p === '/confirm',
    rows: [
      {
        label: null,
        items: [
          { label: 'Success', desc: 'All submitted', path: '/confirm', search: '', active: (p, q) => p === '/confirm' && q !== 'partial' && q !== 'offline' && q !== 'partial-sync' },
          { label: 'Partial', desc: 'Some remain', path: '/confirm', search: 'demo=partial', active: (p, q) => p === '/confirm' && q === 'partial' },
          { label: 'Offline saved', desc: 'Queued', path: '/confirm', search: 'demo=offline', active: (p, q) => p === '/confirm' && q === 'offline' },
          { label: 'Partial sync', desc: 'Pending', path: '/confirm', search: 'demo=partial-sync', active: (p, q) => p === '/confirm' && q === 'partial-sync' },
        ],
      },
    ],
  },
]

function HArrow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: 20, flexShrink: 0 }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid var(--border)' }} />
    </div>
  )
}

function VConnector({ active }) {
  const color = active ? 'var(--accent)' : 'var(--border)'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 24, flexShrink: 0 }}>
      <div style={{ width: 1.5, flex: 1, background: color }} />
      <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `6px solid ${color}` }} />
    </div>
  )
}

export default function Flowchart() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentPath = location.pathname
  const currentDemo = searchParams.get('demo') || ''

  const activeNodeIdx = NODES.findIndex((n) => n.match(currentPath))

  function goTo(path, search) {
    navigate(search ? `${path}?${search}` : path)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: 580,
      flexShrink: 0,
    }}>
      {NODES.map((node, idx) => {
        const isActiveNode = node.match(currentPath)
        const isVisited = activeNodeIdx > idx
        const isEntryPoint = !!node.entryPoint

        return (
          <div key={node.id}>
            {idx > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px 0' }}>
                <VConnector active={isVisited || isActiveNode} />
              </div>
            )}

            <div style={{
              border: isActiveNode
                ? '2px solid var(--accent)'
                : isEntryPoint
                ? '1.5px dashed var(--border)'
                : '2px solid var(--border)',
              borderRadius: 10,
              background: isActiveNode ? 'rgba(0,185,80,0.03)' : 'var(--bg)',
              overflow: 'hidden',
              transition: 'border-color 180ms cubic-bezier(0.25,1,0.5,1), background 180ms cubic-bezier(0.25,1,0.5,1), box-shadow 180ms cubic-bezier(0.25,1,0.5,1)',
              boxShadow: isActiveNode ? '0 2px 8px rgba(0,185,80,0.08)' : 'none',
            }}>
              {/* Phase header */}
              <div style={{
                padding: '9px 16px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border)',
                background: isActiveNode ? 'rgba(0,185,80,0.03)' : 'var(--surface)',
              }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: isActiveNode ? 'var(--accent)' : isVisited ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                  {node.label}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {isActiveNode && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />}
                  {isVisited && !isActiveNode && <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700 }}>✓</span>}
                </div>
              </div>

              {/* Rows */}
              <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {node.rows.map((row, rIdx) => (
                  <div key={rIdx}>
                    {row.label && (
                      <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
                        {row.label}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                      {row.items.flatMap((item, iIdx) => {
                        const isActiveSub = item.active(currentPath, currentDemo)
                        const elements = []
                        if (iIdx > 0) elements.push(<HArrow key={`a-${rIdx}-${iIdx}`} />)
                        elements.push(
                          <button
                            key={`n-${rIdx}-${iIdx}`}
                            onClick={() => goTo(item.path, item.search)}
                            title={`Go to ${item.label}`}
                            style={{
                              width: 120,
                              flexShrink: 0,
                              padding: '10px 8px',
                              background: isActiveSub ? 'rgba(0,185,80,0.06)' : 'var(--surface)',
                              border: `1.5px solid ${isActiveSub ? 'var(--accent)' : 'var(--border)'}`,
                              borderRadius: 10,
                              cursor: 'pointer',
                              textAlign: 'center',
                              transition: 'background 150ms cubic-bezier(0.25,1,0.5,1), border-color 150ms cubic-bezier(0.25,1,0.5,1), transform 100ms cubic-bezier(0.25,1,0.5,1)',
                            }}
                          >
                            <p style={{
                              fontSize: 12,
                              fontWeight: isActiveSub ? 700 : 500,
                              color: isActiveSub ? 'var(--accent)' : 'var(--text-primary)',
                              lineHeight: 1.35,
                              marginBottom: 3,
                              wordBreak: 'break-word',
                            }}>
                              {item.label}
                            </p>
                            <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                              {item.desc}
                            </p>
                          </button>
                        )
                        return elements
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
