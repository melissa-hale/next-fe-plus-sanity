import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from 'sanity'

type Props = {
  content: PortableTextBlock[]
}

export default async function About({ content }: Props) {
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
    <>
      {/* The page goes <h1> (PageHero) straight to the footer's <h3>s, which
          fails the sequential-heading rule. Same fix the gallery grid already
          carries. */}
      <h2 className="sr-only">About Don Dye</h2>
      <div className="text-lg leading-relaxed text-gray-800">
        <PortableText value={content} components={serializer} />
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="/contact"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-green-900 px-6 py-3 text-amber-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:text-amber-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
        >
          Get in touch today!
        </a>
      </div>
    </>
  )
}
