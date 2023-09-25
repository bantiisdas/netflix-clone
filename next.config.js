/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org', 'rb.gy'],
        // unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig
