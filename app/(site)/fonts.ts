// Single place the site's fonts are instantiated. Both CSS variables are applied
// to <body> in layout.tsx, so components only need the Tailwind family classes
// (`font-sans`, `font-headers`) — no per-component font loader calls.
//
// Montserrat was removed 2026-08-17. It was still being downloaded on every
// route, but nothing had used `font-montserrat` since the Phase 3d redesign
// replaced the components that did — a third of the site's font payload for
// text that no longer existed.
import { Catamaran, Ibarra_Real_Nova } from '@next/font/google'

export const bodyFont = Catamaran({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const headerFont = Ibarra_Real_Nova({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing',
})
