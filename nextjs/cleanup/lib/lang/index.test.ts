import { describe, expect, test } from 'vitest';
import { isLang } from '.';

describe('isLang', () => {
  test.each([
    { x: undefined, expected: false },
    { x: null, expected: false },
    { x: false, expected: false },
    { x: true, expected: false },
    { x: 2, expected: false },
    { x: 0.2, expected: false },
    { x: '', expected: false },
    { x: '!', expected: false },
    { x: {}, expected: false },
    { x: 'en', expected: true },
    { x: 'ja', expected: true },
    { x: 'zh', expected: false },
  ])('isLang($x) => $expected', ({ x, expected }) => {
    const actual = isLang(x);

    expect(actual).toStrictEqual(expected);
  });
});
