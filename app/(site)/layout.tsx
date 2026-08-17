// app/(site)/layout.tsx
import '../globals.css'
import type { Metadata } from 'next'

import Footer from './Components/Footer'
import Nav from './Components/Nav'
import { LocalBusinessSchema, ServiceSchema } from './Components/StructuredData' // ADD THIS IMPORT
import { Analytics } from '@vercel/analytics/react';
import { bodyFont, headerFont } from './fonts'

// REPLACE YOUR EXISTING METADATA WITH THIS ENHANCED VERSION
export const metadata: Metadata = {
  metadataBase: new URL('https://www.wallcoveringsbydondye.com'), // UPDATE WITH YOUR ACTUAL DOMAIN
  title: {
    default: 'Wallcoverings By Don Dye | Professional Wallpaper Installation Austin, TX',
    template: '%s | Wallcoverings By Don Dye'
  },
  description: 'Professional wallpaper installation specialist serving Austin and Central Texas. Expert wallcovering services with over 40 years of experience. Free estimates available.',
  // `keywords` deliberately removed (docs/service-area-redesign.md 6.B3). Next
  // applies root metadata to every segment that doesn't override it, so the one
  // Austin-centric list was emitted verbatim on all 13 city pages. Google has
  // ignored the tag for over a decade; it was dead weight that also published
  // the site's targeting to competitors. Do not add it back.
  authors: [{ name: 'Don Dye' }],
  creator: 'Wallcoverings By Don Dye',
  publisher: 'Wallcoverings By Don Dye',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.wallcoveringsbydondye.com', // UPDATE WITH YOUR ACTUAL DOMAIN
    siteName: 'Wallcoverings By Don Dye',
    title: 'Professional Wallpaper Installation Austin, TX | Wallcoverings By Don Dye',
    description: 'Expert wallpaper installation services in Austin and Central Texas. Professional wallcovering specialist with over 40 years of experience.',
    images: [
      {
        url: '/og-image.png', // We'll create this in a later step
        width: 1200,
        height: 630,
        alt: 'Wallcoverings By Don Dye - Professional Wallpaper Installation Austin TX'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Wallpaper Installation Austin, TX | Wallcoverings By Don Dye',
    description: 'Expert wallpaper installation services in Austin and Central Texas. Professional wallcovering specialist with over 40 years of experience.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification=Cv4dbMzaNqMPQtXiv4jqwwwMr_W2eXovin0V9HkVpto'
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* The nav's wallpaper tile is the LCP element on the home page, and as
            a CSS background it is only discovered once the stylesheet has been
            fetched and parsed — Lighthouse reports requestDiscoverable: false.
            Preloading makes it discoverable in the initial document and lets it
            carry a priority hint, neither of which a background-image can do on
            its own.

            This is NOT a step back toward 3b.4: the tile stays a CSS background
            because a repeating 200x200 tile cannot be expressed with <Image
            fill>. The preload only fixes discovery. The file is 14 KB and shared
            by the nav and PageHero on every route, so it is wanted early on all
            of them. */}
        <link
          rel="preload"
          as="image"
          href="/green-wallpaper-bg.webp"
          type="image/webp"
          fetchpriority="high"
        />
        <LocalBusinessSchema />
        <ServiceSchema />
      </head>
      <body
        className={`${bodyFont.variable} ${headerFont.variable} bg-cream font-sans text-gray-800`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}