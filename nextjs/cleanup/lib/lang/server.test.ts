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
      req: {
        headers: { 'accept-language': null },
      },
      expected: 'en',
    },
    {
      req: {
        headers: { 'accept-language': '' },
      },
      expected: 'en',
    },
    {
      req: {
        headers: { 'accept-language': '*' },
      },
      expected: 'en',
    },
    {
      req: {
        headers: { 'accept-language': 'en' },
      },
      expected: 'en',
    },
    {
      req: {
        headers: { 'accept-language': 'ja' },
      },
      expected: 'ja',
    },
    {
      req: {
        headers: { 'accept-language': 'zh' },
      },
      expected: 'en',
    },
    {
      req: {
        headers: { 'accept-language': 'en,ja' },
      },
      expected: 'en',
    },
    {
      req: {
        headers: { 'accept-language': 'ja,zh' },
      },
      expected: 'ja',
    },
    {
      req: {
        headers: { 'accept-language': 'en,zh' },
      },
      expected: 'en',
    },
    {
      req: {
        headers: { 'accept-language': 'en,ja,zh' },
      },
      expected: 'en',
    },
    {
      req: {
        headers: { 'accept-language': 'zh;q=0.9,en;q=0.8,ja' },
      },
      expected: 'ja',
    },
  ])(
    'getLang() => $expected (headers: $req.headers)',
    async ({ req, expected }) => {
      (headers as Mock).mockReturnValue({
        get: vi.fn(() => {
          return req.headers['accept-language'];
        }),
      });

      const actual = await getLang();

      expect(actual).toStrictEqual(expected);
    },
  );
});
