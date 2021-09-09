module.exports = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    BASE_URL: process.env.BASE_URL
  }
}
