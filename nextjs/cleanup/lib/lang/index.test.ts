import { isLang, toLang } from '.';
import { dummy, runTests } from '../../vitest.helper';

runTests(
  (x: unknown) => {
    return [isLang(x), toLang(x)];
  },
  [],
  [
    {
      mocks: [],
      args: [dummy.undefined()],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: [dummy.null()],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: [dummy.boolean()],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: [dummy.number()],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: [dummy.bigint()],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: [dummy.string({ min: 3 })],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: [dummy.symbol()],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: [dummy.function()],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: [dummy.array()],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: [dummy.object()],
      want: [false, 'en'],
    },
    {
      mocks: [],
      args: ['en'],
      want: [true, 'en'],
    },
    {
      mocks: [],
      args: ['ja'],
      want: [true, 'ja'],
    },
    {
      mocks: [],
      args: ['zh'],
      want: [false, 'en'],
    },
  ],
);
