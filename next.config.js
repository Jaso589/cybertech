/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    API_URL: 'https://cybertech-olive.vercel.app'
  }
}

module.exports = nextConfig
