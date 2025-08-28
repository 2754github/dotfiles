import { headers } from 'next/headers';
import 'server-only';
import { defaultLang, isLang, type Lang } from '.';

export const getLang = async (): Promise<Lang> => {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  if (
    acceptLanguage === null ||
    acceptLanguage === '' ||
    acceptLanguage === '*'
  ) {
    return defaultLang;
  }

  for (const { lang } of acceptLanguage
    .split(',')
    .map((al) => {
      const [l, q] = al.split(';');

      return {
        lang: l?.trim(),
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/strict-boolean-expressions
        q: q?.trim() || 'q=1.0',
      };
    })
    .toSorted((a, b) => {
      return b.q.localeCompare(a.q);
    })) {
    if (isLang(lang)) {
      return lang;
    }
  }

  return defaultLang;
};
