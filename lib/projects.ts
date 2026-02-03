export interface SubProject {
  name: string
  description: string
  link?: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string[]
  links: { label: string; url: string }[]
  subProjects?: SubProject[]
  images?: string[] // Array of image URLs for the gallery
}

export interface Experiment {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
}

export interface ProjectImage {
  src: string
  label: string
  annotations?: string[]
}

export const projects: Project[] = [
  {
    id: 'schills',
    title: 'SCHILLS.APP',
    subtitle: '_AI SERVICES PLATFORM',
    description: [
      '_NEXT.JS, TYPESCRIPT, AI',
      '_REAL-TIME COLLABORATION',
      '_INTELLIGENT MATCHING',
    ],
    links: [
      { label: 'SCHILLS.APP', url: 'https://schills.app' },
    ],
    images: [
      '/images/projects/schills-1.svg',
      '/images/projects/schills-2.svg',
      '/images/projects/schills-3.svg',
      '/images/projects/schills-4.svg',
    ],
  },
  {
    id: 'y2k-dotcom',
    title: 'Y2K DOTCOM',
    subtitle: '_DIGITAL ECOSYSTEM',
    description: [
      '_E-COMMERCE, COMMUNITY, TOOLS',
      '_RETRO-FUTURISTIC DESIGN',
      '_FULL STACK DEVELOPMENT',
    ],
    links: [
      { label: 'Y2K.COM', url: 'https://y2k.com' },
    ],
    subProjects: [
      {
        name: 'Y2K.COM',
        description: 'E-COMMERCE PLATFORM FOR Y2K FASHION & CULTURE',
        link: 'https://y2k.com',
      },
      {
        name: 'MEME DATABASE',
        description: 'AI-POWERED MEME SEARCH & ARCHIVE',
        link: 'https://memedb.y2k.com',
      },
      {
        name: 'PORTFOLIO',
        description: 'DEVELOPER SHOWCASE & RESOURCES',
        link: 'https://portfolio.y2k.com',
      },
    ],
    images: [
      '/images/projects/y2k-1.svg',
      '/images/projects/y2k-2.svg',
      '/images/projects/y2k-3.svg',
      '/images/projects/y2k-4.svg',
    ],
  },
  {
    id: 'y2k-coded',
    title: 'Y2K CODED',
    subtitle: '_DEVELOPER TOOLS',
    description: [
      '_CODE SNIPPETS & TEMPLATES',
      '_DEVELOPER RESOURCES',
      '_OPEN SOURCE TOOLS',
    ],
    links: [
      { label: 'CODED.Y2K.COM', url: 'https://coded.y2k.com' },
    ],
    images: [
      '/images/projects/y2k-coded-1.svg',
      '/images/projects/y2k-coded-2.svg',
      '/images/projects/y2k-coded-3.svg',
    ],
  },
]

export const experiments: Experiment[] = [
  {
    id: 'exp-1',
    title: 'ASCII RENDERER',
    description: 'REAL-TIME ASCII ART FROM WEBCAM FEED',
    tags: ['WEBGL', 'CANVAS', 'EXPERIMENTAL'],
  },
  {
    id: 'exp-2',
    title: 'TERMINAL UI',
    description: 'RETRO COMMAND LINE INTERFACE COMPONENTS',
    tags: ['REACT', 'TYPESCRIPT', 'UI'],
  },
  {
    id: 'exp-3',
    title: 'AI CHAT INTERFACE',
    description: 'MINIMALIST CONVERSATIONAL UI PATTERNS',
    tags: ['AI', 'UX', 'PROTOTYPE'],
  },
  {
    id: 'exp-4',
    title: 'PIXEL SHADER',
    description: 'CUSTOM GLSL DITHERING EFFECTS',
    tags: ['GLSL', 'THREE.JS', 'VISUAL'],
  },
]
