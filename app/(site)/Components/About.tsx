import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import Section from './Section'

export default async function About() {
  const page = await getPage('about')

  const serializer = {
    types: {
      block: ({ value }: any) => {
        if (value.children.length === 1 && value.children[0].text === '') {
          return <br />
        }
        return <p className="mb-4">{value.children[0].text}</p>
      },
    },
  }

  return (
    <Section width="narrow">
      <h2 className="font-headers text-3xl font-extrabold text-green-900 md:text-4xl">
        About Don Dye
      </h2>

      <div className="mt-6 text-lg leading-relaxed text-gray-800">
        <PortableText value={page.section_content} components={serializer} />
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="/about"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-green-900 px-6 py-3 font-medium text-amber-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:text-amber-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
        >
          Learn more about Don Dye
        </a>
      </div>
    </Section>
  )
}
