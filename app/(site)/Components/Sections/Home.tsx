import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'

export default async function Home() {
  const page = await getPage('home')

  return (
    <div className='min-h-screen p-8 bg-section-bg bg-cover bg-center bg-fixed'>
      <h1 className="bg-gradient-to-r from-sky-700 to-blue-500 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
        {page.title}
      </h1>
      <div className="text-lg text-gray-700 mt-7 mb-7">
        <PortableText value={page.content} />
      </div>
    </div>
  )
}
