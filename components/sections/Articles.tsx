'use client'

import { useRef } from 'react'
import DecryptedText from '@/components/DecryptedText'
import { useInView } from '@/hooks/useInView'

const articles = [
  {
    id: 'cultonomics',
    title: 'CULTONOMICS 101',
    url: 'https://x.com/0xMrWzrd/status/1879370191622066223',
    icon: (
      <svg viewBox="0 0 16 16" className="h-10 w-10 text-[#BEFE00]" aria-hidden="true">
        <rect width="16" height="16" fill="none" />
        <rect x="2" y="3" width="12" height="2" fill="currentColor" />
        <rect x="2" y="6" width="8" height="2" fill="currentColor" />
        <rect x="2" y="9" width="10" height="2" fill="currentColor" />
        <rect x="2" y="12" width="6" height="2" fill="currentColor" />
        <rect x="12" y="6" width="2" height="6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'nostalgia-thesis',
    title: 'THE NOSTALGIA THESIS',
    url: 'https://x.com/0xMrWzrd/status/1975916495541563439',
    icon: (
      <svg viewBox="0 0 16 16" className="h-10 w-10 text-[#BEFE00]" aria-hidden="true">
        <rect x="2" y="3" width="12" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="4" y="5" width="8" height="2" fill="currentColor" />
        <rect x="4" y="9" width="2" height="2" fill="currentColor" />
        <rect x="7" y="9" width="2" height="2" fill="currentColor" />
        <rect x="10" y="9" width="2" height="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'pump-fun-revival',
    title: 'HOW PUMP FUN CAN LEAD THE REVIVAL OF MEME COINS',
    url: 'https://x.com/0xMrWzrd/status/1972347027670622663',
    icon: (
      <svg viewBox="0 0 16 16" className="h-10 w-10 text-[#BEFE00]" aria-hidden="true">
        <rect x="7" y="2" width="2" height="7" fill="currentColor" />
        <rect x="6" y="4" width="4" height="4" fill="currentColor" />
        <rect x="5" y="6" width="6" height="2" fill="currentColor" />
        <rect x="6" y="9" width="4" height="3" fill="currentColor" />
        <rect x="4" y="12" width="8" height="2" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Articles() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section id="articles" className="relative scroll-mt-[55px] md:scroll-mt-0" ref={sectionRef}>
      <div className="section-padding">
        <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          [WRITING]
        </p>
        <h2 className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-4 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
        <div className={`space-y-4 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {articles.map((article, index) => (
            <div
              key={article.id}
              role="link"
              tabIndex={0}
              onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  window.open(article.url, '_blank', 'noopener,noreferrer')
                }
              }}
              className="relative block bg-black border border-dashed border-[#333333] p-6 md:p-8 hover:border-[#555555] transition-colors group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex gap-5">
                  <div className="shrink-0 h-14 w-14 border border-dashed border-[#333333] bg-black/60 flex items-center justify-center">
                    {article.icon}
                  </div>
                  <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[#333333] text-xs">
                      _{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[#444444] text-xs border border-[#333333] px-2 py-0.5">
                      X
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl uppercase mb-3 group-hover:text-[#BEFE00] transition-colors">
                    {article.title}
                  </h3>
                  </div>
                </div>
              </div>
              <div className="absolute right-6 top-6 text-[#444444] group-hover:text-[#BEFE00] transition-colors text-lg md:text-xl">
                ↗
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className={`mt-8 text-center transition-all duration-700 delay-[400ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a
            href="https://x.com/0xMrWzrd/articles"
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
