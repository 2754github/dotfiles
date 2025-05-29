import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

// https://github.com/vercel/next.js/issues/79313
if (process.env.NODE_ENV !== 'production') {
  nextConfig.htmlLimitedBots = /.*/;
}

export default nextConfig;
