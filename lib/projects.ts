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
    id: 'shillz',
    title: 'SHILLZ.APP',
    subtitle: '_TOKEN-BASED COMMUNITY REWARDS',
    description: [
      '_REAL-TIME ENGAGEMENT ANALYTICS',
      '_ON-CHAIN REWARD DISTRIBUTION',
      '_COMPLEX METRIC ALGORITHMS',
    ],
    links: [
      { label: 'SHILLZ.APP', url: 'https://www.shillz.app' },
    ],
    images: [
      '/images/projects/shillz-landing.png',
      '/images/projects/shillz-dashboard.png',
      '/images/projects/shillz-project.png',
      '/images/projects/shillz-analytics.png',
      '/images/projects/shillz-profile.png',
    ],
  },
  {
    id: 'y2k-dotcom',
    title: 'Y2K DOTCOM',
    subtitle: '_CULTURE COIN // NOSTALGIA PROTOCOL',
    description: [
      '_4,000+ ON-CHAIN HOLDERS',
      '_COMMUNITY-DRIVEN MEMETICS',
      '_1 YEAR STRONG',
    ],
    links: [
      { label: 'Y2KDOTCOM.XYZ', url: 'https://y2kdotcom.xyz' },
    ],
    subProjects: [
      {
        name: 'MEME MACHINE',
        description: 'AI-POWERED MEME GENERATOR',
        link: 'https://y2kdotcom.xyz/meme-machine',
      },
      {
        name: 'PORTFOLIO',
        description: 'TOKEN HOLDER DASHBOARD',
        link: 'https://y2kdotcom.xyz/portfolio',
      },
      {
        name: 'MEME DATABASE',
        description: 'SEARCHABLE MEME ARCHIVE',
        link: 'https://y2kdotcom.xyz/meme-database',
      },
    ],
    images: [
      '/images/projects/y2k-main.png',
      '/images/projects/y2k-meme-machine.png',
      '/images/projects/y2k-portfolio.png',
      '/images/projects/y2k-database.png',
    ],
  },
  {
    id: 'y2k-coded',
    title: 'Y2K CODED',
    subtitle: '_PHYSICAL DROPS // DIGITAL CULTURE',
    description: [
      '_LIMITED EDITION POSTERS',
      '_NOSTALGIA ARTIFACTS',
      '_BRIDGING DIGITAL & PHYSICAL',
    ],
    links: [
      { label: 'Y2KCODED.COM', url: 'https://y2kcoded.com' },
    ],
    images: [
      '/images/projects/y2k-coded-main.png',
      '/images/projects/y2k-coded-archive.png',
    ],
  },
]

export const experiments: Experiment[] = [
  {
    id: 'meme-receipts',
    title: 'MEME RECEIPTS',
    description: 'TURN YOUR TRADES INTO SHAREABLE RECEIPTS',
    tags: ['CRYPTO', 'MEMES', 'VIBES'],
    link: 'https://meme-receipts.com',
  },
  {
    id: 'coming-soon-1',
    title: 'MORE COMING',
    description: 'NEW EXPERIMENTS LOADING...',
    tags: ['SOON', 'TBD'],
  },
]
