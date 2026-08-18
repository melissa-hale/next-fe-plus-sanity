import type { Metadata } from 'next'
import { getFeaturedProjects } from '@/sanity/sanity-utils'
import About from './Components/About'
import ClosingCTA from './Components/ClosingCTA'
import FAQ from './Components/FAQ'
import Gallery from './Components/Gallery'
import Home from './Components/Home'
import ProcessSteps from './Components/ProcessSteps'

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
      {/* The steps sit after About: read who he is, then how the job goes. */}
      <ProcessSteps />
      {/* Late on purpose: these are objection-handling questions, so they
          belong after the work and the pitch, not before — and directly above
          the ask they clear the way for. */}
      <FAQ />
      {/* Tinted, unlike the /service-area copy of this block: the FAQ above it
          is untinted, so the band is what separates the two. */}
      <ClosingCTA tint />
    </>
  )
}
