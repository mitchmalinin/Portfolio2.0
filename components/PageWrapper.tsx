'use client'

import { useState, createContext, useContext } from 'react'
import Navigation from '@/components/ui/Navigation'
import LoadingScreen from '@/components/ui/LoadingScreen'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Articles from '@/components/sections/Articles'
import Experiments from '@/components/sections/Experiments'
import Contact from '@/components/sections/Contact'

// Context to share loading state across components
export const LoadedContext = createContext(false)
export const useIsLoaded = () => useContext(LoadedContext)

export default function PageWrapper() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <LoadedContext.Provider value={isLoaded}>
      <LoadingScreen onLoadComplete={() => setIsLoaded(true)} />
      <main className="relative">
        <Hero />
        <Skills />
        <About />
        <Projects />
        <Articles />
        <Experiments />
        <Contact />
        <Navigation />
      </main>
    </LoadedContext.Provider>
  )
}
