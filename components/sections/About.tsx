'use client'

import { useRef } from 'react'
import RabbitHole from '@/components/ui/RabbitHole'
import DecryptedText from '@/components/DecryptedText'
import { useInView } from '@/hooks/useInView'

// Current rabbit holes - things I'm exploring/learning
const rabbitHoles = [
  {
    topic: 'AI AGENTS',
    description: 'SHIPPING WITH CLAUDE & CURSOR',
  },
  {
    topic: 'ON-CHAIN APPS',
    description: 'BUILDING IN THE CRYPTO TRENCHES',
  },
  {
    topic: 'CULTURE x CODE',
    description: 'WHERE MEMES MEET MACHINES',
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
        <h2 className={`text-3xl sm:text-4xl uppercase tracking-wide mb-6 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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

        {/* Stats */}
        <div className="space-y-1 text-[#666666] uppercase text-sm mb-8">
          <p>_7 YEARS SHIPPING CODE</p>
          <p>_FULL STACK + ON-CHAIN</p>
          <p>_AI-AUGMENTED BUILDER</p>
        </div>

        {/* Bio */}
        <div className="space-y-4 text-[#888888] text-sm leading-relaxed mb-8">
          <p>
            I BUILD AT THE INTERSECTION OF CRYPTO, AI, AND CULTURE.
            OBSESSED WITH SHIPPING PRODUCTS THAT FEEL LIKE MAGIC.
          </p>
          <p>
            FROM TOKEN-BASED COMMUNITIES TO MEME MACHINES,
            I TURN DEGEN DREAMS INTO WORKING CODE.
          </p>
          <p className="text-[#666666]">
            _BASED IN <span className="dashed-underline">MIAMI</span>
          </p>
        </div>

        {/* Contact link */}
        <div className="mb-10">
          <a
            href="mailto:mitchmalinin@gmail.com"
            className="bracket-link text-base uppercase"
          >
            [SAY HELLO]
          </a>
        </div>

        {/* Rabbit Holes - centered for mobile */}
        <RabbitHole items={rabbitHoles} />
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-2">
        {/* Left side - Title & Stats */}
        <div className="relative section-padding">
          {/* Vertical divider */}
          <div className="absolute top-0 bottom-0 right-0 v-line" />

          <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            [ABOUT]
          </p>
          <h2 className={`text-5xl lg:text-6xl uppercase tracking-wide mb-8 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
            <p>_7 YEARS SHIPPING CODE</p>
            <p>_FULL STACK + ON-CHAIN</p>
            <p>_AI-AUGMENTED BUILDER</p>
          </div>

          {/* Current Rabbit Holes - moved from bottom */}
          <RabbitHole items={rabbitHoles} />
        </div>

        {/* Right side - Bio */}
        <div className="section-padding">
          <div className="space-y-6 text-[#888888] text-lg leading-relaxed max-w-xl">
            <p>
              I BUILD AT THE INTERSECTION OF CRYPTO, AI, AND CULTURE.
              OBSESSED WITH SHIPPING PRODUCTS THAT FEEL LIKE MAGIC.
            </p>
            <p>
              FROM TOKEN-BASED COMMUNITIES TO MEME MACHINES,
              I TURN DEGEN DREAMS INTO WORKING CODE.
            </p>
            <p className="text-[#666666]">
              _BASED IN <span className="dashed-underline">MIAMI</span>
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
