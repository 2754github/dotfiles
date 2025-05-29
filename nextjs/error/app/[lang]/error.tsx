'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, useTransition } from 'react';
import { defaultLang, type Dict, isLang } from '../../lib/lang';
import { isCustomError } from '../../lib/nextjs';
import { Button } from '../../shadcn/components/ui/button';

type Props = {
  error: Error;
  reset: () => void;
};

const Error: FC<Props> = ({ error, reset }) => {
  const pathname = usePathname();
  const [, x] = pathname.split('/');
  const lang = isLang(x) ? x : defaultLang;

  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      reset();
    });
  };

  // TODO: Trace error.

  return (
    <main className="grid h-dvh place-items-center">
      <div
        className={`
          space-y-8 px-8
          sm:px-16
        `}
      >
        <div className="text-center whitespace-pre-wrap">
          {isCustomError(error) ? error.digest : dict[lang].message}
        </div>
        <div
          className={`
            flex flex-wrap justify-center gap-4
            [&>*]:w-32
          `}
        >
          <Button asChild variant="link">
            <Link href="/">{dict[lang].backToHome}</Link>
          </Button>
          <Button disabled={isPending} onClick={handleClick}>
            {dict[lang].retry}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Error;

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
