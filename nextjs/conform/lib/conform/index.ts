import { type SubmissionResult, useForm } from '@conform-to/react';
import { getValibotConstraint, parseWithValibot } from '@conform-to/valibot';
import { useActionState, useEffect } from 'react';
import { type GenericSchema, type InferOutput } from 'valibot';
import { type Lang } from '../lang';

export type FormAction<Data extends OkResult> = (
  prevState: unknown,
  formData: FormData,
) => Promise<Data | NgResult>;

// eslint-disable-next-line max-params
export const useCustomForm: <
  Schema extends GenericSchema<
    Record<string, unknown>,
    Record<string, unknown>
  >,
  Data extends OkResult,
>(
  lang: Lang,
  schema: Schema,
  action: FormAction<Data>,
  initialState?: Parameters<
    typeof useActionState<Data | NgResult, FormData>
  >[1],
  options?: Parameters<typeof useForm<InferOutput<Schema>>>[0],
) => [
  ...ReturnType<typeof useActionState<Data | NgResult, FormData>>,
  ...ReturnType<typeof useForm<InferOutput<Schema>>>,
] = (
  lang,
  schema,
  action,
  initialState,
  options,
  // eslint-disable-next-line max-params
) => {
  const [state, dispatch, isPending] = useActionState(
    action,
    initialState ?? initialResult,
  );

  const [form, fields] = useForm({
    constraint: getValibotConstraint(schema),
    // eslint-disable-next-line no-restricted-syntax
    lastResult: state as NgResult,
    onValidate: ({ formData }) => {
      return parseWithValibot(formData, {
        info: { abortPipeEarly: true, lang },
        schema,
      });
    },
    shouldRevalidate: 'onInput',
    shouldValidate: 'onBlur',
    ...options,
  });

  useEffect(() => {
    if (isNg(state)) {
      // eslint-disable-next-line no-alert
      alert(state.error?.['']);
    }
  }, [state]);

  return [state, dispatch, isPending, form, fields];
};

const initialResult = {} as const;

const isInitial = (x: unknown): x is typeof initialResult => {
  return JSON.stringify(x) === JSON.stringify(initialResult);
};

export type OkResult = Partial<Record<keyof NgResult, never>> &
  Record<string, unknown>;

export const isOk = <Data extends OkResult>(
  result: Data | NgResult,
): result is Data => {
  return !isInitial(result) && !isNg(result);
};

type NgResult = SubmissionResult;

const isNg = (x: unknown): x is NgResult => {
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
