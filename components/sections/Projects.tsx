'use client'

import { useEffect, useRef, useState } from 'react'
import { projects } from '@/lib/projects'
import Image from 'next/image'

// Animated scroll line component
function ScrollLine() {
  const lineRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return

      const parent = lineRef.current.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how much of the section is visible/scrolled
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Start animation when section enters viewport
      if (sectionTop < windowHeight && rect.bottom > 0) {
        const scrolled = Math.max(0, windowHeight - sectionTop)
        const progress = Math.min(scrolled / sectionHeight, 1)
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={lineRef} className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px">
      {/* Base dashed line */}
      <div className="absolute inset-0 border-l border-dashed border-[#333333]" />

      {/* Animated glow line */}
      <div
        className="absolute left-0 w-px bg-gradient-to-b from-transparent via-[#BEFE00] to-transparent opacity-80"
        style={{
          top: `${Math.max(0, scrollProgress * 100 - 20)}%`,
          height: '20%',
          boxShadow: '0 0 20px rgba(190, 254, 0, 0.8), 0 0 40px rgba(190, 254, 0, 0.4)',
          transition: 'top 0.1s ease-out',
        }}
      />

      {/* Glow dot at current position */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#BEFE00]"
        style={{
          top: `${scrollProgress * 100}%`,
          boxShadow: '0 0 10px rgba(190, 254, 0, 1), 0 0 20px rgba(190, 254, 0, 0.6)',
          transition: 'top 0.1s ease-out',
        }}
      />
    </div>
  )
}

// Single project section with sticky header
function ProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []

  return (
    <div className="relative">
      {/* Cross at top */}
      <span className="cross cross-center cross-top">+</span>
      <div className="h-line" />

      {/* Project container */}
      <div className="relative min-h-screen">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 bg-black border-b border-dashed border-[#333333]">
          <div className="grid md:grid-cols-2">
            {/* Project info - left side */}
            <div className="p-8 md:p-12 lg:p-16 border-r border-dashed border-[#333333]">
              <p className="text-[#333333] text-xs mb-2">
                _{String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide mb-3">
                {project.title}
              </h3>
              <p className="text-[#666666] uppercase text-sm mb-4">
                {project.subtitle}
              </p>
              <div className="space-y-1 text-[#888888] uppercase text-sm mb-6">
                {project.description.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bracket-link uppercase text-sm"
                  >
                    [{link.label}]
                  </a>
                ))}
              </div>
            </div>

            {/* Sub-projects or status - right side */}
            <div className="p-8 md:p-12 lg:p-16 flex items-center">
              {project.subProjects ? (
                <div className="w-full space-y-3">
                  {project.subProjects.map((sub, subIndex) => (
                    <div
                      key={sub.name}
                      className="flex items-center justify-between border border-dashed border-[#333333] p-3 hover:border-[#555555] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#333333] text-xs">
                          _{String(subIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm uppercase">{sub.name}</span>
                      </div>
                      {sub.link && (
                        <a
                          href={sub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#444444] hover:text-[#BEFE00] transition-colors"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center w-full">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-[#BEFE00] rounded-full animate-pulse" />
                    <span className="text-[#BEFE00] text-xs uppercase tracking-wider">
                      ACTIVE PROJECT
                    </span>
                  </div>
                  <p className="text-[#555555] text-sm uppercase">
                    CURRENTLY IN DEVELOPMENT
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image gallery - scrollable content */}
        <div className="relative">
          {images.length > 0 ? (
            <div className="space-y-px bg-[#222222]">
              {images.map((img, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative bg-black p-8 md:p-16"
                >
                  <div className="max-w-5xl mx-auto">
                    {/* Image label */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[#333333] text-xs uppercase">
                        _{String(imgIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                      </p>
                      <p className="text-[#333333] text-xs uppercase">
                        {project.title}
                      </p>
                    </div>

                    {/* Image container with border */}
                    <div className="relative border border-dashed border-[#333333] overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${imgIndex + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback for projects without images */
            <div className="h-[50vh] flex items-center justify-center">
              <div className="text-[#1a1a1a] text-8xl md:text-9xl">◇</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative">
      {/* Section header */}
      <div className="section-padding pb-0">
        <p className="text-[#444444] text-sm uppercase tracking-widest mb-4">
          [SELECTED WORK]
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide">
          PROJECTS
        </h2>
      </div>

      {/* Projects container with animated scroll line */}
      <div className="relative mt-16 md:mt-24">
        {/* Animated center line */}
        <ScrollLine />

        {/* Project sections */}
        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Bottom border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>
    </section>
  )
}
