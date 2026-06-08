import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const PresentationContext = createContext(null)

export function PresentationProvider({ slides, children }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState('forward') // 'forward' | 'backward'
  const total = slides.length

  const goTo = useCallback((index) => {
    if (index < 0 || index >= total) return
    setDirection(index > currentSlide ? 'forward' : 'backward')
    setCurrentSlide(index)
  }, [currentSlide, total])

  const goNext = useCallback(() => {
    if (currentSlide < total - 1) {
      setDirection('forward')
      setCurrentSlide((s) => s + 1)
    }
  }, [currentSlide, total])

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection('backward')
      setCurrentSlide((s) => s - 1)
    }
  }, [currentSlide])

  useEffect(() => {
    function handleKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  return (
    <PresentationContext.Provider value={{ currentSlide, total, direction, slides, goTo, goNext, goPrev }}>
      {children}
    </PresentationContext.Provider>
  )
}

export function usePresentation() {
  const ctx = useContext(PresentationContext)
  if (!ctx) throw new Error('usePresentation must be used inside PresentationProvider')
  return ctx
}
