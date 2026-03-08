"use client"

import { InputTaskType } from "@/components/createTask";
import { PageStatus, TaskContext } from "@/contexts/context"
import { useState } from "react"

export const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageStatus, setPageStatus] = useState<PageStatus>("normal");
  const [editData, setEditData] = useState<InputTaskType>({
    id: "",
    taskName: "",
    taskDescription: "",
    taskStatus: "",
    taskPriority: "",
    dueDate: "",
    employeeName: "",
    departmentName: ""
  });

  return (
    <TaskContext.Provider
      value={{ 
        pageStatus,
        setPageStatus,
        editData,
        setEditData
      }}>
      {children}
    </TaskContext.Provider>
  )
}