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
import Typography from "@mui/material/Typography";
import { useStore } from "@/store/useStore";
import { postHooks } from "@/hooks/postHooks";

// スキーマとの連携
export type InputTask = z.infer<typeof schemas>;

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

  // フォームの初期値
  const initialForm: InputTask = {
    taskName: "",
    taskDescription: "",
    taskStatus: "",
    taskPriority: "",
    dueDate: ""
  };

  // ストアから取得
  const { pageStatus } = useStore();

  // postHooksの呼び出し
  const post = postHooks();

  /**
   * 登録処理
   * ①postHooksを呼び出す
   * ②登録データをmutateに渡す
   * ③登録完了後、フォームを初期化する
   */
  const submit = (data: InputTask) => {
    post.mutate(data);
    methods.reset(initialForm);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <Box
          sx={{
            width: 500,
            p: 2
          }}>
          <Stack direction="column" spacing={1}>
            <Typography variant="h5">{pageStatus}画面</Typography>
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
                {value: "notStarted", name: "未着手"},
                {value: "inProgress", name: "進行中"},
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
            <Stack direction="row" spacing={2}>
              <InputForm<InputTask>
                name="employeeName"
                label="社員名"
                placeholder="営業太郎" />
              <SelectBox<InputTask>
                name="departmentName"
                label="部署名"
                array={[
                  {value: "sales", name: "営業部"},
                  {value: "development", name: "開発部"},
                  {value: "accounting", name: "経理部"},
                  {value: "generalAffairs", name: "総務部"}
                ]} />
            </Stack>
            <SubmitButton />
          </Stack>
        </Box>
      </form>
    </FormProvider>
  )
}