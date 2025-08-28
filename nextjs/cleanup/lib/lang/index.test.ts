import { describe, expect, test } from 'vitest';
import { isLang } from '.';

describe('isLang', () => {
  test.each([
    {
      args: {
        x: undefined,
      },
      want: false,
    },
    {
      args: {
        x: null,
      },
      want: false,
    },
    {
      args: {
        x: {},
      },
      want: false,
    },
    {
      args: {
        x: false,
      },
      want: false,
    },
    {
      args: {
        x: true,
      },
      want: false,
    },
    {
      args: {
        x: 0,
      },
      want: false,
    },
    {
      args: {
        x: 0.5,
      },
      want: false,
    },
    {
      args: {
        x: 2,
      },
      want: false,
    },
    {
      args: {
        x: '',
      },
      want: false,
    },
    {
      args: {
        x: '!',
      },
      want: false,
    },
    {
      args: {
        x: 'en',
      },
      want: true,
    },
    {
      args: {
        x: 'ja',
      },
      want: true,
    },
    {
      args: {
        x: 'zh',
      },
      want: false,
    },
  ])('isLang($args.x) => $want', ({ args, want }) => {
    const got = isLang(args.x);

    expect(got).toStrictEqual(want);
  });
});
