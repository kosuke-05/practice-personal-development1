"use client"

import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryComponent } from "./errorBoundaryComponent";
import { usePathname } from "next/navigation";

// ErrorBoundaryをlayoutに読み込むための仲介
export const AppErrorBoundary = ({children}: {children: ReactNode}) => {
  const pathName = usePathname();

  return (
    <ErrorBoundary
      key={pathName}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorBoundaryComponent
          error={error}
          resetErrorBoundary={resetErrorBoundary} />
      )}>
      {children}
    </ErrorBoundary>
  )
};