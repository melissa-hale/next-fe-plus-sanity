import '../globals.css'
import type { Metadata } from 'next'
import { Catamaran, Dancing_Script } from '@next/font/google'

import Footer from './Components/Footer'
import Nav from './Components/Nav'

const bodyFont = Catamaran({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Wallcoverings By Don Dye',
  description: 'Professional Wallpaper Installation Specialist servicing Austin and Central Texas',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`mx-auto ${bodyFont.variable} font-sans`}>
        <Nav />
        <div id="hero-background"></div>  
        <main className="mx-auto">{children}</main>
        <a href="https://www.freepik.com/free-vector/diamond-shape-golden-pattern-vector-background_2395263.htm#query=geometric%20pattern&position=8&from_view=keyword&track=ais">
          <span className="block text-xs text-right text-gray-400">
            Background Image by starline on Freepik
          </span>
        </a>
        <Footer />
      </body>
    </html>
  )
}
