import 'server-only';

// eslint-disable-next-line perfectionist/sort-union-types
export type Result<D, E> = Success<D> | Failure<E>;

export type InferD<T extends Result<unknown, unknown>> =
  T extends Success<infer D> ? D : never;

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
  T extends Failure<infer E> ? E : never;

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
