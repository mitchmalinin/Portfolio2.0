'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSvg, setIsSvg] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const revealedTilesRef = useRef<Set<number>>(new Set())
  const animationRef = useRef<number | null>(null)

  // Tile configuration
  const TILE_SIZE = 16
  const REVEAL_SPEED = 150 // tiles per frame

  // Check if SVG
  useEffect(() => {
    setIsSvg(src.toLowerCase().endsWith('.svg'))
  }, [src])

  // Load the image
  useEffect(() => {
    if (isSvg) return

    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imageRef.current = img
      setIsLoaded(true)
    }
    img.onerror = () => {
      setIsLoaded(false)
    }
    img.src = src
  }, [src, isSvg])

  // Draw the image with decrypt effect
  const drawDecrypt = useCallback((revealedTiles: Set<number>, totalTiles: number, tilesX: number, tilesY: number) => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = containerRef.current
    if (!container) return

    const containerWidth = container.offsetWidth
    if (containerWidth === 0) return

    const aspectRatio = img.height / img.width
    const containerHeight = containerWidth * aspectRatio

    if (canvas.width !== containerWidth || canvas.height !== containerHeight) {
      canvas.width = containerWidth
      canvas.height = containerHeight
    }

    // Clear
    ctx.clearRect(0, 0, containerWidth, containerHeight)

    // Draw scrambled background for unrevealed tiles
    const tileWidth = containerWidth / tilesX
    const tileHeight = containerHeight / tilesY

    for (let i = 0; i < totalTiles; i++) {
      const x = (i % tilesX) * tileWidth
      const y = Math.floor(i / tilesX) * tileHeight

      if (revealedTiles.has(i)) {
        // Draw actual image tile
        const srcX = (i % tilesX) * (img.width / tilesX)
        const srcY = Math.floor(i / tilesX) * (img.height / tilesY)
        const srcW = img.width / tilesX
        const srcH = img.height / tilesY

        ctx.drawImage(
          img,
          srcX, srcY, srcW, srcH,
          x, y, tileWidth + 0.5, tileHeight + 0.5 // +0.5 to avoid gaps
        )
      } else {
        // Draw scrambled/encrypted tile
        // Sample color from a random part of the image for this tile
        const randomTile = Math.floor(Math.random() * totalTiles)
        const srcX = (randomTile % tilesX) * (img.width / tilesX)
        const srcY = Math.floor(randomTile / tilesX) * (img.height / tilesY)
        const srcW = img.width / tilesX
        const srcH = img.height / tilesY

        ctx.globalAlpha = 0.4
        ctx.drawImage(
          img,
          srcX, srcY, srcW, srcH,
          x, y, tileWidth + 0.5, tileHeight + 0.5
        )
        ctx.globalAlpha = 1

        // Add noise/static effect
        ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 190 : 0}, ${Math.random() > 0.5 ? 254 : 0}, 0, 0.1)`
        ctx.fillRect(x, y, tileWidth, tileHeight)
      }
    }
  }, [])

  // Start reveal animation when in view
  useEffect(() => {
    if (!isLoaded || isSvg || hasStarted) return

    const container = containerRef.current
    if (!container) return

    const checkInView = () => {
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Start when image enters viewport
      if (rect.top < viewportHeight * 0.9 && rect.bottom > 0) {
        setHasStarted(true)
      }
    }

    checkInView()
    window.addEventListener('scroll', checkInView, { passive: true })

    return () => {
      window.removeEventListener('scroll', checkInView)
    }
  }, [isLoaded, isSvg, hasStarted])

  // Run the decrypt animation
  useEffect(() => {
    if (!isLoaded || isSvg || !hasStarted || isRevealed) return

    const container = containerRef.current
    if (!container) return

    const containerWidth = container.offsetWidth
    const img = imageRef.current
    if (!img || containerWidth === 0) return

    const aspectRatio = img.height / img.width
    const containerHeight = containerWidth * aspectRatio

    const tilesX = Math.ceil(containerWidth / TILE_SIZE)
    const tilesY = Math.ceil(containerHeight / TILE_SIZE)
    const totalTiles = tilesX * tilesY

    // Create shuffled array of tile indices for random reveal
    const tileOrder = Array.from({ length: totalTiles }, (_, i) => i)
    for (let i = tileOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[tileOrder[i], tileOrder[j]] = [tileOrder[j], tileOrder[i]]
    }

    let currentIndex = 0
    revealedTilesRef.current = new Set()

    // Initial scrambled draw
    drawDecrypt(revealedTilesRef.current, totalTiles, tilesX, tilesY)

    const animate = () => {
      // Reveal more tiles
      const tilesToReveal = Math.min(REVEAL_SPEED, totalTiles - currentIndex)

      for (let i = 0; i < tilesToReveal; i++) {
        revealedTilesRef.current.add(tileOrder[currentIndex + i])
      }
      currentIndex += tilesToReveal

      drawDecrypt(revealedTilesRef.current, totalTiles, tilesX, tilesY)

      if (currentIndex < totalTiles) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsRevealed(true)
        // Draw final clean image
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext('2d')
          if (ctx && img) {
            ctx.clearRect(0, 0, containerWidth, containerHeight)
            ctx.drawImage(img, 0, 0, containerWidth, containerHeight)
          }
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isLoaded, isSvg, hasStarted, isRevealed, drawDecrypt])

  // For SVGs, just use regular Image
  if (isSvg) {
    return (
      <div ref={containerRef} className={className}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#111]" />
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'block' : 'hidden'} ${hasStarted ? 'opacity-100' : 'opacity-0'}`}
        role="img"
        aria-label={alt}
      />
    </div>
  )
}
