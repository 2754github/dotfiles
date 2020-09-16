import type { ReactNode } from 'react';

export type Params = {
  params: {
    // ...
  };
};

export type SearchParams = {
  searchParams: {
    // ...
  };
};

export type Children = {
  children: ReactNode;
};

/**
 * Async component.
 */
export type AC<P = Record<never, never>> = (props: P) => any;
