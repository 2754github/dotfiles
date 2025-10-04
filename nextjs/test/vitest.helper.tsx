/* eslint-disable perfectionist/sort-objects, perfectionist/sort-object-types */

import { randomBytes } from 'node:crypto';
import { describe, expect, type Mock, test } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any) => any;

export const runTests = <P extends unknown[], R, M extends Fn[]>(
  targetFn: (...args: P) => R,
  mockedFns: M,
  cases: {
    mocks: { [K in keyof M]: Partial<Awaited<ReturnType<M[K]>>> };
    args: P;
    want: Awaited<R>;
  }[],
): void => {
  describe(getTestName(targetFn, mockedFns), () => {
    test.each(cases)('#%$: $args => $want', async ({ mocks, args, want }) => {
      for (const [i, mockedFn] of mockedFns.entries()) {
        // eslint-disable-next-line no-restricted-syntax
        (mockedFn as Mock).mockReturnValue(mocks.at(i));
      }

      const got = await targetFn(...args);

      expect(got).toStrictEqual(want);
    });
  });
};

const getTestName = (targetFn: Fn, mockedFns: Fn[]) => {
  return (
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    (targetFn.name ||
      [...targetFn.toString().matchAll(/__vite_ssr_import_0__\.(\w+)/gu)]
        .map((m) => {
          return m.at(1);
        })
        .join(', ')) + (mockedFns.length === 0 ? '' : ' (with mocks)')
  );
};

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof#%E8%A7%A3%E8%AA%AC
const dummies = [
  'undefined',
  'null',
  'boolean',
  'number',
  'bigint',
  'string',
  'symbol',
  'function',
  'array',
  'object',
] as const;

const getUndefined = () => {
  return undefined;
};

const getRandomInt = ({ min = 0, max = 1 } = {}) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

const divisor = 32;
const getRandomString = ({ min = 0, max = 4 } = {}) => {
  return randomBytes(getRandomInt({ min, max })).reduce((p, i) => {
    return p + (i % divisor).toString(divisor);
  }, '');
};

const getRandomFunction = (): Fn => {
  const key = dummies.at(getRandomInt({ min: 0, max: dummies.length - 1 }));

  return key === undefined ? getUndefined : dummy[key];
};

type MinMax = {
  min?: number;
  max?: number;
};

export const dummy = {
  undefined: getUndefined,
  null: () => {
    return null;
  },
  boolean: () => {
    return Math.random() < 0.5;
  },
  number: ({ min = -1, max = 1 }: MinMax = {}) => {
    return Math.random() * (max - min) + min;
  },
  bigint: () => {
    const sign = BigInt(getRandomInt({ min: -1, max: 1 }));
    const base = BigInt(Number.MAX_SAFE_INTEGER + 1);
    const add = BigInt(getRandomInt({ min: 0, max: Number.MAX_SAFE_INTEGER }));

    return sign * (base + add);
  },
  string: getRandomString,
  symbol: ({ min = 0, max = 4 }: MinMax = {}) => {
    return Symbol(getRandomString({ min, max }));
  },
  function: getRandomFunction,
  array: ({ min = 0, max = 4 }: MinMax = {}) => {
    return Array.from(
      { length: getRandomInt({ min, max }) },
      getRandomFunction,
    );
  },
  object: ({ min = 0, max = 4 }: MinMax = {}) => {
    return Object.fromEntries(
      Array.from({ length: getRandomInt({ min, max }) }, () => {
        return [getRandomString(), getRandomFunction()];
      }),
    );
  },
} as const satisfies Record<(typeof dummies)[number], Fn>;
