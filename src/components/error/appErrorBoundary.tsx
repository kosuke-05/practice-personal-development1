"use client"

import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryComponent } from "./errorBoundaryComponent";

// ErrorBoundaryをlayoutに読み込むための仲介
export const AppErrorBoundary = ({children}: {children: ReactNode}) => {

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorBoundaryComponent
          error={error}
          resetErrorBoundary={resetErrorBoundary} />
      )}>
      {children}
    </ErrorBoundary>
  )
};