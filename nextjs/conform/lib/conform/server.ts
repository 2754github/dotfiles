import { type SubmissionResult } from '@conform-to/react';
import { parseWithValibot } from '@conform-to/valibot';
import 'server-only';
import { type GenericSchema } from 'valibot';
import { type Lang, translate } from '../lang';
import { getLang } from '../lang/server';
import { type Usecase } from '../usecase/creator';

export const createFormAction: <
  Schema extends GenericSchema<
    Record<string, unknown>,
    Record<string, unknown>
  >,
  Data extends Record<string, unknown>,
  Error extends Record<Lang, string>,
>(
  schema: Schema,
  usecase: Usecase<Schema, Data, Error>,
) => (
  prevState: unknown,
  formData: FormData,
) => Promise<Data | SubmissionResult> = (schema, usecase) => {
  return async (_, formData) => {
    const lang = await getLang();

    const submission = parseWithValibot(formData, {
      info: { abortPipeEarly: true, lang },
      schema,
    });
    if (submission.status !== 'success') {
      return submission.reply();
    }

    const { data, error } = await usecase(submission.value);
    if (error !== undefined) {
      return submission.reply({
        formErrors: [translate(lang, error)],
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return data!;
  };
};
