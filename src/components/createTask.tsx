"use client"

import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod"
import { schemas } from "@/schemas/inputValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "./textForm";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SelectBox } from "./selectBox";
import { SubmitButton } from "./buttons";
import { InputDate } from "./textDateForm";

// スキーマとの連携
type InputTask = z.infer<typeof schemas>;

// 上記の型にidを追加
type InputTaskType = InputTask & {
  id: string
};

export const CreateTasks = () => {
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

  // 登録ボタン押下後の処理
  const submit = (data: InputTask) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <Box
          sx={{ width: 500 }}>
          <Stack direction="column" spacing={1}>
            <InputForm<InputTask>
              name="taskName"
              label="タスク名"
              placeholder="タスク名を入力して下さい" />
            <InputForm<InputTask>
              name="taskDescription"
              label="タスク説明欄"
              placeholder="任意" />
            <SelectBox<InputTask>
              name="taskStatus"
              label="進捗度"
              array={[
                {value: "not-started", name: "未着手"},
                {value: "in-progress", name: "進行中"},
                {value: "done", name: "完了"}
              ]} />
            <SelectBox<InputTask>
              name="taskPriority"
              label="優先度"
              array={[
                {value: "low", name: "低"},
                {value: "middle", name: "中"},
                {value: "high", name: "高"}
              ]} />
            <InputDate<InputTask>
              name="dueDate"
              label="提出期限" />
            <SubmitButton />
          </Stack>
        </Box>
      </form>
    </FormProvider>
  )
}