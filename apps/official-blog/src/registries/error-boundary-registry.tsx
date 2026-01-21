'use client';

import { ErrorUI } from '@coldsurfers/ocean-road';
import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const ErrorBoundaryRegistry = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => {
        return <ErrorUI.UnknownError onClickRetry={resetErrorBoundary} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
