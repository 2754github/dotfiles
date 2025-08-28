import 'server-only';
import { type Lang } from '../lang';
import { createClient } from '../supabase/server';
import {
  type Context,
  type EmptyContext,
  type SupabaseContext,
  type UserContext,
} from './context';
import { failure, type Result, success } from './result';

// eslint-disable-next-line perfectionist/sort-union-types
export type MwList = [] | [typeof supabase] | [typeof supabase, typeof user];

export type MwData<T extends MwList> = T extends [...unknown[], infer Last]
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Last extends Middleware<any, infer D, any>
    ? D
    : never
  : EmptyContext;

export type MwError<T extends MwList> = {
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
  const supabase2 = await createClient();

  return success({ ...ctx, supabase: supabase2 });
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
