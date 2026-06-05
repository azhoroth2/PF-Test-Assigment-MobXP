import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const NODES = [
  {
    id: 'shift',
    label: 'Shift Summary',
    meta: 'ForOpens · V2',
    match: (p) => p === '/',
    substates: [
      {
        label: 'Default',
        desc: '3 flagged',
        path: '/',
        search: 'demo=default',
        active: (p, q) => p === '/' && (!q || q === 'default'),
      },
      {
        label: 'Single',
        desc: '1 flagged',
        path: '/',
        search: 'demo=single',
        active: (p, q) => p === '/' && q === 'single',
      },
      {
        label: 'Empty',
        desc: 'All clear',
        path: '/',
        search: 'demo=empty',
        active: (p, q) => p === '/' && q === 'empty',
      },
    ],
  },
  {
    id: 'corrections',
    label: 'Corrections',
    meta: 'Batch · V3',
    match: (p) => p === '/corrections',
    substates: [
      {
        label: 'Bulk approve',
        desc: '≥85% confidence',
        path: '/corrections',
        search: '',
        active: (p) => p === '/corrections',
      },
      {
        label: 'Manual review',
        desc: '<85% confidence',
        path: '/corrections',
        search: '',
        active: () => false,
        info: true,
      },
    ],
  },
  {
    id: 'worker',
    label: 'Per-Worker',
    meta: 'D_Conf · V4 V5',
    match: (p) => p.startsWith('/correction/'),
    substates: [
      {
        label: 'High-confidence',
        desc: '≥90% · auto-hint',
        path: '/correction/1',
        search: 'demo=high-confidence',
        active: (p, q) => p.startsWith('/correction/') && q === 'high-confidence',
      },
      {
        label: 'Low-confidence',
        desc: '60–89% · no hint',
        path: '/correction/1',
        search: 'demo=low-confidence',
        active: (p, q) => p.startsWith('/correction/') && q === 'low-confidence',
      },
      {
        label: 'Conflict',
        desc: 'Signals disagree',
        path: '/correction/3',
        search: 'demo=conflict',
        active: (p, q) => p.startsWith('/correction/') && (q === 'conflict' || (!q && false)),
      },
      {
        label: 'Dispute',
        desc: 'Follow-up flag',
        path: '/correction/3',
        search: 'demo=dispute',
        active: (p, q) => p.startsWith('/correction/') && q === 'dispute',
      },
    ],
  },
  {
    id: 'confirm',
    label: 'Confirmation',
    meta: 'Submit · V6',
    match: (p) => p === '/confirm',
    substates: [
      {
        label: 'Success',
        desc: 'All submitted',
        path: '/confirm',
        search: '',
        active: (p, q) => p === '/confirm' && q !== 'partial',
      },
      {
        label: 'Partial',
        desc: 'Some remaining',
        path: '/confirm',
        search: 'demo=partial',
        active: (p, q) => p === '/confirm' && q === 'partial',
      },
    ],
  },
]

export default function Flowchart() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentPath = location.pathname
  const currentDemo = searchParams.get('demo') || ''

  const activeNodeIdx = NODES.findIndex((n) => n.match(currentPath))

  function goTo(path, search) {
    const url = search ? `${path}?${search}` : path
    navigate(url)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: 196,
      paddingTop: 56,
      flexShrink: 0,
    }}>
      <p style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 1.2,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        marginBottom: 20,
        textAlign: 'center',
      }}>
        Flow
      </p>

      {NODES.map((node, idx) => {
        const isActiveNode = node.match(currentPath)
        const isVisited = activeNodeIdx > idx

        return (
          <div key={node.id}>
            {/* Connector line */}
            {idx > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {idx === 2 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '88%',
                    fontSize: 9,
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                    paddingTop: 3,
                  }}>
                    <span>Bulk OK</span>
                    <span>Manual</span>
                  </div>
                )}
                <div style={{
                  width: 2,
                  height: idx === 2 ? 14 : 10,
                  background: isVisited || isActiveNode ? 'var(--accent)' : 'var(--border)',
                  marginBottom: 0,
                }} />
              </div>
            )}

            {/* Main node header */}
            <div style={{
              border: isActiveNode
                ? '2px solid var(--accent)'
                : '2px solid var(--border)',
              borderRadius: 10,
              background: isActiveNode ? '#e6f9ee' : 'var(--bg)',
              overflow: 'hidden',
              transition: 'all 0.15s ease',
              boxShadow: isActiveNode ? '0 2px 8px rgba(0,185,80,0.12)' : 'none',
            }}>
              {/* Node title row */}
              <div style={{
                padding: '8px 12px 6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border)',
              }}>
                <p style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: isActiveNode ? 'var(--accent)' : isVisited ? 'var(--text-secondary)' : 'var(--text-primary)',
                }}>
                  {node.label}
                </p>
                {isActiveNode && (
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                )}
                {isVisited && !isActiveNode && (
                  <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                )}
              </div>

              {/* Substates */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {node.substates.map((sub, sIdx) => {
                  const isActiveSub = sub.active(currentPath, currentDemo)
                  const isInfoOnly = sub.info

                  return (
                    <button
                      key={sIdx}
                      onClick={() => !isInfoOnly && goTo(sub.path, sub.search)}
                      title={isInfoOnly ? sub.desc : `Go to ${sub.label}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 10px',
                        background: isActiveSub ? 'rgba(0,185,80,0.08)' : 'transparent',
                        border: 'none',
                        borderTop: sIdx > 0 ? '1px solid var(--border)' : 'none',
                        cursor: isInfoOnly ? 'default' : 'pointer',
                        textAlign: 'left',
                        width: '100%',
                        transition: 'background 0.1s',
                      }}
                    >
                      {/* State dot */}
                      <div style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: isActiveSub
                          ? 'var(--accent)'
                          : isInfoOnly
                          ? 'var(--border)'
                          : 'var(--text-muted)',
                        flexShrink: 0,
                        opacity: isInfoOnly ? 0.5 : 1,
                      }} />
                      <div>
                        <p style={{
                          fontSize: 11,
                          fontWeight: isActiveSub ? 600 : 400,
                          color: isActiveSub
                            ? 'var(--accent)'
                            : isInfoOnly
                            ? 'var(--text-muted)'
                            : 'var(--text-primary)',
                          lineHeight: 1.3,
                        }}>
                          {sub.label}
                        </p>
                        <p style={{
                          fontSize: 9,
                          color: 'var(--text-muted)',
                          lineHeight: 1.3,
                        }}>
                          {sub.desc}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
