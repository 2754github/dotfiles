import { type FC } from 'react';
import 'server-only';
import { type Lang } from '../../lib/lang';

type Props = {
  params: Promise<{
    lang: Lang;
  }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { lang } = await params;

  return <>{lang}</>;
};

export default Page;
