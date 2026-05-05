/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    ]
  },
}

module.exports = nextConfig
