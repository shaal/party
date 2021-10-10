const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching
  },
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: { esmExternals: true },
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    BASE_URL: process.env.BASE_URL,
    GIT_COMMIT_REF: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
    GIT_COMMIT_SHA: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL
  }
})
