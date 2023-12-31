import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import { Ibarra_Real_Nova } from '@next/font/google'

const headerFont = Ibarra_Real_Nova({
  subsets: ['latin'],
  variable: '--font-dancing'
})

export default async function About() {
  const page = await getPage('about')

  const serializer = {
    types: {
      block: ({ value }: any) => {
        if (value.children.length === 1 && value.children[0].text === '') {
          return <br />
        }
        return <p>{value.children[0].text}</p>
      },
    },
  }

  return (
    <section
      key={page._id}
      className="max-w-3xl p-6 mx-auto min-h-full bg-amber-100 bg-opacity-80"
    >
      <div className="p-6">
        <h1 className={`${headerFont.variable} font-headers text-green-900 text-4xl drop-shadow font-extrabold`}>
          About Don Dye
        </h1>
        <div className="text-lg drop-shadow-md text-gray-800 mt-7 mb-7">
          <PortableText value={page.section_content} components={serializer} />
        </div>
        <div className="flex justify-center">
          <a href="/about">
            <button
              type="button"
              className="text-gray-700 bg-amber-300 hover:bg-green-700 hover:text-gray-200 focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-4 py-2 text-center mt-3 mr-3 md:mr-0"
            >
              Read More
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
