'use client'

import { useRef } from 'react'
import RabbitHole from '@/components/ui/RabbitHole'
import DecryptedText from '@/components/DecryptedText'
import { useInView } from '@/hooks/useInView'

// Current rabbit holes - things I'm exploring/learning
const rabbitHoles = [
  {
    topic: 'AGENTIC WORKFLOW',
    description: 'OPENCLAW + CLAUDE/CODEX SKILLS',
  },
  {
    topic: 'VIBE DESIGNING',
    description: 'USING AI TO BUILD DESIGN',
  },
  {
    topic: 'FOUNDER MODE',
    description: 'BUILDING A SAAS COMPANY (SHILLZ)',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section id="about" className="relative scroll-mt-[55px] md:scroll-mt-0" ref={sectionRef}>
      {/* Top border provided by Skills connector */}

      {/* Mobile layout */}
      <div className="md:hidden section-padding">
        <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          [ABOUT]
        </p>
        <h2 className={`text-4xl sm:text-5xl uppercase tracking-wide mb-6 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {isInView ? (
            <DecryptedText
              text="WHO AM I"
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
            'WHO AM I'
          )}
        </h2>

        {/* Stats */}
        <div className="space-y-2 text-[#666666] uppercase text-sm py-6 border-b border-dashed border-[#222222]">
          <p>_7 YEARS SHIPPING CODE</p>
          <p>_FRONT END + ON-CHAIN</p>
          <p>_AI-ENHANCED BUILDER</p>
        </div>

        {/* Bio */}
        <div className="space-y-6 text-[#888888] text-sm leading-[1.8] py-6 border-b border-dashed border-[#222222] mb-8">
          <p>
            I BUILD AT THE INTERSECTION OF CRYPTO, AI, AND CULTURE, SHIPPING PRODUCTS THAT FEEL LIKE MAGIC.
          </p>
          <p>
            THE KIND OF MAGIC THAT ONLY HAPPENS WHEN SOMEONE OBSESSES OVER THE DETAILS. BECAUSE &ldquo;IF WE LOSE THE DETAILS, WE LOSE IT ALL.&rdquo; — WALT DISNEY
          </p>
          <p className="text-[#666666]">
            _BASED IN <span className="dashed-underline">MIAMI</span>
          </p>
        </div>

        {/* Rabbit Holes - centered for mobile */}
        <div className="mt-3">
          <RabbitHole items={rabbitHoles} />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-2">
        {/* Left side - Title & Stats */}
        <div className="relative section-padding flex flex-col gap-12">
          {/* Vertical divider */}
          <div className="absolute top-0 bottom-0 right-0 v-line" />

          <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            [ABOUT]
          </p>
          <h2 className={`text-5xl lg:text-6xl uppercase tracking-wide mb-8 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {isInView ? (
              <DecryptedText
                text="WHO AM I"
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
              'WHO AM I'
            )}
          </h2>

          <div className="space-y-2 text-[#666666] uppercase text-base mb-12">
            <p>_7 YEARS SHIPPING CODE</p>
            <p>_FRONT END + ON-CHAIN</p>
            <p>_AI-ENHANCED BUILDER</p>
          </div>

          {/* Current Rabbit Holes */}
          <RabbitHole items={rabbitHoles} />
        </div>

        {/* Right side - Bio */}
        <div className="section-padding flex items-center">
          <div className="space-y-6 text-[#888888] text-lg leading-relaxed max-w-xl">
            <p>
              I BUILD AT THE INTERSECTION OF CRYPTO, AI, AND CULTURE, SHIPPING PRODUCTS THAT FEEL LIKE MAGIC.
            </p>
            <p>
              THE KIND OF MAGIC THAT ONLY HAPPENS WHEN SOMEONE OBSESSES OVER THE DETAILS. BECAUSE &ldquo;IF WE LOSE THE DETAILS, WE LOSE IT ALL.&rdquo; — WALT DISNEY
            </p>
            <p className="text-[#666666]">
              _BASED IN <span className="dashed-underline">MIAMI</span>
            </p>
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
