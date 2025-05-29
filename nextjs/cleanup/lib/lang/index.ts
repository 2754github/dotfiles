export const defaultLang = 'en';

export const langs = [
  defaultLang,
  'ja',
  // ...
] as const;

export type Lang = (typeof langs)[number];

export const isLang = (x: unknown): x is Lang => {
  // @ts-expect-error
  return typeof x === 'string' && langs.includes(x);
};

export const toLang = (x: unknown): Lang => {
  return isLang(x) ? x : defaultLang;
};

export type Dict = Record<
  Lang,
  Record<string, ((...props: string[]) => string) | string>
>;
