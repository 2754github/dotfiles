import { type SubmissionResult, useForm } from '@conform-to/react';
import { getValibotConstraint, parseWithValibot } from '@conform-to/valibot';
import { useActionState, useEffect } from 'react';
import { type GenericSchema, type InferOutput } from 'valibot';
import { type Lang } from '../lang';

export type FormAction<T extends OkResult> = (
  prevState: unknown,
  formData: FormData,
) => Promise<NgResult | T>;

const doNotUse = '__DO_NOT_USE';
const initialResult = { [doNotUse]: undefined } as const;
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
  Record<keyof InitialResult | keyof NgResult, never>
> &
  Record<string, unknown>;

export const isOk = <T extends OkResult>(result: NgResult | T): result is T => {
  return !isInitial(result) && !isNg(result);
};

export const useCustomForm = <
  Schema extends GenericSchema<Record<string, unknown>>,
  T extends OkResult,
>(
  lang: Lang,
  schema: Schema,
  action: FormAction<T>,
  initialState?: Partial<InferOutput<Schema>>,
  options?: Parameters<typeof useForm<InferOutput<Schema>>>[0],
): [
  ...ReturnType<typeof useActionState<NgResult | T, FormData>>,
  ...ReturnType<typeof useForm<InferOutput<Schema>>>,
  // eslint-disable-next-line max-params
] => {
  // @ts-expect-error
  const [state, dispatch, isPending] = useActionState(action, {
    ...initialResult,
    ...initialState,
  });

  const [form, fields] = useForm({
    constraint: getValibotConstraint(schema),
    // @ts-expect-error
    defaultValue: initialState,
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
