import { parseWithValibot } from '@conform-to/valibot';
import 'server-only';
import { type GenericSchema, type InferOutput } from 'valibot';
import { type FormAction, type OkResult } from '.';
import { type Lang, translate } from '../lang';
import { getLang } from '../lang/server';
import { type Usecase } from '../usecase/creator';
import { type MwData, type MwList } from '../usecase/middleware';
import { type InferD, type Result } from '../usecase/result';

export const createFormAction = <
  Middleware extends MwList,
  Schema extends GenericSchema<Record<string, unknown>>,
  Handler extends (
    ctx: MwData<Middleware>,
    input: InferOutput<Schema>,
  ) => Promise<Result<OkResult, Record<Lang, string>>>,
>(
  schema: Schema,
  usecase: Usecase<Middleware, Schema, Handler>,
): FormAction<InferD<Awaited<ReturnType<Handler>>>> => {
  return async (_, formData) => {
    const lang = await getLang();

    const submission = parseWithValibot(formData, {
      info: { abortPipeEarly: true, lang },
      schema,
    });
    if (submission.status !== 'success') {
      return submission.reply();
    }

    const { data, error } = await usecase(submission.value, {
      skipParse: true,
    });
    if (error !== undefined) {
      return submission.reply({
        formErrors: [translate(lang, error)],
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return data!;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFunction = <T extends Usecase<any, any, any>>(
  usecase: T,
): ((input: Parameters<T>[0]) => ReturnType<T>) => {
  // @ts-expect-error
  return (input) => {
    return usecase(input);
  };
};
