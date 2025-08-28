import 'server-only';
import {
  type GenericSchema,
  type InferInput,
  type InferOutput,
  safeParse,
} from 'valibot';
import { type Lang, langs } from '../lang';
import { getLang } from '../lang/server';
import { type Context } from './context';
import { type MwData, type MwError, type MwList } from './middleware';
import {
  failure,
  type InferD,
  type InferE,
  type Result,
  success,
} from './result';

export type Usecase<
  Middleware extends MwList,
  Schema extends GenericSchema<
    Record<string, unknown>,
    Record<string, unknown>
  >,
  Handler extends (
    ctx: MwData<Middleware>,
    input: InferOutput<Schema>,
  ) => Promise<Result<Record<string, unknown>, Record<Lang, string>>>,
> = (
  input: InferInput<Schema>,
) => Promise<
  Result<
    InferD<Awaited<ReturnType<Handler>>>,
    | InferE<Awaited<ReturnType<Handler>>>
    | MwError<Middleware>
    | Record<Lang, string>
  >
>;

// @ts-expect-error
export const createUsecase: <
  Middleware extends MwList,
  Schema extends GenericSchema<
    Record<string, unknown>,
    Record<string, unknown>
  >,
  Handler extends (
    ctx: MwData<Middleware>,
    input: InferOutput<Schema>,
  ) => Promise<Result<Record<string, unknown>, Record<Lang, string>>>,
>(
  middleware: Middleware,
  schema: Schema,
  handler: Handler,
) => Usecase<Middleware, Schema, Handler> = (middleware, schema, handler) => {
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
      // eslint-disable-next-line no-restricted-syntax
      let error = {} as Record<Lang, string>;
      for (const lang of langs) {
        error = { ...error, [lang]: parsed.issues[0].message };
      }

      return failure(error);
    }

    // @ts-expect-error
    const { data, error } = await handler(ctx, parsed.output);
    if (error !== undefined) {
      return failure(error);
    }

    return success(data);
  };
};
