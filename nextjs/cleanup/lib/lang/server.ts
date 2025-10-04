import { headers } from 'next/headers';
import 'server-only';
import { defaultLang, isLang, type Lang } from '.';

export const getLang = async (): Promise<Lang> => {
  const headersList = await headers();
  const acceptLanguage = headersList
    .get('accept-language')
    ?.replaceAll(/\s/gu, '');
  if (
    acceptLanguage === undefined ||
    acceptLanguage === '' ||
    acceptLanguage === '*'
  ) {
    return defaultLang;
  }

  for (const { lang } of acceptLanguage
    .split(',')
    .map((lq) => {
      const [l, q] = lq.split(';');

      return {
        lang: l,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/strict-boolean-expressions
        q: q || 'q=1.0',
      };
    })
    .toSorted((a, b) => {
      return -a.q.localeCompare(b.q);
    })) {
    if (isLang(lang)) {
      return lang;
    }
  }

  return defaultLang;
};
