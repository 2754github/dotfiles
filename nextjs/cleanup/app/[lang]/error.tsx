'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type FC, type PropsWithChildren, useTransition } from 'react';
import { isCustomError } from '../../lib/error';
import { type Dict, toLang } from '../../lib/lang';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error: FC<ErrorProps> = ({ error, reset }) => {
  const pathname = usePathname();
  const lang = toLang(pathname.split('/').at(1));

  const router = useRouter();

  // TODO: Trace error.

  return (
    <main className="grid h-dvh place-items-center px-8">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center whitespace-pre-wrap">
          {isCustomError(error) ? error.digest : dict[lang].message}
        </div>
        <div className="flex flex-wrap-reverse justify-center gap-8">
          <Button
            onClick={() => {
              router.push(`/${lang}`);
            }}
          >
            {dict[lang].backToHome}
          </Button>
          <Button
            onClick={() => {
              reset();
            }}
          >
            {dict[lang].retry}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Error;

type Props = PropsWithChildren<{
  onClick: () => void;
}>;

export const Button: FC<Props> = ({ children, onClick }) => {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      onClick();
    });
  };

  return isPending ? (
    <div className="flex w-32 cursor-not-allowed items-center justify-center border">
      <div className="size-4 animate-spin rounded-full border border-t-transparent" />
    </div>
  ) : (
    <button
      className="w-32 cursor-pointer border"
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
};

const dict = {
  en: {
    backToHome: 'Back to home',
    message: 'An error occurred.',
    retry: 'Retry',
  },
  ja: {
    backToHome: 'ホームに戻る',
    message: '不具合が発生しました。',
    retry: 'リトライ',
  },
} as const satisfies Dict;
