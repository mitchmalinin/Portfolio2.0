'use client'

import { useState, useEffect } from 'react'
import { useIsLoaded } from '@/components/PageWrapper'
import DecryptedText from '@/components/DecryptedText'

export default function Hero() {
  const isLoaded = useIsLoaded()
  const [frontendDecrypted, setFrontendDecrypted] = useState(false)
  const [showStrikethrough, setShowStrikethrough] = useState(false)
  const [showVibeDev, setShowVibeDev] = useState(false)

  // Sequence: Frontend decrypts -> strikethrough -> Vibe Dev decrypts
  useEffect(() => {
    if (!isLoaded) return

    // Frontend DEV finishes decrypting quickly
    const frontendTimer = setTimeout(() => {
      setFrontendDecrypted(true)
    }, 600)

    // Strikethrough animates right after
    const strikeTimer = setTimeout(() => {
      setShowStrikethrough(true)
    }, 800)

    // Vibe Dev starts decrypting immediately after strikethrough
    const vibeTimer = setTimeout(() => {
      setShowVibeDev(true)
    }, 1100)

    return () => {
      clearTimeout(frontendTimer)
      clearTimeout(strikeTimer)
      clearTimeout(vibeTimer)
    }
  }, [isLoaded])

  return (
    <section className="min-h-screen flex flex-col justify-center section-padding">
      <div className="max-w-4xl">
        {/* Name */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider mb-12 hover-glow transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {isLoaded ? (
            <DecryptedText
              text="MITCH MALININ"
              speed={40}
              maxIterations={20}
              sequential={true}
              revealDirection="start"
              animateOn="view"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*"
              className="text-white"
              encryptedClassName="text-[#444444]"
            />
          ) : (
            'MITCH MALININ'
          )}
        </h1>

        {/* Titles */}
        <div className="text-2xl md:text-3xl lg:text-4xl text-[#888888] uppercase tracking-wide space-y-2">
          <p
            className={`transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {isLoaded ? (
              <DecryptedText
                text="AI ALCHEMIST"
                speed={50}
                maxIterations={15}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
                className="text-[#888888]"
                encryptedClassName="text-[#333333]"
              />
            ) : (
              'AI ALCHEMIST'
            )}
          </p>
          <p
            className={`transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* FRONTEND DEV with animated strikethrough */}
            <span className="relative inline-block">
              {isLoaded ? (
                <DecryptedText
                  text="FRONTEND DEV"
                  speed={50}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
                  className={showStrikethrough ? 'text-[#555555]' : 'text-[#888888]'}
                  encryptedClassName="text-[#333333]"
                />
              ) : (
                'FRONTEND DEV'
              )}
              {/* Animated strikethrough line */}
              <span
                className="absolute left-0 top-1/2 h-[2px] bg-[#BEFE00] transition-all duration-500 ease-out"
                style={{
                  width: showStrikethrough ? '100%' : '0%',
                  transform: 'translateY(-50%)',
                }}
              />
            </span>{' '}
            {/* VIBE DEV - appears after strikethrough */}
            <span className="text-white">
              {showVibeDev ? (
                <DecryptedText
                  text="VIBE DEV"
                  speed={50}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
                  className="text-white"
                  encryptedClassName="text-[#444444]"
                />
              ) : (
                <span className="opacity-0">VIBE DEV</span>
              )}
            </span>
          </p>
          <p
            className={`transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="cursor">
              {isLoaded ? (
                <DecryptedText
                  text="MR.WZRD"
                  speed={60}
                  maxIterations={25}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.@#"
                  className="text-white"
                  encryptedClassName="text-[#555555]"
                />
              ) : (
                'MR.WZRD'
              )}
            </span>
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-24 transition-all duration-700 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#444444] text-sm uppercase tracking-widest">
            [SCROLL TO EXPLORE]
          </p>
        </div>
      </div>
    </section>
  )
}
