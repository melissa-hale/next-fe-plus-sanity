import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'

type Props = {
    slug: string ,
    children?: React.ReactNode
  }  

export default async function Header({ slug, children }: Props) {
  const page = await getPage(slug)

  return (
    <div key={page._id} className='max-w-3xl mx-auto min-h-screen p-8 bg-amber-100 bg-opacity-70'>
      <h1 className="bg-gradient-to-r from-sky-700 to-blue-500 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
        {page.title}
      </h1>
      <div className="text-lg text-gray-700 mt-7 mb-7">
        <PortableText value={page.content} />
      </div>
      {children}
    </div>
  )
}
