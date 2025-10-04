import { type NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  compiler: {
    reactRemoveProperties: true,
    removeConsole: !isDev,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedEnv: true,
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: `Content-Security-Policy${isDev ? '-Report-Only' : ''}`,
            value: `
              frame-ancestors 'none';
              ${isDev ? '' : 'upgrade-insecure-requests;'}
              default-src 'self';
              script-src  'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''};
              style-src   'self' ${isDev ? "'unsafe-inline'" : ''};
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
if (isDev) {
  nextConfig.htmlLimitedBots = /.*/;
}

export default nextConfig;
