import { type FieldMetadata } from '@conform-to/react';
import { type FC } from 'react';

type Props = {
  metadata: FieldMetadata;
};

export const ErrorMessage: FC<Props> = ({ metadata }) => {
  return (
    <div className="min-h-5 text-sm text-destructive">
      {metadata.errors?.at(0)}
    </div>
  );
};
