"use client"

import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod"
import { schemas } from "@/schemas/inputValidations";
import { zodResolver } from "@hookform/resolvers/zod";

// スキーマとの連携
type InputTask = z.infer<typeof schemas>;

// 上記の型にidを追加
type InputTaskType = InputTask & {
  id: string
};

export const CreateTask = () => {
  // RHFと連携
  const methods = useForm<InputTask>({
    mode: "onChange",
    resolver: zodResolver(schemas),
    defaultValues: {
      taskName: "",
      taskDescription: "",
      taskStatus: "",
      taskPriority: "",
      dueDate: ""
    }
  });

  return (
    
  )
}