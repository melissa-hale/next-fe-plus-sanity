import { getProjects } from '@/sanity/sanity-utils'
import Gallery from './Components/Gallery'
import About from './Components/About'
import Home from './Components/Home'
import Process from './Components/Process'

export default async function Landing() {
  const projects = await getProjects()

  return (
    <div>
      <Home />
      <Gallery projects={projects} />
      <About />
      <Process />
    </div>
  )
}
