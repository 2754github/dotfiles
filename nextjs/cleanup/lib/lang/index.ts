export const defaultLang = 'en';

export const langs = [
  defaultLang,
  'ja',
  // ...
] as const;

export type Lang = (typeof langs)[number];

export const isLang = (x: unknown): x is Lang => {
  return (
    typeof x === 'string' &&
    // eslint-disable-next-line unicorn/prefer-includes
    langs.some((l) => {
      return l === x;
    })
  );
};

export const toLang = (x: unknown): Lang => {
  return isLang(x) ? x : defaultLang;
};

export type Dict = Record<
  Lang,
  Record<string, ((...args: string[]) => string) | string>
>;
