'use client'

import { useRef } from 'react'
import RabbitHole from '@/components/ui/RabbitHole'
import DecryptedText from '@/components/DecryptedText'
import { useInView } from '@/hooks/useInView'

// Current rabbit holes - things I'm exploring/learning
const rabbitHoles = [
  {
    topic: 'AI AGENTS',
    description: 'BUILDING AUTONOMOUS SYSTEMS WITH CLAUDE',
  },
  {
    topic: 'WEBGL SHADERS',
    description: 'CUSTOM VISUAL EFFECTS & DITHERING',
  },
  {
    topic: 'EDGE COMPUTING',
    description: 'SERVERLESS AT THE EDGE WITH CLOUDFLARE',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section id="about" className="relative" ref={sectionRef}>
      {/* Top border provided by Skills connector */}
      <div className="grid md:grid-cols-2">
        {/* Left side - Title & Stats */}
        <div className="relative section-padding">
          {/* Vertical divider */}
          <div className="hidden md:block absolute top-0 bottom-0 right-0 v-line" />

          <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            [ABOUT]
          </p>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-8 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {isInView ? (
              <DecryptedText
                text="WHO I AM"
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
              'WHO I AM'
            )}
          </h2>

          <div className="space-y-2 text-[#666666] uppercase text-base mb-12">
            <p>_5+ YEARS EXPERIENCE</p>
            <p>_50+ PROJECTS BUILT</p>
            <p>_AI-POWERED DEVELOPMENT</p>
          </div>

          {/* Current Rabbit Holes - moved from bottom */}
          <RabbitHole items={rabbitHoles} />
        </div>

        {/* Right side - Bio & Rabbit Holes */}
        <div className="section-padding">
          <div className="space-y-6 text-[#888888] text-lg leading-relaxed max-w-xl">
            <p>
              I BUILD THINGS AT THE INTERSECTION OF AI AND WEB DEVELOPMENT.
              SPECIALIZING IN MODERN JAVASCRIPT FRAMEWORKS, I LEVERAGE TOOLS
              LIKE CLAUDE AND CURSOR TO ACCELERATE DEVELOPMENT.
            </p>
            <p>
              FROM PIXEL-PERFECT INTERFACES TO SCALABLE BACKEND SYSTEMS,
              I CREATE INTELLIGENT EXPERIENCES THAT PUSH BOUNDARIES.
            </p>
            <p className="text-[#666666]">
              _BASED IN <span className="dashed-underline">LOS ANGELES</span>
            </p>
          </div>

          {/* Contact link */}
          <div className="mt-10">
            <a
              href="mailto:mitchmalinin@gmail.com"
              className="bracket-link text-lg uppercase"
            >
              [SAY HELLO]
            </a>
          </div>
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
