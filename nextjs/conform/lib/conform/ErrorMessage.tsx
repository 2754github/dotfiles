import { type FieldMetadata } from '@conform-to/react';
import { type ReactNode } from 'react';

type Props<Schema> = {
  metadata: FieldMetadata<Schema>;
};

export const ErrorMessage = <Schema,>({
  metadata,
}: Props<Schema>): ReactNode => {
  return (
    <div className="min-h-5 text-sm text-destructive">
      {metadata.errors?.at(0)}
    </div>
  );
};
