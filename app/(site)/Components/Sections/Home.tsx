import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'

export default async function Home() {
  const page = await getPage('home')

  console.log(page)
  return (
    <div className="px-5 min-h-screen flex justify-center flex-col items-center">
      <h1 className="text-5xl drop-shadow font-extrabold">
        {page.title}
      </h1>
      <div className="text-lg text-gray-200 drop-shadow mb-60">
        <PortableText value={page.section_content} />
      </div>
    </div>
  )
}
