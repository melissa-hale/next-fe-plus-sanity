import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import { Ibarra_Real_Nova } from '@next/font/google'

const headerFont = Ibarra_Real_Nova({
  subsets: ['latin'],
  variable: '--font-dancing'
})

export default async function Home() {
  const page = await getPage('home')

  const serializer = {
    types: {
      block: ({ value }: any) => {
        if (value.children.length === 1 && value.children[0].text === '') {
          return
        }
        return <p className="pb-1">&#x2713;   {value.children[0].text}</p>
      },
    },
  }

  return (
    <section className="mx-auto max-w-5xl px-6 min-h-screen flex justify-center items-center flex-col">
      <div className="text-xl text-green-900 mb-60 p-8 bg-gray-200 bg-opacity-60 rounded-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <h1 className={`${headerFont.variable} font-headers text-5xl drop-shadow pb-3 font-extrabold`}>{page.title}</h1>
        <div className='text-base font-medium drop-shadow-md text-gray-700 pl-1'>
          <PortableText value={page.section_content} components={serializer}/>
        </div>
        <a href="/contact" className="inline-block mt-3">
          <button
            type="button"
            className="text-gray-700 bg-amber-300 hover:bg-green-700 hover:text-gray-200 focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-4 py-2 text-center mt-3 mr-3 md:mr-0"
          >
            Get in touch!
          </button>
        </a>
      </div>
    </section>
  )
}