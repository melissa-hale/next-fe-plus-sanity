'use client'

import { getPages } from '@/sanity/sanity-utils'
import Link from 'next/link'
import Image from 'next/image'

import logo from '../../../../public/logo.jpeg'

import { DarkThemeToggle, Navbar } from 'flowbite-react'

export default function Header() {
  const pages = ['Contact', 'About', 'Gallery']

  return (
    <header className="sticky top-0 z-20 w-full">
      <Navbar className='bg-neutral-100'>
        <Navbar.Brand href="/">
          <Image alt="Flowbite logo" height="154" src={logo} width="154" />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Navbar.Toggle />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-3 md:mr-0"
          >
            Get a Quote!
          </button>
        </div>
        <Navbar.Collapse>
          {pages.map((page) => (
            <Navbar.Link href={`/${page.toLowerCase()}`}>{page}</Navbar.Link>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
