'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen({ onLoadComplete }: { onLoadComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const duration = 2500 // 2.5 second loading
    const interval = 50
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min((currentStep / steps) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setIsComplete(true)
          onLoadComplete?.()
          setTimeout(() => setIsHidden(true), 600)
        }, 400)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onLoadComplete])

  if (isHidden) return null

  return (
    <div
      className={`fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* MW ASCII Logo - W is M flipped upside-down with matched height */}
      <pre className="text-[#ffffff] text-[8px] md:text-xs lg:text-sm leading-tight tracking-tighter font-mono select-none">
{`
███╗   ███╗  ╔═╗     ╔═╗
████╗ ████║  ██║ ╔═╗ ██║
██╔████╔██║  ██║╔██╚╗██║
██║╚██╔╝██║  ██╚████╚██║
██║ ╚═╝ ██║  ████╝ ████║
╚═╝     ╚═╝  ███╝   ███╝
`}
      </pre>

      {/* Loading text */}
      <div className="text-[#666666] text-sm tracking-[0.3em] uppercase">
        <span>INITIALIZING</span>
        <span className="inline-flex ml-1">
          <span className="animate-pulse" style={{ animationDelay: '0s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-48 md:w-64">
        <div className="h-px bg-[#222222] relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3 text-xs text-[#444444] tracking-wider">
          <span>[{Math.floor(progress)}%]</span>
          <span>{progress >= 100 ? 'READY' : 'LOADING'}</span>
        </div>
      </div>

      {/* Terminal-style status messages */}
      <div className="text-xs text-[#333333] space-y-2 mt-4 tracking-wide">
        <p className={`transition-colors duration-300 ${progress > 30 ? 'text-[#555555]' : ''}`}>
          {progress > 30 ? '>' : '_'} LOADING_ASSETS
        </p>
        <p className={`transition-colors duration-300 ${progress > 60 ? 'text-[#555555]' : ''}`}>
          {progress > 60 ? '>' : '_'} INIT_COMPONENTS
        </p>
        <p className={`transition-colors duration-300 ${progress > 90 ? 'text-[#555555]' : ''}`}>
          {progress > 90 ? '>' : '_'} RENDER_READY
        </p>
      </div>
    </div>
  )
}
