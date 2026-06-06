import { createContext, useContext, useState } from 'react'

const AnnotationContext = createContext({ showAnnotations: false, toggle: () => {} })

export function AnnotationProvider({ children }) {
  const [showAnnotations, setShowAnnotations] = useState(
    () => localStorage.getItem('showAnnotations') === 'true'
  )
  const toggle = (v) => {
    setShowAnnotations(v)
    localStorage.setItem('showAnnotations', String(v))
  }
  return (
    <AnnotationContext.Provider value={{ showAnnotations, toggle }}>
      {children}
    </AnnotationContext.Provider>
  )
}

export const useAnnotations = () => useContext(AnnotationContext)
