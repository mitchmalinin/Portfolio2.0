'use client'

import { useEffect, useRef, useState } from 'react'
import { projects } from '@/lib/projects'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'

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

      const sectionTop = rect.top
      const sectionHeight = rect.height

      if (sectionTop < windowHeight && rect.bottom > 0) {
        const scrolled = Math.max(0, windowHeight - sectionTop)
        const progress = Math.min(scrolled / sectionHeight, 1)
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={lineRef} className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px">
      <div className="absolute inset-0 border-l border-dashed border-[#333333]" />
      <div
        className="absolute left-0 w-px bg-gradient-to-b from-transparent via-[#BEFE00] to-transparent opacity-80"
        style={{
          top: `${Math.max(0, scrollProgress * 100 - 20)}%`,
          height: '20%',
          boxShadow: '0 0 20px rgba(190, 254, 0, 0.8), 0 0 40px rgba(190, 254, 0, 0.4)',
          transition: 'top 0.1s ease-out',
        }}
      />
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

// Single project section with collapsible sticky header
function ProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []
  const headerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const lastScrollY = useRef(0)
  const collapsedHeaderHeight = 56 // Approximate height of collapsed header
  const mobileNavHeight = 49 // Height of mobile nav bar

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current || !containerRef.current) return
      if (window.innerWidth >= 768) return // Only on mobile

      const currentScrollY = window.scrollY
      const scrollingUp = currentScrollY < lastScrollY.current
      const scrollingDown = currentScrollY > lastScrollY.current

      const headerRect = headerRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()
      const isSticky = headerRect.top <= mobileNavHeight

      // Calculate how close we are to the bottom of this project section
      const distanceToBottom = containerRect.bottom - collapsedHeaderHeight
      const nearBottom = distanceToBottom < 100

      if (isSticky) {
        if (scrollingDown && !isCollapsed) {
          // Scrolling down while sticky - collapse
          setIsCollapsed(true)
        } else if (scrollingUp && isCollapsed && !nearBottom) {
          // Scrolling up while sticky and not near bottom - expand
          setIsCollapsed(false)
        }

        // If near the bottom of section, force collapse for smooth transition
        if (nearBottom && !isCollapsed) {
          setIsCollapsed(true)
        }
      } else {
        // Not sticky anymore (scrolled back up past the section) - expand
        if (isCollapsed) {
          setIsCollapsed(false)
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isCollapsed])

  return (
    <div ref={containerRef} className="relative">
      <span className="cross cross-center cross-top">+</span>
      <div className="h-line" />

      <div className="relative min-h-screen">
        {/* Sticky header - collapsible on mobile */}
        {/* top-[49px] on mobile to account for mobile nav bar */}
        <div
          ref={headerRef}
          className="sticky top-[49px] md:top-0 z-20 bg-black border-b border-dashed border-[#333333]"
        >
          {/* Mobile: Collapsible header */}
          <div className="md:hidden">
            {/* Always visible: Title bar */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#333333] text-xs">
                  _{String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl uppercase tracking-wide">
                  {project.title}
                </h3>
                {!project.subProjects && (
                  <span className="w-2 h-2 bg-[#BEFE00] rounded-full animate-pulse" />
                )}
              </div>
              <button className="text-[#666666] p-1">
                {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </button>
            </div>

            {/* Expandable content */}
            <div
              className={`overflow-hidden transition-all duration-200 ease-out ${
                isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
              }`}
            >
              <div className="px-4 pb-4 border-t border-dashed border-[#333333]">
                <p className="text-[#666666] uppercase text-xs mt-3 mb-2">
                  {project.subtitle}
                </p>
                <div className="space-y-1 text-[#888888] uppercase text-xs mb-4">
                  {project.description.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bracket-link uppercase text-xs"
                    >
                      [{link.label}]
                    </a>
                  ))}
                </div>

                {project.subProjects && (
                  <div className="space-y-2 mt-4">
                    {project.subProjects.map((sub, subIndex) => (
                      <div
                        key={sub.name}
                        className="flex items-center justify-between border border-dashed border-[#333333] p-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[#333333] text-xs">
                            _{String(subIndex + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs uppercase">{sub.name}</span>
                        </div>
                        {sub.link && (
                          <a
                            href={sub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#444444] hover:text-[#BEFE00] transition-colors text-sm"
                          >
                            ↗
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {!project.subProjects && (
                  <div className="text-center py-2">
                    <p className="text-[#BEFE00] text-xs uppercase tracking-wider">
                      ACTIVE PROJECT
                    </p>
                    <p className="text-[#555555] text-xs uppercase mt-1">
                      CURRENTLY IN DEVELOPMENT
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop: Full header */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2">
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
        </div>

        {/* Image gallery */}
        <div className="relative">
          {images.length > 0 ? (
            <div className="space-y-px bg-[#222222]">
              {images.map((img, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative bg-black p-4 md:p-16"
                >
                  <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-2 md:mb-4">
                      <p className="text-[#333333] text-xs uppercase">
                        _{String(imgIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                      </p>
                      <p className="text-[#333333] text-xs uppercase hidden sm:block">
                        {project.title}
                      </p>
                    </div>
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
      <div className="section-padding pb-0">
        <p className="text-[#444444] text-sm uppercase tracking-widest mb-4">
          [SELECTED WORK]
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide">
          PROJECTS
        </h2>
      </div>

      <div className="relative mt-16 md:mt-24">
        <ScrollLine />
        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>
    </section>
  )
}
