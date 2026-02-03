'use client'

import { useCallback, useRef } from 'react'

export function useSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll('.spotlight-card')

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const cardElement = card as HTMLElement
      cardElement.style.setProperty('--glow-x', `${x}px`)
      cardElement.style.setProperty('--glow-y', `${y}px`)
      cardElement.style.setProperty('--glow-opacity', '1')
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll('.spotlight-card')
    cards.forEach((card) => {
      const cardElement = card as HTMLElement
      cardElement.style.setProperty('--glow-opacity', '0')
    })
  }, [])

  return {
    containerRef,
    spotlightProps: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
