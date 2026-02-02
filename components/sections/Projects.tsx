'use client'

import { projects } from '@/lib/projects'
import ProjectCard from '@/components/ui/ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="relative">
      {/* Section header */}
      <div className="section-padding pb-0">
        <p className="text-[#444444] text-sm uppercase tracking-widest mb-4">
          [SELECTED WORK]
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide">
          PROJECTS
        </h2>
      </div>

      {/* Vertical center line for desktop */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 v-line" />

      {/* Project cards */}
      <div className="mt-16 md:mt-24">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>

      {/* Bottom border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>
    </section>
  )
}
