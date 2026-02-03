'use client'

import { useState, useEffect, useRef } from 'react'
import Dock from '@/components/Dock'
import { Home, User, FolderOpen, FileText, FlaskConical, Mail, Menu, X } from 'lucide-react'

// Icon wrapper with hover effect for dock
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="text-white group-hover:text-[#BEFE00] transition-colors duration-200">
    {children}
  </div>
)

// Mobile navigation items
const navItems = [
  { icon: Home, label: 'HOME', id: 'top' },
  { icon: User, label: 'WHO AM I', id: 'about' },
  { icon: FolderOpen, label: 'PROJECTS', id: 'projects' },
  { icon: FileText, label: 'ARTICLES', id: 'articles' },
  { icon: FlaskConical, label: 'LAB', id: 'experiments' },
  { icon: Mail, label: 'CONNECT', id: 'contact' },
]

let activeScrollCancel: (() => void) | null = null
let clearNavHold: (() => void) | null = null

const startNavHold = () => {
  if (clearNavHold) clearNavHold()
  document.documentElement.dataset.navScrolling = '1'

  const clear = () => {
    delete document.documentElement.dataset.navScrolling
    if (clearNavHold) {
      clearNavHold()
      clearNavHold = null
    }
  }

  const onInput = () => {
    clear()
  }

  window.addEventListener('touchstart', onInput, { passive: true, once: true })
  window.addEventListener('wheel', onInput, { passive: true, once: true })
  window.addEventListener('keydown', onInput, { passive: true, once: true })

  clearNavHold = () => {
    window.removeEventListener('touchstart', onInput)
    window.removeEventListener('wheel', onInput)
    window.removeEventListener('keydown', onInput)
  }
}

const smartScrollTo = (id: string, navOffset = 0) => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (activeScrollCancel) activeScrollCancel()
  if (clearNavHold) {
    clearNavHold()
    clearNavHold = null
  }

  const getTargetTop = () => {
    if (id === 'top') return 0
    const element = document.getElementById(id)
    if (!element) return window.scrollY
    const rect = element.getBoundingClientRect()
    return rect.top + window.scrollY - navOffset
  }

  if (prefersReduced) {
    window.scrollTo({ top: getTargetTop(), behavior: 'auto' })
    return
  }

  document.documentElement.classList.add('no-smooth-scroll')
  startNavHold()

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  const computeDuration = (from: number, to: number, minMs: number, maxMs: number, divisor: number) => {
    const distance = Math.abs(to - from)
    const duration = (distance / divisor) * 1000
    return Math.min(maxMs, Math.max(minMs, duration))
  }

  let rafId: number | null = null
  let cancelled = false
  let startY = window.scrollY
  let targetY = getTargetTop()
  let lastTargetY = targetY
  let startTime = performance.now()
  let duration = computeDuration(startY, targetY, 320, 1100, 2800)

  const cleanup = () => {
    if (rafId) cancelAnimationFrame(rafId)
    document.documentElement.classList.remove('no-smooth-scroll')
    activeScrollCancel = null
  }

  const step = (now: number) => {
    if (cancelled) return
    const currentY = window.scrollY
    targetY = getTargetTop()

    if (Math.abs(targetY - lastTargetY) > 24) {
      startY = currentY
      startTime = now
      duration = computeDuration(startY, targetY, 320, 1100, 2800)
      lastTargetY = targetY
    }

    const t = Math.min(1, (now - startTime) / duration)
    const eased = easeInOutCubic(t)
    const nextY = startY + (targetY - startY) * eased
    window.scrollTo({ top: nextY, behavior: 'auto' })

    if (Math.abs(targetY - nextY) <= 1 || t >= 1) {
      window.scrollTo({ top: targetY, behavior: 'auto' })
      cleanup()
      return
    }

    rafId = requestAnimationFrame(step)
  }

  activeScrollCancel = () => {
    cancelled = true
    cleanup()
  }

  const cancelOnUserInput = () => {
    if (activeScrollCancel) activeScrollCancel()
  }

  window.addEventListener('touchstart', cancelOnUserInput, { passive: true, once: true })
  window.addEventListener('wheel', cancelOnUserInput, { passive: true, once: true })

  rafId = requestAnimationFrame(step)
}

