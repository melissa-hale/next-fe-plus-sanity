import { getPage } from '@/sanity/sanity-utils'
import Gallery from './Components/Sections/Gallery'
import About from './Components/Sections/About'
import { PortableText } from '@portabletext/react'
import Home from './Components/Sections/Home'

export default async function Landing() {

  // const page = await getPage('home')

  return (
    <div >
      <Home />
      <About />
      <Gallery />
      

    </div>
  )
}
