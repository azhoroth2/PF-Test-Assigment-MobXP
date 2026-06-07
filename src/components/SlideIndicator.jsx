import { usePresentation } from '../contexts/PresentationContext'

export default function SlideIndicator() {
  const { slides, currentSlide, goTo } = usePresentation()

  return (
    <div
      role="tablist"
      aria-label="Presentation slides"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'var(--page-indicator-bg)',
        border: '1px solid var(--page-indicator-border)',
        borderRadius: 12,
        padding: '5px 8px',
      }}
    >
      {slides.map((slide, idx) => {
        const isActive = idx === currentSlide
        return (
          <button
            key={slide.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`Slide ${idx + 1}: ${slide.label}`}
            id={`slide-tab-${slide.id}`}
            onClick={() => goTo(idx)}
            title={slide.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 28,
              minWidth: isActive ? 88 : 28,
              padding: isActive ? '0 12px' : '0',
              borderRadius: 7,
              border: 'none',
              background: isActive ? 'var(--accent)' : 'transparent',
              color: isActive ? 'var(--accent-text)' : 'var(--page-nav-text)',
              fontSize: 11,
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              letterSpacing: 0.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              transition: [
                'background 200ms cubic-bezier(0.25,1,0.5,1)',
                'min-width 200ms cubic-bezier(0.25,1,0.5,1)',
                'color 200ms cubic-bezier(0.25,1,0.5,1)',
                'opacity 150ms ease',
              ].join(', '),
              opacity: isActive ? 1 : 0.55,
            }}
          >
            {isActive ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.7)',
                  flexShrink: 0,
                }} />
                {slide.label}
              </span>
            ) : (
              <span style={{
                display: 'block',
                width: 10,
                height: 10,
                borderRadius: 3,
                background: 'var(--page-indicator-dot)',
              }} />
            )}
          </button>
        )
      })}
    </div>
  )
}
