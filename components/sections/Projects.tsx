'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { projects } from '@/lib/projects'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins - must happen before any component renders
gsap.registerPlugin(ScrollTrigger)


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

// Animated scroll line component - tracks scroll through projects section
function ScrollLine() {
  const lineRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!lineRef.current || !glowRef.current) return

    const line = lineRef.current
    const glow = glowRef.current
    const container = line.parentElement
    if (!container) return

    // Calculate progress based on scroll position through the container
    const updateProgress = () => {
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const containerHeight = rect.height

      // Simple linear calculation:
      // Start: when container top is 300px below viewport top (early start)
      // End: when container bottom hits viewport bottom

      const earlyStartOffset = 300 // Start 300px before container reaches top

      // How far we've scrolled into the container
      // At start: rect.top = earlyStartOffset, scrolled = 0
      // At end: rect.bottom = viewportHeight, scrolled = containerHeight - viewportHeight + earlyStartOffset
      const scrolled = earlyStartOffset - rect.top
      const totalDistance = containerHeight - viewportHeight + earlyStartOffset

      // Calculate progress (0 to 1) - pure linear
      let progress = scrolled / totalDistance
      progress = Math.max(0, Math.min(1, progress))

      // Apply to glow element
      glow.style.height = `${progress * 100}%`

      // Calculate glow bottom position for cross activation
      const glowHeight = progress * containerHeight
      const glowBottomInViewport = rect.top + glowHeight

      // Find all project crosses and update their active state
      const crosses = container.querySelectorAll('.project-cross')
      crosses.forEach((cross) => {
        const crossElement = cross as HTMLElement
        const crossRect = crossElement.getBoundingClientRect()
        const crossTopInViewport = crossRect.top

        // Activate when the glow line reaches the top of the cross (more responsive)
        // Add a small buffer (10px) to ensure edge cases are handled
        if (glowBottomInViewport >= crossTopInViewport - 10 && progress > 0) {
          crossElement.classList.add('active')
        } else {
          crossElement.classList.remove('active')
        }
      })
    }

    // Throttled scroll handler using RAF
    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        updateProgress()
        rafRef.current = null
      })
    }

    // Initial calculation
    updateProgress()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateProgress)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div ref={lineRef} className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px">
      {/* Base dashed line */}
      <div className="absolute inset-0 border-l border-dashed border-[#333333]" />

      {/* Glowing solid line trail - matches scroll position */}
      <div
        ref={glowRef}
        className="absolute left-0 w-px -ml-[0.5px]"
        style={{
          top: '0%',
          height: '0%',
          background: '#BEFE00',
          boxShadow: '0 0 6px rgba(190, 254, 0, 0.9), 0 0 12px rgba(190, 254, 0, 0.6)',
        }}
      />
    </div>
  )
}

