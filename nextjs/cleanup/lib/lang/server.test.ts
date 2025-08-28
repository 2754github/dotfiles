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
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': '' },
      },
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': '*' },
      },
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en' },
      },
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'ja' },
      },
      want: 'ja',
    },
    {
      mock: {
        headers: { 'accept-language': 'zh' },
      },
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en,ja' },
      },
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'ja,zh' },
      },
      want: 'ja',
    },
    {
      mock: {
        headers: { 'accept-language': 'en,zh' },
      },
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en,ja,zh' },
      },
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en,ja;q=0.9,zh;q=0.8' },
      },
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en;q=0.8,ja,zh;q=0.9' },
      },
      want: 'ja',
    },
    {
      mock: {
        headers: { 'accept-language': 'en;q=0.9,ja;q=0.8,zh' },
      },
      want: 'en',
    },
    {
      mock: {
        headers: { 'accept-language': 'en;q=0.8,ja;q=0.9,zh' },
      },
      want: 'ja',
    },
  ])('getLang() => $want (headers: $mock.headers)', async ({ mock, want }) => {
    (headers as Mock).mockReturnValue({
      get: vi.fn(() => {
        return mock.headers['accept-language'];
      }),
    });

    const got = await getLang();

    expect(got).toStrictEqual(want);
  });
});
