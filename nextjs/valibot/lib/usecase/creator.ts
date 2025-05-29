import 'server-only';
import {
  type GenericSchema,
  type InferInput,
  type InferOutput,
  safeParse,
} from 'valibot';
import {
  type Context,
  type EmptyContext,
  failure,
  type Result,
  success,
  type SupabaseContext,
  type UserContext,
} from '.';
import { type Lang, langs } from '../lang';
import { getLang } from '../lang/server';
import {
  type MiddlewareErrors,
  type MiddlewareLists,
  type supabase,
  type user,
} from './middleware';

export type Usecase<
  Schema extends GenericSchema<
    Record<string, unknown>,
    Record<string, unknown>
  >,
  Data extends Record<string, unknown>,
  Error extends Record<Lang, string>,
> = (
  input: InferInput<Schema>,
) => Promise<Result<Data, Error | MiddlewareErrors | Record<Lang, string>>>;

export const createUsecase: <
  Middleware extends MiddlewareLists,
  Schema extends GenericSchema<
    Record<string, unknown>,
    Record<string, unknown>
  >,
  Data extends Record<string, unknown>,
  Error extends Record<Lang, string>,
>(
  middleware: Middleware,
  schema: Schema,
  handler: (
    ctx: Middleware extends []
      ? EmptyContext
      : Middleware extends [typeof supabase]
        ? SupabaseContext
        : Middleware extends [typeof supabase, typeof user]
          ? UserContext
          : never,
    input: InferOutput<Schema>,
  ) => Promise<Result<Data, Error>>,
) => Usecase<Schema, Data, Error> = (middleware, schema, handler) => {
  // eslint-disable-next-line max-statements
  return async (input) => {
    let ctx: Context = {};
    for (const mw of middleware) {
      // @ts-expect-error
      // eslint-disable-next-line no-await-in-loop
      const { data, error } = await mw(ctx);
      if (error !== undefined) {
        return failure(error);
      }

      ctx = data;
    }

    const parsed = safeParse(schema, input, {
      abortEarly: true,
      abortPipeEarly: true,
      lang: await getLang(),
    });
    if (!parsed.success) {
      const {
        issues: [{ message }],
      } = parsed;

      // eslint-disable-next-line no-restricted-syntax
      let error = {} as Record<Lang, string>;
      for (const lang of langs) {
        error = { ...error, [lang]: message };
      }

      return failure(error);
    }

    // @ts-expect-error
    const { data, error } = await handler(ctx, parsed.output);
    if (error !== undefined) {
      return failure(error);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return success(data!);
  };
};
