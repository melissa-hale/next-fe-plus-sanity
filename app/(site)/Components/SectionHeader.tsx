import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'

type Props = {
  slug: string
  children?: React.ReactNode
}

export default async function SectionHeader({ slug, children }: Props) {
  const page = await getPage(slug)

  return (
    <div
      key={page._id}
      className="max-w-3xl mx-auto min-h-screen bg-section-bg"
    >
      {/* <div key={page._id} className='max-w-3xl mx-auto min-h-screen border-8 border-double border-amber-400 p-8 bg-amber-100 bg-opacity-70'> */}
      <div className='bg-gray-300 bg-opacity-40'>
        <div className=" p-6">
          <h1 className=" text-green-900 text-5xl drop-shadow font-extrabold">
            {page.title}
          </h1>
          <div className="text-lg drop-shadow-md text-gray-800 mt-7 mb-7">
            <PortableText value={page.content} />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
