import { getPages } from '@/sanity/sanity-utils'
import '../globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import logo from '../../public/logo.jpeg'

export const metadata: Metadata = {
  title: 'Wall Coverings By Don Dye',
  description: 'Professional Wallpaper Installation Specialist, Don Dye',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pages = await getPages()

  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto py-10">
        <header className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-lg font-bold font-serif">
              {/* Wall Coverings By Don Dye */}
              <Image
                src={logo}
                alt='logo'
                width={250}
                height={300}
              />
            </Link>
            {/* <p>Serving Austin and Central Texas</p> */}
          </div>
          <div className="flex items-center gap-5 text-sm text-gray-600">
            {pages.map((page) => (
              <Link
                key={page._id}
                href={`/${page.slug}`}
                className="hover:underline"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </header>
        <main className="py-20">{children}</main>
      </body>
    </html>
  )
}
