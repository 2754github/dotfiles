import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /**
   * NOTE
   * - Unsupported Next.js configuration option(s) (next.config.js)
   *   To use Turbopack, remove the following configuration options:
   *     - experimental.typedRoutes
   */
  // experimental: {
  //   typedRoutes: true,
  // },
  poweredByHeader: false,
};

export default nextConfig;
