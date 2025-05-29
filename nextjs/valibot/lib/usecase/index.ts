import { type SupabaseClient, type User } from '@supabase/supabase-js';
import { type Database } from '../supabase/type';

// eslint-disable-next-line perfectionist/sort-union-types
export type Result<D, E> = Success<D> | Failure<E>;

export type InferD<T extends Result<unknown, unknown>> =
  T extends Result<infer D, unknown>
    ? D extends undefined
      ? never
      : D
    : never;

type Success<D> = {
  data: D;
  error: undefined;
};

export const success = <D>(data: D): Success<D> => {
  return {
    data,
    error: undefined,
  };
};

export type InferE<T extends Result<unknown, unknown>> =
  T extends Result<unknown, infer E>
    ? E extends undefined
      ? never
      : E
    : never;

type Failure<E> = {
  data: undefined;
  error: E;
};

export const failure = <E>(error: E): Failure<E> => {
  return {
    data: undefined,
    error,
  };
};

export type Context = EmptyContext | SupabaseContext | UserContext;

// []
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type EmptyContext = {};

// [supabase]
export type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

// [supabase, user]
export type UserContext = SupabaseContext & {
  user: User;
};
