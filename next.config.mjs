/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true, // Allows SVG images if needed
    remotePatterns: [
      {
        // This is for your Supabase product images
        protocol: 'https',
        hostname: 'gxgjkanojspqxtarngew.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/product-images/**',
      },
      {
        // This is for the placeholder images
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