// Mobile floating navigation
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const updateNavHeight = () => {
      const height = bar.getBoundingClientRect().height
      if (height > 0) {
        document.documentElement.style.setProperty('--mobile-nav-height', `${height}px`)
      }
    }

    updateNavHeight()
    const resizeObserver = new ResizeObserver(updateNavHeight)
    resizeObserver.observe(bar)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const scrollTo = (id: string) => {
    setIsOpen(false)
    // Delay scroll to let nav close animation complete
    setTimeout(() => {
      const navOffset = barRef.current?.getBoundingClientRect().height ?? 55
      smartScrollTo(id, navOffset)
    }, 350)
  }

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50">
      {/* Collapsed bar */}
      <div
        ref={barRef}
        className="flex items-center justify-between p-3 bg-black/95 backdrop-blur-sm border-b border-dashed border-[#333333]"
      >
        <span className="text-xs uppercase tracking-wider text-white font-mono leading-none">
          [M<span className="inline-block ml-[1px]" style={{ transform: 'rotate(180deg)', position: 'relative', top: '-1px' }}>M</span>]
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 border border-dashed border-[#333333] hover:border-[#BEFE00] transition-colors"
        >
          {isOpen ? (
            <X size={18} className="text-[#BEFE00]" />
          ) : (
            <Menu size={18} className="text-[#666666]" />
          )}
        </button>
      </div>

      {/* Expanded menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out bg-black/95 backdrop-blur-sm border-b border-dashed border-[#333333] ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-b-0'
        }`}
      >
        <div className="p-4 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full flex items-center gap-4 p-3 border border-dashed border-[#333333] hover:border-[#BEFE00] hover:bg-[#BEFE00]/5 transition-all group"
              >
                <span className="text-[#333333] text-xs">
                  _{String(index + 1).padStart(2, '0')}
                </span>
                <Icon size={16} className="text-[#666666] group-hover:text-[#BEFE00] transition-colors" />
                <span className="text-sm uppercase tracking-wider group-hover:text-[#BEFE00] transition-colors">
                  {item.label}
                </span>
                <span className="ml-auto text-[#333333] group-hover:text-[#BEFE00] transition-colors">
                  →
                </span>
              </button>
            )
          })}
        </div>

      </div>
    </div>
  )
}

// Desktop dock navigation with scroll-based expansion
function DesktopNav() {
  const [isExpanded, setIsExpanded] = useState(false)
  const manuallyExpanded = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      if (scrollY > 150 && !isExpanded) {
        setIsExpanded(true)
      } else if (scrollY <= 50 && isExpanded && !manuallyExpanded.current) {
        setIsExpanded(false)
      }

      if (scrollY > 200) {
        manuallyExpanded.current = false
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isExpanded])

  const handleManualExpand = () => {
    manuallyExpanded.current = true
    setIsExpanded(true)
  }

  const scrollTo = (id: string) => {
    smartScrollTo(id, 0) // No nav offset on desktop
  }

  const dockItems = [
    {
      icon: <IconWrapper><Home size={22} strokeWidth={1.5} /></IconWrapper>,
      label: 'HOME',
      onClick: () => scrollTo('top'),
      className: 'group',
    },
    {
      icon: <IconWrapper><User size={22} strokeWidth={1.5} /></IconWrapper>,
      label: 'WHO AM I',
      onClick: () => scrollTo('about'),
      className: 'group',
    },
    {
      icon: <IconWrapper><FolderOpen size={22} strokeWidth={1.5} /></IconWrapper>,
      label: 'PROJECTS',
      onClick: () => scrollTo('projects'),
      className: 'group',
    },
    {
      icon: <IconWrapper><FileText size={22} strokeWidth={1.5} /></IconWrapper>,
      label: 'ARTICLES',
      onClick: () => scrollTo('articles'),
      className: 'group',
    },
    {
      icon: <IconWrapper><FlaskConical size={22} strokeWidth={1.5} /></IconWrapper>,
      label: 'LAB',
      onClick: () => scrollTo('experiments'),
      className: 'group',
    },
    {
      icon: <IconWrapper><Mail size={22} strokeWidth={1.5} /></IconWrapper>,
      label: 'CONNECT',
      onClick: () => scrollTo('contact'),
      className: 'group',
    },
  ]

  return (
    <div className="hidden md:flex fixed bottom-8 left-0 right-0 z-50 justify-center">
      <Dock
        items={dockItems}
        baseItemSize={48}
        magnification={60}
        distance={120}
        panelHeight={68}
        dockHeight={90}
        spring={{ mass: 0.1, stiffness: 170, damping: 14 }}
        isExpanded={isExpanded}
        onExpandClick={handleManualExpand}
      />
    </div>
  )
}

export default function Navigation() {
  return (
    <>
      <MobileNav />
      <DesktopNav />
    </>
  )
}
