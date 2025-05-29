import 'server-only';
import {
  type Context,
  type EmptyContext,
  failure,
  type Result,
  success,
  type SupabaseContext,
  type UserContext,
} from '.';
import { type Lang } from '../lang';
import { createClient } from '../supabase/server';

// eslint-disable-next-line perfectionist/sort-union-types
export type MwLists = [] | [typeof supabase] | [typeof supabase, typeof user];

export type MwContext<T extends MwLists> = T extends [...unknown[], infer Last]
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Last extends Middleware<any, infer D, any>
    ? D
    : never
  : EmptyContext;

export type MwError<T extends MwLists> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends Middleware<any, any, infer E> ? E : never;
}[number];

type Middleware<
  Input extends Context,
  Data extends Context,
  Error extends Record<Lang, string>,
> = (ctx: Input) => Promise<Result<Data, Error>>;

export const supabase: Middleware<
  EmptyContext,
  SupabaseContext,
  never
> = async (ctx) => {
  return success({ ...ctx, supabase: await createClient() });
};

export const user: Middleware<
  SupabaseContext,
  UserContext,
  typeof errors.failedToAuthenticate
> = async (ctx) => {
  const {
    data: { user: user2 },
  } = await ctx.supabase.auth.getUser();
  if (user2 === null) {
    return failure(errors.failedToAuthenticate);
  }

  return success({ ...ctx, user: user2 });
};

const errors = {
  failedToAuthenticate: {
    en: 'Failed to authenticate.',
    ja: '認証に失敗しました。',
  },
} as const satisfies Record<string, Record<Lang, string>>;