// Desktop project section with 1/3 - 2/3 layout
function DesktopProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []
  const annotations = imageAnnotations[project.id] || []

  return (
    <div className="hidden md:block relative">
      {/* Cross marker at top */}
      <div className="relative">
        <span className="cross cross-top project-cross" style={{ left: '33.333%', transform: 'translateX(-50%)' }}>+</span>
        <div className="h-line" />
      </div>

      {/* Main grid: 1/3 info, 2/3 images */}
      <div className="grid grid-cols-3 min-h-screen">
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

        {/* Right: Images with annotations (2/3) */}
        <div className="col-span-2">
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

                  {/* Single annotation line from right side */}
                  {annotations[imgIndex] && annotations[imgIndex][0] && (
                    <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 pl-4 flex items-center gap-2">
                      <div className="w-8 border-t border-dashed border-[#444444]" />
                      <div className="w-2 h-2 border border-[#444444] rotate-45" />
                      <span className="text-[#555555] text-xs uppercase whitespace-nowrap">
                        {annotations[imgIndex][0]}
                      </span>
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

// Mobile nav height constant (matches Navigation.tsx: p-3 = 12px*2 + content ~25px = 49px)
const MOBILE_NAV_HEIGHT = 49

// Mobile project section with collapsible header using GSAP ScrollTrigger
function MobileProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [manualOverride, setManualOverride] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  // Check if mobile on mount (client-side only)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Memoized callbacks for ScrollTrigger
  const handleEnter = useCallback(() => {
    if (!manualOverride) setIsCollapsed(true)
  }, [manualOverride])

  const handleLeaveBack = useCallback(() => {
    if (!manualOverride) setIsCollapsed(false)
  }, [manualOverride])

  // GSAP ScrollTrigger for reliable scroll-based collapse
  useEffect(() => {
    if (!isMobile) return

    const section = sectionRef.current
    if (!section) return

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Kill any existing ScrollTrigger for this element
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: `top ${MOBILE_NAV_HEIGHT}px`,
        end: `bottom ${MOBILE_NAV_HEIGHT}px`,
        onEnter: handleEnter,
        onLeaveBack: handleLeaveBack,
        onEnterBack: handleEnter,
        // markers: process.env.NODE_ENV === 'development', // Uncomment for debugging
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [isMobile, handleEnter, handleLeaveBack])

  // Refresh ScrollTrigger when collapse state changes (content height changes)
  useEffect(() => {
    if (!isMobile) return
    // Debounce the refresh to allow CSS transitions to complete
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250)
    return () => clearTimeout(timer)
  }, [isCollapsed, isMobile])

  // Reset manual override after a delay
  useEffect(() => {
    if (!manualOverride) return
    const timeout = setTimeout(() => setManualOverride(false), 3000)
    return () => clearTimeout(timeout)
  }, [manualOverride])

  const handleToggle = useCallback(() => {
    setManualOverride(true)
    setIsCollapsed(prev => !prev)
  }, [])

  return (
    <div ref={sectionRef} className="md:hidden relative" data-project-section>
      <span className="cross cross-center cross-top">+</span>
      <div className="h-line" />

      <div className="relative min-h-screen">
        {/* Sticky header with dynamic top position */}
        <div
          ref={headerRef}
          className="sticky z-20 bg-black border-b border-dashed border-[#333333]"
          style={{ top: `${MOBILE_NAV_HEIGHT}px` }}
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer active:bg-[#111111] transition-colors"
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleToggle()
              }
            }}
            aria-expanded={!isCollapsed}
            aria-controls={`project-content-${project.id}`}
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
            <button
              className="text-[#666666] p-1 transition-transform duration-200"
              style={{ transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}
              aria-hidden="true"
              tabIndex={-1}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Collapsible content */}
          <div
            id={`project-content-${project.id}`}
            className="overflow-hidden transition-all duration-200 ease-out"
            style={{
              maxHeight: isCollapsed ? '0px' : '500px',
              opacity: isCollapsed ? 0 : 1,
            }}
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
        <div className="flex items-baseline justify-between">
          <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide">
            PROJECTS
          </h2>
          <span className="hidden md:inline text-[#333333] text-sm uppercase tracking-wider">
            _{projects.length.toString().padStart(2, '0')}_FEATURED
          </span>
        </div>
      </div>

      {/* Projects container - includes bottom border so ScrollLine spans full height */}
      <div className="relative mt-16 md:mt-24">
        {/* Animated scroll line for desktop (at 1/4 position) */}
        <ScrollLine />

        {/* Project sections */}
        {projects.map((project, index) => (
          <div key={project.id}>
            <DesktopProjectSection project={project} index={index} />
            <MobileProjectSection project={project} index={index} />
          </div>
        ))}

        {/* Bottom border with cross at 1/3 - inside container so ScrollLine reaches it */}
        <div className="hidden md:block relative">
          <span className="cross cross-top project-cross" style={{ left: '33.333%', transform: 'translateX(-50%)' }}>+</span>
          <div className="h-line" />
        </div>
        {/* Mobile bottom border */}
        <div className="md:hidden relative">
          <span className="cross cross-center cross-top">+</span>
          <div className="h-line" />
        </div>
      </div>
    </section>
  )
}
