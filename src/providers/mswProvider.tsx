"use client";

import { ReactNode, useEffect } from "react";
import { enableMocking } from "@/mocks";

export const MswProvider = ({children}: {children: ReactNode}) => {
  useEffect(() => {
    enableMocking();
  }, []);

  return <>{children}</>;
};