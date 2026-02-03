'use client'

import { useRef } from 'react'
import DecryptedText from '@/components/DecryptedText'
import { useInView } from '@/hooks/useInView'

// Placeholder articles - can be connected to Twitter/X API later
const articles = [
  {
    id: '1',
    title: 'WHY AI-FIRST DEVELOPMENT IS THE FUTURE',
    excerpt: 'EXPLORING HOW TOOLS LIKE CLAUDE AND CURSOR ARE CHANGING THE WAY WE BUILD SOFTWARE...',
    date: '2024.01.15',
    platform: 'X',
    url: '#',
  },
  {
    id: '2',
    title: 'BUILDING FASTER WITH VIBE-DRIVEN DEVELOPMENT',
    excerpt: 'THE ART OF TRUSTING YOUR INSTINCTS AND LETTING AI HANDLE THE IMPLEMENTATION...',
    date: '2024.01.10',
    platform: 'X',
    url: '#',
  },
  {
    id: '3',
    title: 'THE TERMINAL AESTHETIC IN MODERN WEB DESIGN',
    excerpt: 'WHY MONOSPACE FONTS AND DASHED BORDERS ARE MAKING A COMEBACK...',
    date: '2024.01.05',
    platform: 'X',
    url: '#',
  },
]

export default function Articles() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section id="articles" className="relative" ref={sectionRef}>
      {/* Top border provided by Projects section */}

      <div className="section-padding">
        <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          [WRITING]
        </p>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-4 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {isInView ? (
            <DecryptedText
              text="ARTICLES"
              speed={60}
              maxIterations={20}
              sequential={true}
              revealDirection="start"
              animateOn="view"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              className="text-white"
              encryptedClassName="text-[#333333]"
            />
          ) : (
            'ARTICLES'
          )}
        </h2>
        <p className={`text-[#666666] text-base uppercase mb-16 max-w-xl transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          _THOUGHTS ON CRYPTO, AI, AND CULTURE
        </p>

        {/* Articles list */}
        <div className={`space-y-px bg-[#222222] transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {articles.map((article, index) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-black border border-dashed border-[#333333] p-6 md:p-8 hover:border-[#555555] transition-colors group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[#333333] text-xs">
                      _{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[#444444] text-xs uppercase">
                      {article.date}
                    </span>
                    <span className="text-[#444444] text-xs border border-[#333333] px-2 py-0.5">
                      {article.platform}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl uppercase mb-3 group-hover:text-[#BEFE00] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#555555] text-sm uppercase max-w-2xl">
                    {article.excerpt}
                  </p>
                </div>
                <div className="text-[#444444] group-hover:text-[#BEFE00] transition-colors text-lg md:text-xl">
                  ↗
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View all link */}
        <div className={`mt-8 text-center transition-all duration-700 delay-[400ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a
            href="https://x.com/mitchmalinin"
            target="_blank"
            rel="noopener noreferrer"
            className="bracket-link text-base uppercase"
          >
            [VIEW ALL ON X]
          </a>
        </div>
      </div>
    </section>
  )
}
