'use client'

import Dock from '@/components/Dock'
import { Home, User, FolderOpen, FlaskConical, Mail } from 'lucide-react'

// Icon wrapper with hover effect
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[#666666] group-hover:text-[#BEFE00] transition-colors duration-200 [&:hover]:drop-shadow-[0_0_8px_rgba(190,254,0,0.6)]">
    {children}
  </div>
)

export default function Navigation() {
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
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
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
