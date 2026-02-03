'use client'

import { useState } from 'react'
import Dock from '@/components/Dock'
import { Home, User, FolderOpen, FileText, FlaskConical, Mail, Menu, X } from 'lucide-react'

// Icon wrapper with hover effect for dock
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[#666666] group-hover:text-[#BEFE00] transition-colors duration-200">
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

// Mobile floating navigation
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollTo = (id: string) => {
    setIsOpen(false)
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50">
      {/* Collapsed bar */}
      <div className="flex items-center justify-between p-3 bg-black/95 backdrop-blur-sm border-b border-dashed border-[#333333]">
        <span className="text-xs uppercase tracking-wider text-[#666666]">
          [MW]
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

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-2 pb-4 text-[#333333] text-xs">
          <span>+</span>
          <span className="border-t border-dashed border-[#333333] w-16" />
          <span className="uppercase tracking-wider">NAVIGATE</span>
          <span className="border-t border-dashed border-[#333333] w-16" />
          <span>+</span>
        </div>
      </div>
    </div>
  )
}

// Desktop dock navigation
function DesktopNav() {
  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
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
    <div className="hidden md:flex fixed bottom-4 left-0 right-0 z-50 justify-center">
      <Dock
        items={dockItems}
        baseItemSize={48}
        magnification={60}
        distance={120}
        panelHeight={68}
        dockHeight={90}
        className="bg-black/95 backdrop-blur-sm"
        spring={{ mass: 0.1, stiffness: 170, damping: 14 }}
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
