'use client'

import { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  isReversed?: boolean
}

export default function ProjectCard({ project, isReversed = false }: ProjectCardProps) {
  return (
    <div className="relative">
      {/* Cross at top center */}
      <span className="cross cross-center cross-top">+</span>

      <div className="h-line" />

      <div className={`grid md:grid-cols-2 min-h-[400px] md:min-h-[500px]`}>
        {/* Project Info Side */}
        <div
          className={`relative p-8 md:p-12 lg:p-16 flex flex-col justify-center ${
            isReversed ? 'md:order-2' : ''
          }`}
        >
          {/* Vertical divider */}
          <div
            className={`hidden md:block absolute top-0 bottom-0 ${
              isReversed ? 'left-0' : 'right-0'
            } v-line`}
          />

          <h3 className="text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide mb-3">
            {project.title}
          </h3>

          <p className="text-[#666666] uppercase text-base mb-8">{project.subtitle}</p>

          <div className="space-y-1 text-[#888888] uppercase text-base mb-10">
            {project.description.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bracket-link uppercase text-base"
              >
                [{link.label}]
              </a>
            ))}
          </div>
        </div>

        {/* Visual Side / Sub-projects */}
        <div
          className={`relative flex items-center justify-center p-8 ${
            isReversed ? 'md:order-1' : ''
          }`}
        >
          {project.subProjects ? (
            /* Sub-projects list */
            <div className="w-full max-w-md space-y-6">
              {project.subProjects.map((sub, index) => (
                <div
                  key={sub.name}
                  className="group border border-dashed border-[#333333] p-6 hover:border-[#555555] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[#666666] text-xs mb-1">_{String(index + 1).padStart(2, '0')}</p>
                      <h4 className="text-lg uppercase mb-2 group-hover:text-white transition-colors">
                        {sub.name}
                      </h4>
                      <p className="text-[#555555] text-sm uppercase">{sub.description}</p>
                    </div>
                    {sub.link && (
                      <a
                        href={sub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#444444] hover:text-white transition-colors text-lg"
                      >
                        ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Placeholder visual for projects without sub-projects */
            <>
              {/* Corner brackets */}
              <div className="absolute inset-8 md:inset-12">
                <div className="relative w-full h-full">
                  <span className="corner-tl" />
                  <span className="corner-tr" />
                  <span className="corner-bl" />
                  <span className="corner-br" />
                </div>
              </div>

              {/* Placeholder visual */}
              <div className="text-[#1a1a1a] text-8xl md:text-9xl">◇</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
