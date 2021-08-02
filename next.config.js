module.exports = {
  images: {
    domains: ['cloudflare-ipfs.com', 'avatar.tobi.sh']
  },
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom': 'preact/compat'
      })
    }

    return config
  }
}
