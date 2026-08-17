import type { Metadata } from 'next'
import { getFeaturedProjects } from '@/sanity/sanity-utils'
import About from './Components/About'
import Gallery from './Components/Gallery'
import Home from './Components/Home'
import { FAQSchema } from './Components/FAQSchema'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Landing() {
  // Which projects appear here is controlled in the Studio — see getFeaturedProjects.
  const projects = await getFeaturedProjects(6)

  return (
    <>
      <FAQSchema />
      <Home />
      <Gallery projects={projects} />
      <About />
    </>
  )
}
