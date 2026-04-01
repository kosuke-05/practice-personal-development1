"use client"

import { FormProvider, useForm } from "react-hook-form";
import { schemas } from "@/schemas/inputValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "./textForm";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SelectBox } from "./selectBox";
import { TaskRegisterButton } from "./buttons";
import { InputDate } from "./textDateForm";
import Typography from "@mui/material/Typography";
import { useStore } from "@/store/useStore";
import { postHooks } from "@/hooks/postHooks";
import { useContext, useEffect } from "react";
import { TaskContext } from "@/contexts/context";
import { useRouter } from "next/navigation";
import { putHooks } from "@/hooks/putHooks";
import { ApiError } from "@/api/apiError";
import { ErrorDialog } from "./error/errorDialog";
import { InputTask } from "@/types/create/createType";

// タスクの新規登録・編集
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
      dueDate: "",
      employeeName: "",
      departmentName: ""
    }
  });

  // フォームの初期値
  const initialForm: InputTask = {
    taskName: "",
    taskDescription: "",
    taskStatus: "",
    taskPriority: "",
    dueDate: "",
    employeeName: "",
    departmentName: ""
  };

  // コンテキストから取得
  const context = useContext(TaskContext);
  if(!context) {
    throw new Error("コンテキストが見つかりません");
  }

  // hooksの呼び出し
  const post = postHooks();
  const put = putHooks();

  // ルーターの取得
  const router = useRouter();

  // ストアから取得
  const setErrorMessage = useStore((state) => state.setErrorMessage);
  const setOpenErrorDialog = useStore((state) => state.setOpenErrorDialog);
  const setErrorStatus = useStore((state) => state.setErrorStatus);

  // create, editによって、呼び出す関数を分岐する
  const submit = (data: InputTask) => {
    if(context.pageStatus === "create") postSubmit(data);
    if(context.pageStatus === "edit") putSubmit(data);
  };

  /**
   * 登録処理
   * ①postHooksを呼び出す
   * ②登録データをmutateに渡す
   * ③登録完了後、フォームを初期化する
   * ③トップ画面に遷移
   */
  const postSubmit = async (data: InputTask) => {
    try {
      await post.mutateAsync(data);
      methods.reset(initialForm);
      router.push("/");
      context.setPageStatus("normal");
    } catch(e) {
      if(e instanceof ApiError) {
        setErrorMessage(e.message);
        setOpenErrorDialog(true);
        setErrorStatus(e.status);
      }
    }
  };

  /**
   * 編集処理
   * ①putHooksを取得
   * ②コンテキストで管理しているidもhooks呼び出しの際に渡す
   * ③編集処理完了後、トップページに遷移
   * ④ページステータスをnormalに更新
   * ⑤フォーム内容もリセット
   */
  const putSubmit = async (data: InputTask) => {
    try {
      await put.mutateAsync(
      {
        id: context.editData.id,
        input: data
      });
      router.push("/");
      methods.reset(initialForm);
      context.setPageStatus("normal");
    } catch(e) {
      if(e instanceof ApiError) {
        setErrorMessage(e.message);
        setErrorStatus(e.status);
        setOpenErrorDialog(true);
      }
    }
  };

  // ラベル
  const PageStatusLabel = {
    create: "登録",
    edit: "編集",
    detail: "詳細",
    normal: "通常"
  };

  /**
   * 登録処理・編集処理の分岐
   * ①登録処理　→　フォームは初期値
   * ②編集処理　→　フォームは前回データを引き継ぐ
   */
  useEffect(() => {
    if(context.pageStatus === "create") {
      methods.reset(initialForm);
    }

    if(context.pageStatus === "edit") {
      methods.reset(context.editData);
    }
  }, [context.pageStatus]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>
          <Box
            sx={{
              width: 500,
              p: 2
            }}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h5">{PageStatusLabel[context.pageStatus]}画面</Typography>
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
                name="dueDate" />
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
              <TaskRegisterButton />
            </Stack>
          </Box>
        </form>
      </FormProvider>

      {/** エラーメッセージのダイアログ */}
      <ErrorDialog />
    </>
  )
}