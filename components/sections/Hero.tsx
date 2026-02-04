'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useIsLoaded } from '@/components/PageWrapper'
import DecryptedText from '@/components/DecryptedText'

// Custom component for the name that toggles between MR.WZRD and MITCH MALININ
function ToggleName({ isLoaded }: { isLoaded: boolean }) {
  const [displayText, setDisplayText] = useState('MR.WZRD')
  const [isToggled, setIsToggled] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [hasInitialAnimated, setHasInitialAnimated] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'
  const speed = 40

  const targetText = isToggled ? 'MITCH MALININ' : 'MR.WZRD'

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const shuffleText = useCallback((target: string, revealed: Set<number>): string => {
    return target
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (revealed.has(i)) return target[i]
        return characters[Math.floor(Math.random() * characters.length)]
      })
      .join('')
  }, [characters])

  // Initial animation on load - decrypt to MR.WZRD
  useEffect(() => {
    if (!isLoaded || hasInitialAnimated) return

    const target = 'MR.WZRD'
    setIsScrambling(true)
    setRevealedIndices(new Set())

    let currentIndex = 0
    intervalRef.current = setInterval(() => {
      if (currentIndex < target.length) {
        setRevealedIndices(prev => {
          const newSet = new Set(prev)
          newSet.add(currentIndex)
          setDisplayText(shuffleText(target, newSet))
          return newSet
        })
        currentIndex++
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsScrambling(false)
        setDisplayText(target)
        setHasInitialAnimated(true)
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isLoaded, hasInitialAnimated, shuffleText])

  // Toggle animation (hover on desktop, click on mobile)
  useEffect(() => {
    if (!hasInitialAnimated) return

    if (intervalRef.current) clearInterval(intervalRef.current)

    setIsScrambling(true)
    setRevealedIndices(new Set())

    let currentIndex = 0
    intervalRef.current = setInterval(() => {
      if (currentIndex < targetText.length) {
        setRevealedIndices(prev => {
          const newSet = new Set(prev)
          newSet.add(currentIndex)
          setDisplayText(shuffleText(targetText, newSet))
          return newSet
        })
        currentIndex++
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsScrambling(false)
        setDisplayText(targetText)
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isToggled, hasInitialAnimated, targetText, shuffleText])

  const handleClick = () => {
    if (isMobile) {
      setIsToggled(prev => !prev)
    }
  }

  return (
    <span
      className="cursor-pointer select-none"
      onMouseEnter={() => !isMobile && setIsToggled(true)}
      onMouseLeave={() => !isMobile && setIsToggled(false)}
      onClick={handleClick}
    >
      {displayText.split('').map((char, index) => {
        const isRevealed = revealedIndices.has(index) || !isScrambling
        return (
          <span
            key={index}
            className={isRevealed ? 'text-white' : 'text-[#444444]'}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

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
    <section className="min-h-screen flex flex-col justify-start md:justify-center section-padding relative">
      <div className="max-w-4xl md:mb-24 lg:mb-32">
        {/* Name - toggles between MR.WZRD and MITCH MALININ on hover */}
        <h1
          className={`text-6xl sm:text-7xl md:text-7xl lg:text-8xl uppercase tracking-wider mb-6 md:mb-12 hover-glow transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ToggleName isLoaded={isLoaded} />
        </h1>

        {/* Titles */}
        <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-[#888888] uppercase tracking-wide space-y-2 md:space-y-2">
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
                  text="HOBBY DESIGNER"
                  speed={60}
                  maxIterations={25}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
                  className="text-[#888888]"
                  encryptedClassName="text-[#333333]"
                />
              ) : (
                'HOBBY DESIGNER'
              )}
            </span>
          </p>
        </div>

        {/* Scroll indicator - directly under titles on mobile */}
        <p
          className={`text-[#444444] text-xs md:text-sm uppercase tracking-widest mt-[100px] md:hidden transition-all duration-700 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          [SCROLL TO EXPLORE]
        </p>
      </div>

      {/* Scroll indicator - absolute on desktop only */}
      <div
        className={`hidden md:block absolute bottom-8 left-0 right-0 section-padding transition-all duration-700 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-[#444444] text-sm uppercase tracking-widest">
          [SCROLL TO EXPLORE]
        </p>
      </div>
    </section>
  )
}
