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
  images?: ProjectImage[] // Array of image data for the gallery
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
  width: number
  height: number
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
      { src: '/images/projects/shillz-landing.png', width: 1706, height: 1401 },
      { src: '/images/projects/shillz-dashboard.png', width: 1700, height: 1398 },
      { src: '/images/projects/shillz-project.png', width: 1712, height: 1394 },
      { src: '/images/projects/shillz-analytics.png', width: 1694, height: 1388 },
      { src: '/images/projects/shillz-profile.png', width: 1704, height: 1399 },
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
      { src: '/images/projects/y2k-main.png', width: 1709, height: 1403 },
      { src: '/images/projects/y2k-meme-machine.png', width: 1701, height: 1397 },
      { src: '/images/projects/y2k-portfolio.png', width: 1697, height: 1395 },
      { src: '/images/projects/y2k-database.png', width: 1702, height: 1395 },
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
      { src: '/images/projects/y2k-coded-main.png', width: 1693, height: 1389 },
      { src: '/images/projects/y2k-coded-archive.png', width: 1707, height: 1394 },
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
