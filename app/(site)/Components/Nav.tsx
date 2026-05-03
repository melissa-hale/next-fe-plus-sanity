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
    <header className="sticky top-0 z-20 w-full bg-site-bg-image">
      <nav className="bg-white bg-opacity-80 border-4 border-double border-b-amber-400 px-4 py-2 flex items-center justify-between flex-wrap">
        <a href="/" aria-label="Wallcoverings By Don Dye home page">
          <Image alt="Wallcoverings By Don Dye logo" height={80} src={logo} width={80} />
        </a>

        <div className="flex items-center gap-2 md:order-2">
          <a href="/contact">
            <button
              type="button"
              className="text-gray-600 bg-amber-300 hover:bg-green-700 hover:text-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-3 text-center min-h-[44px]"
            >
              Contact Us
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
