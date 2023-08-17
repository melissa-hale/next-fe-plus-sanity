import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'

export default async function About() {

  const page = await getPage('about');

  console.log(page.content)
  
    return (
      <div
      key={page._id}
      className="max-w-3xl px-6 mx-auto min-h-screen  bg-amber-100 bg-opacity-80"
    >
      {/* <div key={page._id} className='max-w-3xl mx-auto min-h-screen border-8 border-double border-amber-400 p-8 bg-amber-100 bg-opacity-70'> */}
      <div className='p-6'>
          <h1 className=" text-green-900 text-5xl drop-shadow font-extrabold">
            {page.title}
          </h1>
          <div className="text-lg drop-shadow-md text-gray-800 mt-7 mb-7">
            <PortableText value={page.content} />
          </div>
      </div>
    </div>
    )
  }