'use client'

import DecryptedText from '@/components/DecryptedText'
import PixelatedImage from '@/components/ui/PixelatedImage'
import { useInView } from '@/hooks/useInView'
import { projects } from '@/lib/projects'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Annotation labels for images
const imageAnnotations: Record<string, string[][]> = {
  'shillz': [
    ['LANDING', 'GET PAID TO SHILL', 'CREATOR PLATFORM'],
    ['DASHBOARD', 'ACTIVE SHILLZ', 'LIVE METRICS'],
    ['PROJECT PAGE', 'CAMPAIGN DETAILS', 'REWARD POOLS'],
    ['ANALYTICS', 'PERFORMANCE TRENDS', 'BUDGET BREAKDOWN'],
    ['PROFILE', 'CREATOR STATS', 'EARNINGS'],
  ],
  'y2k-dotcom': [
    ['HOMEPAGE', 'NOSTALGIA OS', 'CULTURE COIN'],
    ['MEME MACHINE', 'AI GENERATION', 'INSTANT MEMES'],
    ['PORTFOLIO', 'HOLDER DASHBOARD', 'ON-CHAIN DATA'],
    ['MEME DATABASE', 'SEARCHABLE ARCHIVE', 'COMMUNITY UPLOADS'],
  ],
  'y2k-coded': [
    ['DROP PAGE', 'COUNTDOWN TIMER', 'NOSTALGIA VIBES'],
    ['ARCHIVE', 'PAST DROPS', 'SOLD OUT'],
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

      const earlyStartOffset = 600 // Start 600px before container reaches top

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

      // Find all project dividers (cross + h-line) and update their active state
      const dividers = container.querySelectorAll('.project-divider')
      dividers.forEach((divider) => {
        const dividerElement = divider as HTMLElement
        const cross = dividerElement.querySelector('.project-cross') as HTMLElement
        const hLine = dividerElement.querySelector('.project-h-line') as HTMLElement

        if (!cross) return

        const crossRect = cross.getBoundingClientRect()
        const crossTopInViewport = crossRect.top

        // Activate when the glow line reaches the cross
        if (glowBottomInViewport >= crossTopInViewport - 10 && progress > 0) {
          cross.classList.add('active')
          if (hLine) hLine.classList.add('active')
        } else {
          cross.classList.remove('active')
          if (hLine) hLine.classList.remove('active')
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

      {/* Solid yellow line trail - matches scroll position */}
      <div
        ref={glowRef}
        className="absolute left-0 w-px -ml-[0.5px]"
        style={{
          top: '0%',
          height: '0%',
          background: '#BEFE00',
        }}
      />
    </div>
  )
}

// Desktop project section with 1/3 - 2/3 layout
function DesktopProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []
  const annotations = imageAnnotations[project.id] || []
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <div className="hidden md:block relative" ref={sectionRef}>
      {/* Cross marker at top */}
      <div className="relative project-divider">
        <span className="cross cross-top project-cross" style={{ left: '33.333%', transform: 'translateX(-50%) translateY(-50%)' }}>+</span>
        <div className="h-line project-h-line" />
      </div>

      {/* Main grid: 1/3 info, 2/3 images */}
      <div className="grid grid-cols-3 min-h-screen">
        {/* Left: Project info (sticky, top-aligned) */}
        <div className="col-span-1 relative">
          <div className="sticky top-0 h-screen flex flex-col justify-start pt-16 lg:pt-24 p-8 lg:p-12 border-r border-dashed border-[#333333]">
            <p className={`text-[#333333] text-xs mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              _{String(index + 1).padStart(2, '0')}
            </p>
            <h3 className={`text-2xl lg:text-3xl xl:text-4xl uppercase tracking-wide mb-3 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {isInView ? (
                <DecryptedText
                  text={project.title}
                  speed={70}
                  maxIterations={25}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789."
                  className="text-white"
                  encryptedClassName="text-[#333333]"
                />
              ) : (
                project.title
              )}
            </h3>
            <p className={`text-[#666666] uppercase text-xs mb-6 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {project.subtitle}
            </p>
            <div className={`space-y-1 text-[#888888] uppercase text-xs mb-8 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {project.description.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {/* Sub-projects */}
            {project.subProjects && (
              <div className={`space-y-2 mb-8 transition-all duration-700 delay-[400ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {project.subProjects.map((sub, subIndex) => (
                  sub.link ? (
                    <a
                      key={sub.name}
                      href={sub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-dashed border-[#333333] p-2 hover:border-[#BEFE00] hover:bg-[#BEFE00]/5 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#333333] text-xs group-hover:text-[#BEFE00] transition-colors">
                          _{String(subIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs uppercase">{sub.name}</span>
                      </div>
                      <span className="text-[#444444] group-hover:text-[#BEFE00] transition-colors text-sm">
                        ↗
                      </span>
                    </a>
                  ) : (
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
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Links */}
            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-[500ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
            {project.id === 'shillz' && (
              <div className={`mt-8 flex items-center gap-2 transition-all duration-700 delay-[600ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="w-2 h-2 bg-[#BEFE00] rounded-full animate-pulse" />
                <span className="text-[#BEFE00] text-xs uppercase tracking-wider">
                  ACTIVE
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Images with annotations (2/3) */}
        <div className="col-span-2 pt-16 lg:pt-24">
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
                    <PixelatedImage
                      src={img}
                      alt={`${project.title} screenshot ${imgIndex + 1}`}
                      width={1920}
                      height={1080}
                      className="w-full"
                    />
                  </div>

                  {/* Decorative line on right side - hidden on smaller screens to prevent overflow */}
                  <div className="hidden lg:flex absolute top-1/2 right-0 translate-x-full -translate-y-1/2 pl-4 items-center gap-2">
                    <div className="w-8 border-t border-dashed border-[#444444]" />
                    <div className="w-2 h-2 border border-[#444444] rotate-45" />
                  </div>
                </div>

                {/* Annotation label below image */}
                {annotations[imgIndex] && annotations[imgIndex][0] && (
                  <div className="flex justify-end mt-4">
                    <span className="text-[#555555] text-xs uppercase">
                      {annotations[imgIndex][0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mobile nav height for sticky positioning (p-3 = 12px * 2 + ~25px content = ~49px)
const MOBILE_NAV_HEIGHT = 49

// Mobile project section - each header sticks to same position, next project covers previous
function MobileProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const wasStickyRef = useRef(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [manualOverride, setManualOverride] = useState(false)

  // All projects sticky at the same position - right below mobile nav
  // Using -1 so the header's top border visually merges with nav's bottom border
  const stickyTop = MOBILE_NAV_HEIGHT - 1
  const zIndex = 40 + index

  // Measure content height for smooth animation
  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const measureHeight = () => {
      const height = content.scrollHeight
      if (height > 0) setContentHeight(height)
    }

    measureHeight()
    const timer = setTimeout(measureHeight, 100)
    const resizeObserver = new ResizeObserver(measureHeight)
    resizeObserver.observe(content)

    return () => {
      resizeObserver.disconnect()
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const nowSticky = rect.top <= stickyTop + 1
        const sectionScrolledPast = rect.bottom <= stickyTop + 60
        const sectionBeforeSticky = rect.top > stickyTop + 1

        setIsSticky(nowSticky)

        // Auto-manage collapse unless user manually toggled
        if (!manualOverride) {
          if (nowSticky && !wasStickyRef.current) {
            setIsCollapsed(true)
          } else if (sectionBeforeSticky && wasStickyRef.current) {
            setIsCollapsed(false)
          } else if (sectionScrolledPast) {
            setIsCollapsed(true)
          }
        }

        // Reset manual override when section leaves sticky state
        if (sectionBeforeSticky || sectionScrolledPast) {
          setManualOverride(false)
        }

        wasStickyRef.current = nowSticky
        rafId = null
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [stickyTop, manualOverride])

  // Handle manual toggle
  const handleToggle = () => {
    setManualOverride(true)
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div ref={sectionRef} className="md:hidden relative" data-project-section>
      {/* Top border - mobile: just border, desktop: line with cross */}
      <div className="md:hidden border-t border-dashed border-[#333333]" />
      <div className="hidden md:block relative">
        {index > 0 && <span className="cross cross-center cross-top">+</span>}
        <div className="h-line" />
      </div>

      {/* Sticky header - all at same position, later projects cover earlier */}
      <div
        className={`sticky bg-black ${isSticky && index === 0 ? 'border-t border-dashed border-[#333333]' : ''}`}
        style={{ top: `${stickyTop}px`, zIndex }}
      >
        {/* Title bar - more top padding when sticky for breathing room from nav */}
        <button
          className={`w-full flex items-center justify-between px-3 pb-3 border-b border-dashed border-[#333333] ${
            isSticky ? 'pt-6' : 'pt-3'
          }`}
          onClick={handleToggle}
          aria-expanded={!isCollapsed}
          aria-controls={`project-content-${project.id}`}
        >
          <div className="flex items-center gap-3">
            <span className={`text-xs transition-colors duration-200 ${
              isSticky && isCollapsed ? 'text-[#BEFE00]' : 'text-[#333333]'
            }`}>
              _{String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-base sm:text-lg uppercase tracking-wide text-left">
              {project.title}
            </h3>
            {project.id === 'shillz' && (
              <span className="w-2 h-2 bg-[#BEFE00] rounded-full animate-pulse" />
            )}
          </div>
          <ChevronDown
            size={18}
            className={`transition-all duration-200 shrink-0 ${
              !isCollapsed ? 'rotate-180 text-[#BEFE00]' : 'text-[#666666]'
            }`}
          />
        </button>

        {/* Collapsible content */}
        <div
          id={`project-content-${project.id}`}
          className={`bg-black overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isCollapsed ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[500px] opacity-100'
          }`}
        >
          <div
            ref={contentRef}
            className={`px-3 pb-3 pt-4 border-t border-dashed border-[#333333] transition-opacity duration-200 ${
              isCollapsed ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <p className="text-[#666666] uppercase text-xs mb-2">
              {project.subtitle}
            </p>
            <div className="space-y-1 text-[#888888] uppercase text-xs mb-3">
              {project.description.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bracket-link uppercase text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  [{link.label}]
                </a>
              ))}
            </div>

            {project.subProjects && (
              <div className="space-y-2">
                {project.subProjects.map((sub, subIndex) => (
                  sub.link ? (
                    <a
                      key={sub.name}
                      href={sub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-dashed border-[#333333] p-2 active:bg-[#BEFE00]/10 group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#333333] text-xs">
                          _{String(subIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs uppercase">{sub.name}</span>
                      </div>
                      <span className="text-[#444444] text-sm">
                        ↗
                      </span>
                    </a>
                  ) : (
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
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className="relative mt-4 space-y-4 px-4">
          {images.map((img, imgIndex) => (
            <div key={imgIndex}>
              <p className="text-[#333333] text-xs uppercase mb-2">
                _{String(imgIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </p>
              <div className="border border-dashed border-[#333333] overflow-hidden">
                <PixelatedImage
                  src={img}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  width={800}
                  height={600}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom spacing */}
      <div className="h-8" />
    </div>
  )
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef)

  return (
    <section id="projects" className="relative">
      {/* Section header */}
      <div className="section-padding pb-0" ref={headerRef}>
        <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          [SELECTED WORK]
        </p>
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-0">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide transition-all duration-700 delay-100 ${isHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {isHeaderInView ? (
              <DecryptedText
                text="PROJECTS"
                speed={50}
                maxIterations={15}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                className="text-white"
                encryptedClassName="text-[#333333]"
              />
            ) : (
              'PROJECTS'
            )}
          </h2>
          <span className={`text-[#333333] text-xs md:text-sm uppercase tracking-wider transition-all duration-700 delay-200 ${isHeaderInView ? 'opacity-100' : 'opacity-0'}`}>
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
        <div className="hidden md:block relative project-divider">
          <span className="cross cross-top project-cross" style={{ left: '33.333%', transform: 'translateX(-50%) translateY(-50%)' }}>+</span>
          <div className="h-line project-h-line" />
        </div>
        {/* Mobile bottom border - no cross */}
        <div className="md:hidden border-t border-dashed border-[#333333]" />
      </div>
    </section>
  )
}
