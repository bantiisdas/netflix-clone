/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org', 'rb.gy']
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig
