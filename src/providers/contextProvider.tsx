"use client"

import { PageStatus, TaskContext } from "@/contexts/context"
import { useState } from "react"

export const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageStatus, setPageStatus] = useState<PageStatus>("normal");

  return (
    <TaskContext.Provider value={{ pageStatus, setPageStatus }}>
      {children}
    </TaskContext.Provider>
  )
}