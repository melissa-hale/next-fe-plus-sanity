import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'

export default async function Home() {
  const page = await getPage('home')

  console.log(page)
  return (
    <div className="p-5 min-h-screen bg-section-bg bg-cover bg-center bg-fixed grid place-items-center h-screen">
      <div>
        <h1 className=" bg-amber-100 bg-opacity-70 bg-gradient-to-r from-sky-700 to-blue-500 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
          {page.title}
        </h1>
        <div className="text-lg text-gray-200 mt-7 mb-7 drop-shadow-md">
          <PortableText value={page.section_content} />
        </div>
      </div>
    </div>
  )
}
