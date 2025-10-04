import { headers } from 'next/headers';
import { vi } from 'vitest';
import { dummy, runTests } from '../../vitest.helper';
import { getLang } from './server';

vi.mock('next/headers', () => {
  return {
    headers: vi.fn(),
  };
});

runTests(
  getLang,
  [headers],
  [
    {
      mocks: [
        {
          get: () => {
            return null;
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return '';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return '    ';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return '*';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return '  *  ';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return dummy.string({ min: 3 });
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return 'en';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return 'ja';
          },
        },
      ],
      args: [],
      want: 'ja',
    },
    {
      mocks: [
        {
          get: () => {
            return 'zh';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return 'en,ja';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return 'ja,zh';
          },
        },
      ],
      args: [],
      want: 'ja',
    },
    {
      mocks: [
        {
          get: () => {
            return 'en,zh';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return 'en,ja,zh';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return 'en,ja;q=0.9,zh;q=0.8';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return 'en;q=0.8,ja,zh;q=0.9';
          },
        },
      ],
      args: [],
      want: 'ja',
    },
    {
      mocks: [
        {
          get: () => {
            return 'en;q=0.9,ja;q=0.8,zh';
          },
        },
      ],
      args: [],
      want: 'en',
    },
    {
      mocks: [
        {
          get: () => {
            return 'en;q=0.8,ja;q=0.9,zh;q=1.0';
          },
        },
      ],
      args: [],
      want: 'ja',
    },
  ],
);
