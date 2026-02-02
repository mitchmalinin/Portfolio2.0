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
}

export interface Experiment {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
}

export const projects: Project[] = [
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
  },
  {
    id: 'shillz',
    title: 'SHILLZ.APP',
    subtitle: '_AI SERVICES PLATFORM',
    description: [
      '_NEXT.JS, TYPESCRIPT, AI',
      '_REAL-TIME COLLABORATION',
      '_INTELLIGENT MATCHING',
    ],
    links: [
      { label: 'SHILLZ.APP', url: 'https://shillz.app' },
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
