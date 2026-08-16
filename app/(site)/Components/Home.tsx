// app/(site)/Components/Home.tsx
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
          return null
        }
        return (
          <li className="pb-1">
            <span className="mr-3">&#x2713;</span>
            {value.children[0].text}
          </li>
        )
      },
    },
  }

  return (
    <section 
      className="mx-auto max-w-5xl px-6 min-h-screen flex justify-center items-center flex-col"
      aria-label="Welcome to Wallcoverings By Don Dye"
    >
      <article className="text-xl text-green-900 mb-60 p-8 bg-gray-200 bg-opacity-85 rounded-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        {/* IMPROVED HEADER STRUCTURE */}
        <header className="mb-6">
          <h1 className={`${headerFont.variable} font-headers text-5xl drop-shadow pb-3 font-extrabold`}>
            {page.title}
          </h1>
          {/* ADD HIDDEN H2 FOR BETTER SEO STRUCTURE */}
          <h2 className="sr-only">
            Professional Wallpaper Installation Services in Austin and Central Texas
          </h2>
        </header>
        
        {/* IMPROVED CONTENT SECTION */}
        <ul className='text-base font-medium drop-shadow-md text-gray-700 pl-1 list-none'>
          <PortableText value={page.section_content} components={serializer}/>
        </ul>
        
        {/* ENHANCED CALL-TO-ACTION */}
        <footer className="mt-8 text-center">
          <a href="/contact" className="inline-block">
            <button
              type="button"
              className="text-gray-700 bg-amber-300 hover:bg-green-700 hover:text-gray-200 focus:ring-4 focus:ring-green-300 focus:outline-none font-medium rounded-md text-lg px-6 py-3 text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 min-h-[44px]"
            >
              Get Your Free Estimate Today!
            </button>
          </a>
          
          {/* ADD SECONDARY ACTION */}
          {/* <div className="mt-4">
            <a 
              href="tel:(832)788-3667"
              className="text-green-800 hover:text-green-600 font-medium text-lg transition-colors duration-300"
              aria-label="Call Don Dye at (832) 788-3667 for immediate assistance"
            >
              📞 Call Now: (832) 788-3667
            </a>
          </div> */}
          
          {/* ADD LOCAL SEO TEXT */}
          <div className="mt-8 text-sm text-gray-600 max-w-2xl mx-auto">
            <p>
              Serving <strong>Austin, Round Rock, Cedar Park, Leander, Georgetown, Pflugerville, 
              and all of Central Texas</strong> with professional wallpaper installation services.
            </p>
          </div>
        </footer>
      </article>
    </section>
  )
}