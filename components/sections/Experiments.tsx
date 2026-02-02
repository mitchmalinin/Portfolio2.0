'use client'

import { useCallback, useRef } from 'react'
import { experiments } from '@/lib/projects'

export default function Experiments() {
  const gridRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.glow-card')
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
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.glow-card')
    cards.forEach((card) => {
      const cardElement = card as HTMLElement
      cardElement.style.setProperty('--glow-opacity', '0')
    })
  }, [])

  return (
    <section id="experiments" className="relative">
      {/* Top border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      <div className="section-padding">
        <p className="text-[#444444] text-sm uppercase tracking-widest mb-4">
          [LAB]
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-4 hover-glow">
          EXPERIMENTS
        </h2>
        <p className="text-[#666666] text-base uppercase mb-16 max-w-xl">
          _SIDE PROJECTS, PROTOTYPES, AND CREATIVE EXPLORATIONS
        </p>

        {/* Experiments grid */}
        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222222]"
        >
          {experiments.map((exp, index) => (
            <div
              key={exp.id}
              className="glow-card bg-black group transition-colors border border-dashed border-[#333333]"
            >
              {/* Content wrapper - sits above the glow */}
              <div className="relative z-10 p-8 md:p-10 bg-black">
                {/* Index */}
                <p className="text-[#333333] text-xs mb-4 group-hover:text-[#BEFE00] transition-colors">
                  _{String(index + 1).padStart(2, '0')}
                </p>

                {/* Title */}
                <h3 className="text-xl md:text-2xl uppercase mb-3 group-hover:text-[#BEFE00] group-hover:drop-shadow-[0_0_10px_rgba(190,254,0,0.4)] transition-all">
                  {exp.title}
                </h3>

                {/* Description */}
                <p className="text-[#666666] text-sm uppercase mb-6">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#444444] border border-[#333333] px-2 py-1 group-hover:border-[#BEFE00]/30 group-hover:text-[#BEFE00]/70 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link arrow */}
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 text-[#444444] hover:text-[#BEFE00] hover:drop-shadow-[0_0_8px_rgba(190,254,0,0.5)] transition-all"
                  >
                    [VIEW] ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>
    </section>
  )
}
