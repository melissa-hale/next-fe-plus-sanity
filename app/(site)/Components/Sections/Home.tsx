import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'

export default async function Home() {
  const page = await getPage('home')

  console.log(page)
  return (
    <div className="p-5 min-h-screen grid place-items-center">
      <div id="hero-background"></div>
        <h1 className="text-5xl drop-shadow font-extrabold">
          {page.title}
        </h1>
      
      <div className="text-lg text-gray-200 drop-shadow">
        <PortableText value={page.section_content} />
      </div>
    </div>
  )
}
