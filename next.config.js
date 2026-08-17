/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Default is ['image/webp'] only. The gallery photos are the heaviest thing
    // the site ships and they were the LCP element on / and /gallery; AVIF is
    // typically 20-30% smaller than WebP at the same quality. Order matters —
    // the optimizer picks the first entry the browser's Accept header allows, so
    // WebP stays as the fallback for browsers without AVIF.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'wallcoveringsbydondye.com' }],
        destination: 'https://www.wallcoveringsbydondye.com/:path*',
        permanent: true,
      },
      {
        // The Sanity `page` document with slug `home` also renders at /home,
        // duplicating `/`. It self-canonicalised to /home rather than /, so any
        // inbound or stray internal link split signals between two URLs for the
        // same content. Not in the sitemap, but a redirect costs nothing and
        // makes the duplicate unreachable.
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        // The 13 per-city landing pages (/service-area/austin, /round-rock, …)
        // were removed on 2026-08-17. They shipped in the sitemap and were
        // crawlable, so they redirect to the hub rather than 404.
        //
        // Only matches one segment deep, so the hub itself (/service-area) is
        // untouched. Keep this even after the URLs age out of the index — the
        // cost is one config entry and the alternative is dead inbound links.
        source: '/service-area/:city',
        destination: '/service-area',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
