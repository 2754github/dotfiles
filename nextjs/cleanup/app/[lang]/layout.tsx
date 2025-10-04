import { type Metadata, type Viewport } from 'next';
import { type FC } from 'react';
import 'server-only';
import { type Dict, type Lang, langs, toLang } from '../../lib/lang';
import './globals.css';

export const generateStaticParams = (): { lang: Lang }[] => {
  return langs.map((lang) => {
    return { lang };
  });
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    {
      color: 'TODO',
      media: '(prefers-color-scheme: light)',
    },
    {
      color: 'TODO',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  viewportFit: 'cover',
};

export const generateMetadata = async ({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> => {
  const { lang: x } = await params;
  const lang = toLang(x);

  return {
    description: dict[lang].description,
    formatDetection: {
      address: false,
      date: false,
      email: false,
      telephone: false,
      url: false,
    },
    icons: dict[lang].icon,
    manifest: `/manifest-${lang}.json`,
    metadataBase: new URL(
      process.env.NODE_ENV === 'production' ? 'TODO' : 'http://localhost:3000',
    ),
    openGraph: {
      description: dict[lang].description,
      images: dict[lang].icon,
      locale: dict[lang].locale,
      siteName: dict[lang].title,
      title: dict[lang].title,
      type: 'website',
      url: `/${lang}`,
    },
    robots: 'none',
    title: {
      default: dict[lang].title,
      template: `%s | ${dict[lang].title}`,
    },
    twitter: {
      card: 'summary',
    },
  };
};

const RootLayout: FC<LayoutProps<'/[lang]'>> = async ({ children, params }) => {
  const { lang: x } = await params;
  const lang = toLang(x);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <html lang={lang} prefix="og: https://ogp.me/ns#" suppressHydrationWarning>
      {/* https://blog.stin.ink/articles/how-to-implement-a-perfect-dark-mode */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
const f = b => document.documentElement.classList.toggle('dark', b);
const o = window.matchMedia('(prefers-color-scheme: dark)');
f(o.matches);
o.addEventListener('change', e => f(e.matches), { once: true });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

const dict = {
  en: {
    description: 'TODO',
    icon: 'TODO',
    locale: 'en_US',
    title: 'TODO',
  },
  ja: {
    description: 'TODO',
    icon: 'TODO',
    locale: 'ja_JP',
    title: 'TODO',
  },
} as const satisfies Dict;
