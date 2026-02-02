import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        border: '#333333',
        muted: {
          DEFAULT: '#222222',
          foreground: '#666666',
        },
      },
      fontFamily: {
        mono: ['Departure Mono', 'monospace'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
