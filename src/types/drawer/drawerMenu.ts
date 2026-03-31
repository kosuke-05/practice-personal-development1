"use client"

import { ReactNode } from "react";

export type drawerMenu = {
      name: string,
      path?: string,
      icon: ReactNode,
      action?: () => void
};

