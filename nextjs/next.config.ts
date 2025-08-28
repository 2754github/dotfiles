import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src  'self' 'unsafe-inline';
              style-src   'self' 'unsafe-inline';
            `.replace(/\n/g, ''),
          },
        ],
      },
    ];
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
