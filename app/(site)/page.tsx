import dynamic from 'next/dynamic'
import { getProjects } from '@/sanity/sanity-utils'
import About from './Components/About'
import Home from './Components/Home'
import { FAQSchema } from './Components/FAQSchema'

const Gallery = dynamic(() => import('./Components/Gallery'), {
  ssr: false,
  loading: () => <div className="max-w-3xl mx-auto h-128 p-3" />,
})
// import Process from './Components/Process'

export default async function Landing() {
  const projects = await getProjects()

  return (
    <div>
      <FAQSchema />
      <Home />
      <Gallery projects={projects} />
      <About />
      {/* <Process /> */}
    </div>
  )
}
