'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface RabbitHoleItem {
  topic: string
  description: string
}

interface RabbitHoleProps {
  items: RabbitHoleItem[]
  className?: string
}

export default function RabbitHole({ items, className }: RabbitHoleProps) {
  const [isActive, setIsActive] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Limit to 3 items max
  const displayItems = items.slice(0, 3)

  const handleInteraction = () => {
    if (isMobile) {
      setIsActive(!isActive)
    }
  }

  useEffect(() => {
    if (!isActive) {
      setHoveredIndex(null)
    }
  }, [isActive])

  // Mobile layout - vertical with large rabbit
  if (isMobile) {
    return (
      <div className={`relative ${className}`}>
        {/* Mobile: Vertical layout */}
                <div className="flex flex-col items-center">
          {/* Label */}
          <div className={`text-center mb-1 transition-opacity duration-200 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <span className="text-[#444444] text-xs uppercase tracking-widest">
              [CURRENT_RABBIT_HOLES]
            </span>
            <p className="text-[#666666] text-xs uppercase mt-1">
              TAP TO EXPLORE
            </p>
          </div>

          <div className="relative w-full overflow-visible mt-1" style={{ height: 240 }}>
            {/* Overlay to close on outside tap */}
            {isActive && (
              <button
                aria-hidden="true"
                tabIndex={-1}
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setIsActive(false)}
              />
            )}

            {/* Cards revealed above rabbit on tap */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute left-1/2 -top-[200px] z-20 w-[300px] -translate-x-1/2"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  {displayItems.map((item, index) => (
                    <motion.div
                      key={item.topic}
                      className="absolute left-0 bg-black border border-dashed border-[#333333] w-full min-h-[110px] shadow-[0_14px_26px_rgba(0,0,0,0.55)]"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{ delay: index * 0.1, type: 'spring', stiffness: 120, damping: 18 }}
                      style={{
                        top: `${index * 72}px`,
                        transformOrigin: 'center',
                        zIndex: hoveredIndex === index ? 60 : 50 - index,
                      }}
                      onClick={(event) => event.stopPropagation()}
                      onPointerDown={() => setHoveredIndex(index)}
                    >
                      <div className="bg-[#101010] border-b border-dashed border-[#222222] px-3 py-2 flex items-center justify-between">
                        <span className="text-[#333333] text-[10px] uppercase tracking-widest">
                          FILE_{String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#333333]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#333333]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#333333]" />
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-start gap-3">
                          <span className="text-[#444444] text-xs">
                            _{String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h4 className="text-[#BEFE00] text-sm uppercase mb-1">
                              {item.topic}
                            </h4>
                            <p className="text-[#555555] text-xs uppercase">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Large clickable rabbit */}
            <button
              onClick={handleInteraction}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 cursor-pointer focus:outline-none"
              style={{ width: 210, height: 165 }}
              aria-expanded={isActive}
              aria-label="Toggle rabbit holes"
            >
              <svg
                viewBox="0 0 80 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Left ear */}
                <motion.path
                  d="M28 42 Q20 20 28 8 Q36 0 34 25 L32 42"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  fill="none"
                  animate={{
                    stroke: isActive ? '#BEFE00' : '#333333',
                    d: isActive
                      ? "M28 42 Q15 15 28 2 Q41 -8 34 25 L32 42"
                      : "M28 42 Q20 20 28 8 Q36 0 34 25 L32 42",
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Right ear */}
                <motion.path
                  d="M52 42 Q60 20 52 8 Q44 0 46 25 L48 42"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  fill="none"
                  animate={{
                    stroke: isActive ? '#BEFE00' : '#333333',
                    d: isActive
                      ? "M52 42 Q65 15 52 2 Q39 -8 46 25 L48 42"
                      : "M52 42 Q60 20 52 8 Q44 0 46 25 L48 42",
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Inner ears */}
                <motion.path
                  d="M30 40 Q24 25 30 14 Q34 8 33 28"
                  stroke="#444444"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  fill="none"
                  animate={{ stroke: isActive ? '#BEFE00' : '#444444', opacity: isActive ? 0.6 : 0.4 }}
                />
                <motion.path
                  d="M50 40 Q56 25 50 14 Q46 8 47 28"
                  stroke="#444444"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  fill="none"
                  animate={{ stroke: isActive ? '#BEFE00' : '#444444', opacity: isActive ? 0.6 : 0.4 }}
                />
                {/* Hole */}
                <motion.ellipse cx="40" cy="52" rx="28" ry="10" fill="#000000" />
                <motion.ellipse
                  cx="40" cy="50" rx="32" ry="14"
                  stroke="#333333" strokeWidth="1.5" strokeDasharray="4 3" fill="none"
                  animate={{ stroke: isActive ? '#BEFE00' : '#333333' }}
                />
                <motion.ellipse
                  cx="40" cy="52" rx="26" ry="10"
                  stroke="#222222" strokeWidth="1" strokeDasharray="2 2" fill="none"
                  animate={{ stroke: isActive ? 'rgba(190, 254, 0, 0.3)' : '#222222' }}
                />
                {/* Dots */}
                <motion.circle cx="8" cy="48" r="1" fill="#333333" animate={{ fill: isActive ? '#BEFE00' : '#333333' }} />
                <motion.circle cx="72" cy="48" r="1" fill="#333333" animate={{ fill: isActive ? '#BEFE00' : '#333333' }} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Desktop layout - horizontal with hover
  return (
    <div className={`relative ${className}`}>
      {/* Main container - flex layout: icon LEFT | text/items RIGHT */}
      <div
        className="flex items-center gap-6"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => {
          setIsActive(false)
          setHoveredIndex(null)
        }}
      >
        {/* Left side - Rabbit Hole SVG */}
        <motion.div
          className="relative cursor-pointer shrink-0"
          style={{ width: 150, height: 125 }}
        >
          <svg
            viewBox="0 0 80 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Left ear - coming out of the hole */}
            <motion.path
              d="M28 42 Q20 20 28 8 Q36 0 34 25 L32 42"
              stroke="#333333"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
              animate={{
                stroke: isActive ? '#BEFE00' : '#333333',
                d: isActive
                  ? "M28 42 Q15 15 28 2 Q41 -8 34 25 L32 42"
                  : "M28 42 Q20 20 28 8 Q36 0 34 25 L32 42",
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Right ear - coming out of the hole */}
            <motion.path
              d="M52 42 Q60 20 52 8 Q44 0 46 25 L48 42"
              stroke="#333333"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
              animate={{
                stroke: isActive ? '#BEFE00' : '#333333',
                d: isActive
                  ? "M52 42 Q65 15 52 2 Q39 -8 46 25 L48 42"
                  : "M52 42 Q60 20 52 8 Q44 0 46 25 L48 42",
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Inner left ear */}
            <motion.path
              d="M30 40 Q24 25 30 14 Q34 8 33 28"
              stroke="#444444"
              strokeWidth="1"
              strokeDasharray="2 2"
              fill="none"
              animate={{
                stroke: isActive ? '#BEFE00' : '#444444',
                opacity: isActive ? 0.6 : 0.4,
              }}
            />
            {/* Inner right ear */}
            <motion.path
              d="M50 40 Q56 25 50 14 Q46 8 47 28"
              stroke="#444444"
              strokeWidth="1"
              strokeDasharray="2 2"
              fill="none"
              animate={{
                stroke: isActive ? '#BEFE00' : '#444444',
                opacity: isActive ? 0.6 : 0.4,
              }}
            />

            {/* Hole depth - inner darkness ellipse */}
            <motion.ellipse
              cx="40"
              cy="52"
              rx="28"
              ry="10"
              fill="#000000"
              stroke="none"
            />

            {/* Hole rim - outer ellipse (perspective oval) */}
            <motion.ellipse
              cx="40"
              cy="50"
              rx="32"
              ry="14"
              stroke="#333333"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              fill="none"
              animate={{
                stroke: isActive ? '#BEFE00' : '#333333',
              }}
            />

            {/* Inner rim for depth effect */}
            <motion.ellipse
              cx="40"
              cy="52"
              rx="26"
              ry="10"
              stroke="#222222"
              strokeWidth="1"
              strokeDasharray="2 2"
              fill="none"
              animate={{
                stroke: isActive ? 'rgba(190, 254, 0, 0.3)' : '#222222',
              }}
            />

            {/* Depth lines going into the hole */}
            <motion.line
              x1="12"
              y1="50"
              x2="16"
              y2="54"
              stroke="#222222"
              strokeWidth="1"
              strokeDasharray="2 2"
              animate={{
                stroke: isActive ? 'rgba(190, 254, 0, 0.2)' : '#222222',
              }}
            />
            <motion.line
              x1="68"
              y1="50"
              x2="64"
              y2="54"
              stroke="#222222"
              strokeWidth="1"
              strokeDasharray="2 2"
              animate={{
                stroke: isActive ? 'rgba(190, 254, 0, 0.2)' : '#222222',
              }}
            />

            {/* Small dots/particles around hole for texture */}
            <motion.circle cx="8" cy="48" r="1" fill="#333333" animate={{ fill: isActive ? '#BEFE00' : '#333333' }} />
            <motion.circle cx="72" cy="48" r="1" fill="#333333" animate={{ fill: isActive ? '#BEFE00' : '#333333' }} />
            <motion.circle cx="40" cy="66" r="1" fill="#222222" animate={{ fill: isActive ? 'rgba(190, 254, 0, 0.5)' : '#222222' }} />
          </svg>

          {/* Subtle glow on the hole when hovered */}
          {isActive && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(190, 254, 0, 0.5))',
              }}
            />
          )}
        </motion.div>

        {/* Right side - Text that transitions to cards */}
        <div className="relative min-w-[320px] h-[140px] flex items-center">
          {/* Default state - Labels */}
          <AnimatePresence>
            {!isActive && (
              <motion.div
                className="absolute inset-0 flex flex-col justify-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[#444444] text-xs uppercase tracking-widest mb-1">
                  [CURRENT_RABBIT_HOLES]
                </span>
                <span className="text-[#888888] text-sm uppercase tracking-wider">
                  HOVER TO EXPLORE
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover state - Animated cards */}
          <AnimatePresence>
            {isActive && (
              <div className="absolute inset-0">
                {displayItems.map((item, index) => {
                  const totalItems = displayItems.length
                  const isItemHovered = hoveredIndex === index
                  // Stack cards vertically with slight offset and rotation
                  const baseY = totalItems === 1 ? 0 : totalItems === 2 ? (index - 0.5) * 50 : (index - 1) * 45
                  const rotation = totalItems === 1 ? 0 : totalItems === 2 ? (index - 0.5) * 4 : (index - 1) * 3
                  const xOffset = index * 12

                  // Z-index: hovered item goes to front, otherwise based on reverse index
                  const zIndex = isItemHovered ? 100 : (10 + (totalItems - index))

                  return (
                    <motion.div
                      key={item.topic}
                      className="absolute top-1/2 left-0 origin-left cursor-pointer"
                      initial={{ opacity: 0, x: -30, y: '-50%', rotate: 0 }}
                      animate={{
                        opacity: 1,
                        x: xOffset,
                        y: `calc(-50% + ${baseY}px)`,
                        rotate: rotation,
                      }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 22,
                        delay: index * 0.08,
                      }}
                      style={{ zIndex }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <motion.div
                        className="bg-black border border-dashed min-w-[240px] shadow-[0_14px_26px_rgba(0,0,0,0.55)]"
                        animate={{
                          borderColor: isItemHovered ? '#BEFE00' : '#333333',
                        }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="bg-[#101010] border-b border-dashed border-[#222222] px-3 py-2 flex items-center justify-between">
                          <span className="text-[#333333] text-[10px] uppercase tracking-widest">
                            FILE_{String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#333333]" />
                            <span className="h-1.5 w-1.5 rounded-full bg-[#333333]" />
                            <span className="h-1.5 w-1.5 rounded-full bg-[#333333]" />
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex items-start gap-3">
                            <span className="text-[#444444] text-xs">
                              _{String(index + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <motion.h4
                                className="text-sm uppercase mb-1"
                                animate={{
                                  color: isItemHovered ? '#BEFE00' : '#888888',
                                }}
                              >
                                {item.topic}
                              </motion.h4>
                              <p className="text-[#555555] text-xs uppercase">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
