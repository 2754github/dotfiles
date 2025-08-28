import { headers } from 'next/headers';
import { describe, expect, type Mock, test, vi } from 'vitest';
import { getLang } from './server';

vi.mock('next/headers', () => {
  return {
    headers: vi.fn(),
  };
});

describe('getLang', () => {
  test.each([
    {
      mock: {
        headers: { 'accept-language': null },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': '' },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': '*' },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en' },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'ja' },
      },
      args: {},
      want: 'ja',
    },
    {
      mock: {
        headers: { 'accept-language': 'zh' },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en,ja' },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'ja,zh' },
      },
      args: {},
      want: 'ja',
    },
    {
      mock: {
        headers: { 'accept-language': 'en,zh' },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en,ja,zh' },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en,ja;q=0.9,zh;q=0.8' },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en;q=0.8,ja,zh;q=0.9' },
      },
      args: {},
      want: 'ja',
    },
    {
      mock: {
        headers: { 'accept-language': 'en;q=0.9,ja;q=0.8,zh' },
      },
      args: {},
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en;q=0.8,ja;q=0.9,zh' },
      },
      args: {},
      want: 'ja',
    },
  ])('$args => $want ($mock)', async ({ mock, args, want }) => {
    (headers as Mock).mockReturnValue({
      get: vi.fn(() => {
        return mock.headers['accept-language'];
      }),
    });

    const got = await getLang();

    expect(got).toStrictEqual(want);
  });
});
