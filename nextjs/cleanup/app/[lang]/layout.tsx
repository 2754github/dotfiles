import { type FC, type PropsWithChildren } from 'react';
import 'server-only';
import { type Lang, langs } from '../../lib/lang';
import './globals.css';

export const generateStaticParams = (): { lang: Lang }[] => {
  return langs.map((lang) => {
    return { lang };
  });
};

type Props = PropsWithChildren<{
  params: Promise<{
    lang: Lang;
  }>;
}>;

const RootLayout: FC<Props> = async ({ children, params }) => {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
