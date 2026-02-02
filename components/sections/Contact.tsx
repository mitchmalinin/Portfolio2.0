'use client'

const contactLinks = [
  { label: 'EMAIL', value: 'MITCHMALININ@GMAIL.COM', href: 'mailto:mitchmalinin@gmail.com' },
  { label: 'GITHUB', value: 'GITHUB.COM/MITCHMALININ', href: 'https://github.com/mitchmalinin' },
  { label: 'LINKEDIN', value: 'LINKEDIN.COM/IN/MITCHMALININ', href: 'https://www.linkedin.com/in/mitchmalinin/' },
  { label: 'X', value: '@0XMRWZRD', href: 'https://twitter.com/0xmrwzrd' },
]

export default function Contact() {
  return (
    <footer id="contact" className="relative">
      {/* Top border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      <div className="section-padding">
        <div className="max-w-4xl">
          <p className="text-[#444444] text-sm uppercase tracking-widest mb-4">
            [CONTACT]
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-4">
            LET&apos;S CONNECT
          </h2>
          <p className="text-[#666666] text-lg uppercase mb-16">
            _OPEN FOR COLLABORATIONS AND NEW PROJECTS
          </p>

          {/* Contact links */}
          <div className="space-y-6">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="block group"
              >
                <span className="text-[#444444] text-sm uppercase tracking-widest">
                  _{link.label}
                </span>
                <p className="text-xl md:text-2xl uppercase mt-1 group-hover:text-[#888888] transition-colors">
                  {link.value}
                </p>
              </a>
            ))}
          </div>

          {/* Resume */}
          <div className="mt-16 pt-16 border-t border-dashed border-[#222222]">
            <a
              href="/Mitchell Malinin.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bracket-link text-lg uppercase"
            >
              [DOWNLOAD RESUME]
            </a>
          </div>
        </div>

        {/* Footer credit */}
        <div className="mt-32 pt-8 border-t border-dashed border-[#222222]">
          <p className="text-[#333333] text-sm uppercase tracking-widest">
            &copy; {new Date().getFullYear()} MITCH MALININ
          </p>
          <p className="text-[#222222] text-sm uppercase tracking-widest mt-2">
            _DESIGNED BY MR. WIZARD
          </p>
        </div>
      </div>
    </footer>
  )
}
