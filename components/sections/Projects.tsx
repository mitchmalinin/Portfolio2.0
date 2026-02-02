'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { projects } from '@/lib/projects'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Annotation labels for images
const imageAnnotations: Record<string, string[][]> = {
  'y2k-dotcom': [
    ['HERO SECTION', 'RETRO GRADIENT BG', 'ANIMATED LOGO'],
    ['PRODUCT GRID', 'HOVER EFFECTS', 'QUICK VIEW'],
    ['MEME SEARCH', 'AI TAGGING', 'INFINITE SCROLL'],
    ['CART FLOW', 'GUEST CHECKOUT', 'STRIPE INTEGRATION'],
  ],
  'y2k-coded': [
    ['MONACO EDITOR', 'SYNTAX HIGHLIGHT', 'THEMES'],
    ['SNIPPET LIBRARY', 'SEARCH & FILTER', 'COPY TO CLIPBOARD'],
    ['TEMPLATE GALLERY', 'PREVIEW MODE', 'EXPORT OPTIONS'],
  ],
  'schills': [
    ['DASHBOARD', 'REAL-TIME STATS', 'NOTIFICATIONS'],
    ['AI MATCHING', 'SKILL ANALYSIS', 'SMART FILTERS'],
    ['SERVICE CARDS', 'RATINGS', 'BOOKING SYSTEM'],
    ['CHAT INTERFACE', 'FILE SHARING', 'VIDEO CALLS'],
  ],
}

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

  // Calculate the position of the glow at the user's scroll position (top of viewport relative to section)
  const glowPosition = Math.min(Math.max(scrollProgress * 100, 0), 100)

  return (
    <div ref={lineRef} className="hidden md:block absolute top-0 bottom-0 left-1/4 w-px">
      <div className="absolute inset-0 border-l border-dashed border-[#333333]" />

      {/* Glow trail - follows a bit behind the dot */}
      <div
        className="absolute left-0 w-px bg-gradient-to-b from-[#BEFE00] via-[#BEFE00] to-transparent opacity-60"
        style={{
          top: '0%',
          height: `${glowPosition}%`,
          boxShadow: '0 0 15px rgba(190, 254, 0, 0.5)',
          transition: 'height 0.05s ease-out',
        }}
      />

      {/* Glow dot at current scroll position */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#BEFE00]"
        style={{
          top: `${glowPosition}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px rgba(190, 254, 0, 1), 0 0 30px rgba(190, 254, 0, 0.6)',
          transition: 'top 0.05s ease-out',
        }}
      />
    </div>
  )
}

// Desktop project section with 1/4 - 3/4 layout
function DesktopProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []
  const annotations = imageAnnotations[project.id] || []

  return (
    <div className="hidden md:block relative">
      {/* Cross marker at top */}
      <div className="relative">
        <span className="cross cross-center cross-top" style={{ left: '25%' }}>+</span>
        <div className="h-line" />
      </div>

      {/* Main grid: 1/4 info, 3/4 images */}
      <div className="grid grid-cols-4 min-h-screen">
        {/* Left: Project info (sticky, top-aligned) */}
        <div className="col-span-1 relative">
          <div className="sticky top-0 h-screen flex flex-col justify-start pt-16 lg:pt-24 p-8 lg:p-12 border-r border-dashed border-[#333333]">
            <p className="text-[#333333] text-xs mb-4">
              _{String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="text-2xl lg:text-3xl xl:text-4xl uppercase tracking-wide mb-3">
              {project.title}
            </h3>
            <p className="text-[#666666] uppercase text-xs mb-6">
              {project.subtitle}
            </p>
            <div className="space-y-1 text-[#888888] uppercase text-xs mb-8">
              {project.description.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {/* Sub-projects */}
            {project.subProjects && (
              <div className="space-y-2 mb-8">
                {project.subProjects.map((sub, subIndex) => (
                  <div
                    key={sub.name}
                    className="flex items-center justify-between border border-dashed border-[#333333] p-2 hover:border-[#555555] transition-colors"
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

            {/* Links */}
            <div className="flex flex-wrap gap-3">
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

            {/* Active indicator for Schills */}
            {project.id === 'schills' && (
              <div className="mt-8 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#BEFE00] rounded-full animate-pulse" />
                <span className="text-[#BEFE00] text-xs uppercase tracking-wider">
                  ACTIVE
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Images with annotations (3/4) */}
        <div className="col-span-3">
          {images.map((img, imgIndex) => (
            <div key={imgIndex} className="relative border-b border-dashed border-[#333333] last:border-b-0">
              <div className="p-8 lg:p-12">
                {/* Image number */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[#333333] text-xs uppercase">
                    _{String(imgIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                  </p>
                </div>

                {/* Image with annotation lines */}
                <div className="relative">
                  <div className="border border-dashed border-[#333333] overflow-hidden">
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${imgIndex + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Annotation lines coming from right side */}
                  {annotations[imgIndex] && (
                    <div className="absolute top-0 right-0 translate-x-full pl-4 h-full flex flex-col justify-center gap-4">
                      {annotations[imgIndex].map((annotation, annIndex) => (
                        <div key={annIndex} className="flex items-center gap-2">
                          <div className="w-8 border-t border-dashed border-[#444444]" />
                          <div className="w-2 h-2 border border-[#444444] rotate-45" />
                          <span className="text-[#555555] text-xs uppercase whitespace-nowrap">
                            {annotation}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mobile project section with collapsible header using GSAP ScrollTrigger
function MobileProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [manualOverride, setManualOverride] = useState(false)

  // GSAP ScrollTrigger for reliable scroll-based collapse
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return

    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      // Create ScrollTrigger that watches when section enters "sticky zone"
      ScrollTrigger.create({
        trigger: section,
        start: 'top 49px', // When section top hits 49px from viewport top (mobile nav height)
        end: 'bottom 49px', // Until section bottom hits that point
        onEnter: () => {
          if (!manualOverride) setIsCollapsed(true)
        },
        onLeaveBack: () => {
          if (!manualOverride) setIsCollapsed(false)
        },
        onEnterBack: () => {
          if (!manualOverride) setIsCollapsed(true)
        },
      })
    }, section)

    return () => ctx.revert()
  }, [manualOverride])

  // Reset manual override after a delay
  useEffect(() => {
    if (!manualOverride) return
    const timeout = setTimeout(() => setManualOverride(false), 3000)
    return () => clearTimeout(timeout)
  }, [manualOverride])

  const handleToggle = () => {
    setManualOverride(true)
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div ref={sectionRef} className="md:hidden relative" data-project-section>
      <span className="cross cross-center cross-top">+</span>
      <div className="h-line" />

      <div className="relative min-h-screen">
        <div className="sticky top-[49px] z-20 bg-black border-b border-dashed border-[#333333]">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={handleToggle}
          >
            <div className="flex items-center gap-3">
              <span className="text-[#333333] text-xs">
                _{String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl uppercase tracking-wide">
                {project.title}
              </h3>
              {project.id === 'schills' && (
                <span className="w-2 h-2 bg-[#BEFE00] rounded-full animate-pulse" />
              )}
            </div>
            <button className="text-[#666666] p-1">
              {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
          </div>

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
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="relative">
          {images.length > 0 && (
            <div className="space-y-px bg-[#222222]">
              {images.map((img, imgIndex) => (
                <div key={imgIndex} className="relative bg-black p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#333333] text-xs uppercase">
                      _{String(imgIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
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
              ))}
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

      {/* Cross before first project */}
      <div className="relative mt-16 md:mt-24">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      {/* Projects container */}
      <div className="relative">
        {/* Animated scroll line for desktop (at 1/4 position) */}
        <ScrollLine />

        {/* Project sections */}
        {projects.map((project, index) => (
          <div key={project.id}>
            <DesktopProjectSection project={project} index={index} />
            <MobileProjectSection project={project} index={index} />
          </div>
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
