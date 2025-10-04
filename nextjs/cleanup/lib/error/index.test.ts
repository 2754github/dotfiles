import { CustomError } from '.';
import { dummy, runTests } from '../../vitest.helper';

runTests(
  (message: string) => {
    return new CustomError(message, {}).digest;
  },
  [],
  [
    {
      mocks: [],
      ...(() => {
        const s = dummy.string();

        return { args: [s], want: s } as const;
      })(),
    },
  ],
);
