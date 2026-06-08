import { useState, useEffect, useRef } from 'react'
import { usePresentation } from '../contexts/PresentationContext'

function ArrowButton({ direction, onClick, disabled }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
      id={`slide-arrow-${direction}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        top: '50%',
        [direction]: 20,
        transform: 'translateY(-50%)',
        zIndex: 200,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: 'none',
        background: disabled
          ? 'transparent'
          : hovered
          ? 'var(--page-arrow-hover-bg)'
          : 'var(--page-arrow-bg)',
        color: disabled ? 'transparent' : 'var(--page-nav-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0 : hovered ? 1 : 0.6,
        transition: 'opacity 180ms ease, background 180ms ease',
        boxShadow: disabled || !hovered
          ? 'none'
          : '0 4px 16px rgba(0,0,0,0.15)',
      }}
    >
      {direction === 'left' ? (
        // Left chevron
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        // Right chevron
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

export default function SlideContainer() {
  const { slides, currentSlide, direction, goNext, goPrev } = usePresentation()
  const [displayedSlide, setDisplayedSlide] = useState(currentSlide)
  const [animState, setAnimState] = useState('idle') // 'idle' | 'exit' | 'enter'
  const pendingSlide = useRef(currentSlide)
  const pendingDirection = useRef(direction)

  useEffect(() => {
    if (currentSlide === displayedSlide) return

    pendingSlide.current = currentSlide
    pendingDirection.current = direction

    // Step 1: exit current slide
    setAnimState('exit')
    
    const t1 = setTimeout(() => {
      // Step 2: swap content and jump to 'enter' state (no transition)
      setDisplayedSlide(pendingSlide.current)
      setAnimState('enter')
      
      // Step 3: next frame, go to 'idle' (transition on)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState('idle')
        })
      })
    }, 250)

    return () => clearTimeout(t1)
  }, [currentSlide]) // eslint-disable-line react-hooks/exhaustive-deps

  const SlideComponent = slides[displayedSlide]?.component
  const isPrototypeSlide = slides[displayedSlide]?.id === 'prototype'
  const isForward = pendingDirection.current === 'forward'

  const exitTransform = isForward ? 'translateX(-30px)' : 'translateX(30px)'
  const enterTransform = isForward ? 'translateX(30px)' : 'translateX(-30px)'

  const slideStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    transition: animState === 'enter'
      ? 'none'
      : 'opacity 350ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1)',
    opacity: animState === 'idle' ? 1 : 0,
    transform: animState === 'exit'
      ? exitTransform
      : animState === 'enter'
      ? enterTransform
      : 'translateX(0)',
  }

  return (
    <>
      {!isPrototypeSlide && (
        <ArrowButton
          direction="left"
          onClick={goPrev}
          disabled={currentSlide === 0}
        />
      )}

      <div style={slideStyle}>
        {SlideComponent && <SlideComponent />}
      </div>

      {!isPrototypeSlide && (
        <ArrowButton
          direction="right"
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
        />
      )}
    </>
  )
}
