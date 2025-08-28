import { type FC } from 'react';
import 'server-only';
import { toLang } from '../../lib/lang';

const Page: FC<PageProps<'/[lang]'>> = async ({ params }) => {
  const { lang: x } = await params;
  const lang = toLang(x);

  return <>{lang}</>;
};

export default Page;
