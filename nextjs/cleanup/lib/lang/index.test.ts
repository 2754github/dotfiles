import { describe, expect, test } from 'vitest';
import { isLang } from '.';

describe('isLang', () => {
  test.each([
    {
      mock: {},
      args: {
        x: undefined,
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: null,
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: {},
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: false,
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: true,
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: 0,
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: 0.5,
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: 2,
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: '',
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: '!',
      },
      want: false,
    },
    {
      mock: {},
      args: {
        x: 'en',
      },
      want: true,
    },
    {
      mock: {},
      args: {
        x: 'ja',
      },
      want: true,
    },
    {
      mock: {},
      args: {
        x: 'zh',
      },
      want: false,
    },
  ])('$args => $want ($mock)', ({ mock, args, want }) => {
    const got = isLang(args.x);

    expect(got).toStrictEqual(want);
  });
});
