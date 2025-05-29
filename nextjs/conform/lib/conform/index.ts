import { type SubmissionResult, useForm } from '@conform-to/react';
import { getValibotConstraint, parseWithValibot } from '@conform-to/valibot';
import { useActionState } from 'react';
import { type GenericSchema, type InferOutput } from 'valibot';
import { type Lang } from '../lang';

export type FormAction<Data extends Record<string, unknown>> = (
  prevState: unknown,
  formData: FormData,
) => Promise<Data | SubmissionResult>;

// eslint-disable-next-line max-params
export const useCustomForm: <
  Schema extends GenericSchema<
    Record<string, unknown>,
    Record<string, unknown>
  >,
  Data extends Record<string, unknown>,
>(
  lang: Lang,
  schema: Schema,
  action: FormAction<Data>,
  initialState?: Parameters<
    typeof useActionState<Data | SubmissionResult, FormData>
  >[1],
  moreOptions?: Parameters<typeof useForm<InferOutput<Schema>>>[0],
) => [
  ...ReturnType<typeof useActionState<Data | SubmissionResult, FormData>>,
  ...ReturnType<typeof useForm<InferOutput<Schema>>>,
] = (
  lang,
  schema,
  action,
  initialState,
  moreOptions,
  // eslint-disable-next-line max-params
) => {
  const [state, dispatch, isPending] = useActionState(
    action,
    initialState ?? initialResult,
  );
  const [form, fields] = useForm({
    constraint: getValibotConstraint(schema),
    // eslint-disable-next-line no-restricted-syntax
    lastResult: state as SubmissionResult,
    onValidate: ({ formData }) => {
      return parseWithValibot(formData, {
        info: { abortPipeEarly: true, lang },
        schema,
      });
    },
    shouldRevalidate: 'onInput',
    shouldValidate: 'onBlur',
    ...moreOptions,
  });

  return [state, dispatch, isPending, form, fields];
};

const initialResult = {} as const;

const isInitialResult = (x: unknown): x is typeof initialResult => {
  return JSON.stringify(x) === JSON.stringify(initialResult);
};

export const isData = <Data extends Record<string, unknown>>(
  result: Data | SubmissionResult,
): result is Data => {
  return !isInitialResult(result) && !isSubmissionResult(result);
};

const isSubmissionResult = (x: unknown): x is SubmissionResult => {
  return (
    x !== undefined &&
    x !== null &&
    typeof x === 'object' &&
    ('status' in x ||
      'intent' in x ||
      'initialValue' in x ||
      'fields' in x ||
      'error' in x ||
      'state' in x)
  );
};
