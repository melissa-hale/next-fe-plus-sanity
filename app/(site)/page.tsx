import { getProjects } from '@/sanity/sanity-utils'
import Gallery from './Components/Sections/Gallery'
import About from './Components/Sections/About'
import Home from './Components/Sections/Home'

export default async function Landing() {
  const projects = await getProjects()

  return (
    <div>
      <Home />
      <Gallery projects={projects} />
      <About />
    </div>
  )
}
