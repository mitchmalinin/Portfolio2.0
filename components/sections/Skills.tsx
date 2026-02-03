'use client'

import { useRef } from 'react'
import LogoLoop from '@/components/LogoLoop'
import { useInView } from '@/hooks/useInView'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFigma,
  SiOpenai,
  SiVercel,
} from 'react-icons/si'

const skills = [
  { node: <SiReact className="skill-icon" />, title: 'React' },
  { node: <SiNextdotjs className="skill-icon" />, title: 'Next.js' },
  { node: <SiTypescript className="skill-icon" />, title: 'TypeScript' },
  { node: <SiTailwindcss className="skill-icon" />, title: 'Tailwind' },
  { node: <SiNodedotjs className="skill-icon" />, title: 'Node.js' },
  { node: <SiFigma className="skill-icon" />, title: 'Figma' },
  { node: <SiOpenai className="skill-icon" />, title: 'Claude' },
  { node: <SiVercel className="skill-icon" />, title: 'Vercel' },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section id="skills" className="relative py-16" ref={sectionRef}>
      {/* Top border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      <div className={`py-12 transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <LogoLoop
          logos={skills}
          speed={60}
          direction="left"
          logoHeight={32}
          gap={80}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Technical skills"
        />
      </div>

      {/* Bottom border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      {/* Connector section to About - vertical line with crosses at both ends */}
      <div className="relative flex flex-col items-center">
        {/* Vertical connector line */}
        <div className="w-px h-32 md:h-48 border-l border-dashed border-[#333333]" />
        {/* Bottom cross of connector */}
        <div className="relative w-full">
          <span className="cross cross-center cross-top">+</span>
          <div className="h-line" />
        </div>
      </div>
    </section>
  )
}
