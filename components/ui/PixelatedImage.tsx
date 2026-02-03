'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

interface PixelatedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function PixelatedImage({
  src,
  alt,
  width,
  height,
  className = '',
}: PixelatedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={100}
          unoptimized
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}
