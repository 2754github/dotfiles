import 'server-only';
import {
  type GenericSchema,
  type InferInput,
  type InferOutput,
  safeParse,
} from 'valibot';
import { type Lang, langs } from '../lang';
import { getLang } from '../lang/server';
import { emptyContext } from './context';
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
  Schema extends GenericSchema<Record<string, unknown>>,
  Handler extends (
    ctx: MwData<Middleware>,
    input: InferOutput<Schema>,
  ) => Promise<Result<Record<string, unknown>, Record<Lang, string>>>,
> = (
  input: InferInput<Schema>,
  options?: UsecaseOptions,
) => Promise<
  Result<
    InferD<Awaited<ReturnType<Handler>>>,
    | InferE<Awaited<ReturnType<Handler>>>
    | MwError<Middleware>
    | Record<Lang, string>
  >
>;

type UsecaseOptions = {
  // skipParse prevents duplicate parsing when integrating with packages like conform.
  skipParse?: boolean;
};

// eslint-disable-next-line max-lines-per-function
export const createUsecase = <
  Middleware extends MwList,
  Schema extends GenericSchema<Record<string, unknown>>,
  Handler extends (
    ctx: MwData<Middleware>,
    input: InferOutput<Schema>,
  ) => Promise<Result<Record<string, unknown>, Record<Lang, string>>>,
>(
  middleware: Middleware,
  schema: Schema,
  handler: Handler,
): Usecase<Middleware, Schema, Handler> => {
  // @ts-expect-error
  // eslint-disable-next-line max-statements
  return async (input, { skipParse = false }: UsecaseOptions = {}) => {
    let ctx = emptyContext;
    for (const mw of middleware) {
      // @ts-expect-error
      // eslint-disable-next-line no-await-in-loop
      const { data, error } = await mw(ctx);
      if (error !== undefined) {
        return failure(error);
      }

      ctx = data;
    }

    let parsedInput = input;
    if (!skipParse) {
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

      // eslint-disable-next-line prefer-destructuring
      parsedInput = parsed.output;
    }

    // @ts-expect-error
    const { data, error } = await handler(ctx, parsedInput);
    if (error !== undefined) {
      return failure(error);
    }

    return success(data);
  };
};
