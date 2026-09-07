/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/team',
        destination: '/unser-team',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
