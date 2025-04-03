const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = {
      type: 'filesystem',
      compression: 'gzip',
      buildDependencies: {
        config: [__filename],
      },
    }
    return config
  },
  images: {
    domains: ['img.clerk.com', 'images.unsplash.com'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
