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
    // manifest: `/manifest-${lang}.json`,
    openGraph: {
      description: dict[lang].description,
      images: dict[lang].icon,
      locale: dict[lang].locale,
      siteName: dict[lang].title,
      title: dict[lang].title,
      type: 'website',
      url: 'TODO',
    },
    robots: 'none',
    title: dict[lang].title,
    twitter: {
      card: 'summary',
    },
  };
};

export const viewport: Viewport = {
  // TODO
  colorScheme: 'light dark',
  themeColor: 'TODO',
  viewportFit: 'cover',
};

const RootLayout: FC<LayoutProps<'/[lang]'>> = async ({ children, params }) => {
  const { lang: x } = await params;
  const lang = toLang(x);

  return (
    // eslint-disable-next-line react/no-unknown-property -- https://ogp.me/
    <html lang={lang} prefix="og: https://ogp.me/ns#">
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
