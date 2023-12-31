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
        return <p>{value.children[0].text}</p>
      },
    },
  }

  return (
    <div className="min-h-screen">
      <div className="text-lg text-gray-700 mt-7 mb-7">
        <PortableText value={content} components={serializer} />
      </div>
      <div className="flex justify-center">
          <a href="/contact">
            <button
              type="button"
              className="text-gray-700 bg-amber-300 hover:bg-green-700 hover:text-gray-200 focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-4 py-2 text-center mt-3 mr-3 md:mr-0"
            >
              Get in Touch Today!
            </button>
          </a>
        </div>
    </div>
  )
}
