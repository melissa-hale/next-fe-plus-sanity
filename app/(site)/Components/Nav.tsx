'use client'

import { useState } from 'react'
import Image from 'next/image'
import logo from '../../../public/logo.png'

const pages = [
  { slug: 'Contact', id: 1 },
  { slug: 'About', id: 2 },
  { slug: 'Gallery', id: 3 },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="top-0 z-20 w-full bg-site-bg-image">
      <nav className="bg-cream bg-opacity-90 border-4 border-double border-b-amber-400 px-4 py-2 flex items-center justify-between flex-wrap">
        {/* Brand and the CTA/hamburger group both take `md:flex-1`, so the nav menu
            between them stays centered on the row no matter how wide either side is.
            Without it the wordmark pushed the links off-center. */}
        <a
          href="/"
          aria-label="Wallcoverings By Don Dye home page"
          className="flex shrink-0 items-center gap-3 md:flex-1"
        >
          <Image alt="Wallcoverings By Don Dye logo" height={80} src={logo} width={80} />
          {/* Wordmark. Same serif + green-900 as every <h1> on the site, so the nav
              reads as part of the same type system. Below 1200px the row also has to
              hold the CTA and hamburger, so the logo carries the brand alone. */}
          <span className="hidden whitespace-nowrap font-headers text-xl font-extrabold tracking-[0.015em] text-green-900 min-[1200px]:inline">
            Wallcoverings by Don Dye
          </span>
        </a>

        <div className="flex items-center gap-2 md:order-2 md:flex-1 md:justify-end">
          <a href="/contact">
            <button
              type="button"
              className="text-amber-200 bg-green-900 px-6 py-3  shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:text-amber-100 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium rounded-md text-sm  text-center min-h-[44px]"
            >
              Contact Don
            </button>
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(o => !o)}
            aria-controls="main-nav-menu"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center justify-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 min-h-[44px] min-w-[44px]"
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        <div
          id="main-nav-menu"
          className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row md:gap-6 mt-2 md:mt-0 font-medium">
            <li>
              <a href="/" className="py-2 text-gray-700 hover:text-green-700 min-h-[44px] flex items-center">
                Home
              </a>
            </li>
            {pages.map((page) => (
              <li key={page.id}>
                <a
                  href={`/${page.slug.toLowerCase()}`}
                  className="py-2 text-gray-700 hover:text-green-700 min-h-[44px] flex items-center"
                >
                  {page.slug}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
