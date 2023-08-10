import { getPage } from '@/sanity/sanity-utils'
import Gallery from './Components/Sections/Gallery'
import About from './Components/Sections/About'
import { PortableText } from '@portabletext/react'

export default async function Home() {

  const page = await getPage('home')

  return (
    <div >
      <div className='min-h-screen'>
        <h1 className="text-7xl font-extrabold">
          <span className="bg-gradient-to-r from-sky-700 to-blue-500 drop-shadow font-extrabold bg-clip-text text-transparent">
            {page.title}
          </span>
        </h1>
        <PortableText value={page.section_content} />
      </div>

      <About />
      <Gallery />
      

    </div>
  )
}
