import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // The source assets are oversampled (a 500x666 portrait renders at 84px).
    // These are the widths the layout actually asks for.
    imageSizes: [48, 64, 84, 96, 132, 180, 256],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
