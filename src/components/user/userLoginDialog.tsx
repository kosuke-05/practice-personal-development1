"use client"

import { postUserLoginHooks } from "@/hooks/user/postUserLoginHooks";
import { userLoginSchema } from "@/schemas/user/userLoginValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { SubmitButton } from "../buttons";
import { UserCreateOrLogin } from "../topPage";
import { LoginType } from "./userRegisterDialog";
import Button from "@mui/material/Button";
import { useStore } from "@/store/useStore";

// ログインボタン押下後に表示するダイアログ
type UserLoginDialogType = {
  userStatus: UserCreateOrLogin | "",
  setOpenUserDialog: Dispatch<SetStateAction<boolean>>,
  openUserLoginDialog: boolean,
  setOpenUserLoginDialog: Dispatch<SetStateAction<boolean>>,
  toggleDialog: () => void
};

// スキーマとの連携
export type LoginDialogType = z.infer<typeof userLoginSchema>;

export const UserLoginDialog = ({
  userStatus,
  setOpenUserDialog,
  openUserLoginDialog,
  setOpenUserLoginDialog,
  toggleDialog
}: UserLoginDialogType) => {
  // RHFとの連携
  const loginMethods = useForm<LoginDialogType>({
    mode: "onChange",
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      mailAddress: "",
      password: ""
    }
  });

  // hooksの呼び出し
  const loginHook = postUserLoginHooks();

  // ログインフォームの初期値
  const LoginInitial: LoginType = {
    mailAddress: "",
    password: ""
  };

  /**
   * ログインボタン押下後の処理
   * ①loginHookに入力データを渡す
   * ②処理完了後、フォームを閉じる
   * ③処理完了後、フォームを初期化
   */
  const handleLogin = (data: LoginDialogType) => {
    loginHook.mutate(data);
    setOpenUserLoginDialog(false);
    loginMethods.reset(LoginInitial);
  };

  return (
    <Dialog
      component="form"
      open={openUserLoginDialog}
      onClose={() => setOpenUserLoginDialog(false)}
      onSubmit={loginMethods.handleSubmit(handleLogin)}
      sx={{
        p: 2
      }}>
      <DialogTitle>ログイン</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={1}>
          {/** メールアドレス */}
          <Controller
            name="mailAddress"
            control={loginMethods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="メールアドレス"
                placeholder="sample@gmail.com"
                error={fieldState.invalid}
                helperText={fieldState.error?.message} />
            )} />
          {/** パスワード */}
          <Controller
            name="password"
            control={loginMethods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="パスワード"
                placeholder="数字・小文字・大文字必須"
                error={fieldState.invalid}
                helperText={fieldState.error?.message} />
            )} />
          <SubmitButton
            userStatus={userStatus} />
          {userStatus === "userLogin" && (
            <Button
              variant="text"
              onClick={toggleDialog}>
              新規登録が完了していない方はこちら
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  )
};