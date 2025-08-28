import { type SubmissionResult, useForm } from '@conform-to/react';
import { getValibotConstraint, parseWithValibot } from '@conform-to/valibot';
import { useActionState, useEffect } from 'react';
import { type GenericSchema, type InferInput, type InferOutput } from 'valibot';
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
  initialState?: Partial<InferInput<Schema>>,
  options?: Parameters<typeof useForm<InferOutput<Schema>>>[0],
) => [
  ...ReturnType<typeof useActionState<Data | NgResult, FormData>>,
  ...ReturnType<typeof useForm<InferOutput<Schema>>>,
] = (
  lang,
  schema,
  action,
  initialState = initialResult,
  options = {},
  // eslint-disable-next-line max-params
) => {
  // @ts-expect-error
  const [state, dispatch, isPending] = useActionState(action, {
    ...initialResult,
    ...initialState,
  });

  const [form, fields] = useForm({
    constraint: getValibotConstraint(schema),
    // @ts-expect-error
    defaultValue: state,
    lastResult: state,
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

const doNotUse = '__DO_NOT_USE';
const initialResult = { [doNotUse]: true } as const;
type InitialResult = typeof initialResult;
const isInitial = (x: unknown): x is InitialResult => {
  return (
    x !== undefined && x !== null && typeof x === 'object' && doNotUse in x
  );
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

export type OkResult = Partial<
  Record<keyof (InitialResult | NgResult), never>
> &
  Record<string, unknown>;

export const isOk = <Data extends OkResult>(
  result: Data | NgResult,
): result is Data => {
  return !isInitial(result) && !isNg(result);
};
