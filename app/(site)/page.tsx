import type { Metadata } from 'next'
import { getFeaturedProjects } from '@/sanity/sanity-utils'
import About from './Components/About'
import FAQ from './Components/FAQ'
import Gallery from './Components/Gallery'
import Home from './Components/Home'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Landing() {
  // Which projects appear here is controlled in the Studio — see getFeaturedProjects.
  const projects = await getFeaturedProjects(6)

  return (
    <>
      <Home />
      <Gallery projects={projects} />
      <About />
      {/* Last block before the footer on purpose: these are objection-handling
          questions, so they belong after the work and the pitch, not before. */}
      <FAQ />
    </>
  )
}
