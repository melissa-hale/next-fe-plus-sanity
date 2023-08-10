import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'

type Props = {
    slug: string 
  }  

export default async function SectionHeader({ slug }: Props) {
  const page = await getPage(slug)

  return (
    <div key={page._id}>
      <h1 className="bg-gradient-to-r from-sky-700 to-blue-500 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
        {page.title}
      </h1>
      <div className="text-lg text-gray-700 mt-7 mb-7">
        <PortableText value={page.content} />
      </div>
    </div>
  )
}
