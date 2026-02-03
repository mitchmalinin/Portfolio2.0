'use client'

import { useState, useEffect, RefObject } from 'react'

export function useInView(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
): boolean {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once in view, stay in view (for animations that shouldn't reverse)
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isInView
}
