/** @type {import('next').NextConfig} */
const nextConfig = {
    // swcMinify:true,
    images:{
        remotePatterns:[
            {
                hostname:"image.tmdb.org"
            },
            {
                protocol: 'https',
                hostname: 'jio-backend-puq2.onrender.com',
            },
        ]
    }

};

export default nextConfig;
