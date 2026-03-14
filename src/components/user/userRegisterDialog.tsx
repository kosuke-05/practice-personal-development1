"use client"

import { DepartmentName, DepartmentNameType } from "@/constants/tableConstants";
import { userRegisterSchema } from "@/schemas/user/userValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { SubmitButton } from "../buttons";
import { postUserHooks } from "@/hooks/user/postUserHooks";

/**
 * ユーザー新規登録のダイアログ
 * ①ログイン時も使いまわす
 */
type UserRegisterDialogType = {
  openUserDialog: boolean,
  setOpenUserDialog: Dispatch<SetStateAction<boolean>>
};

// スキーマとの同期
export type UserValidationType = z.infer<typeof userRegisterSchema>;

export const UserRegisterDialog = ({
  openUserDialog,
  setOpenUserDialog
}: UserRegisterDialogType) => {
  // RHF
  const userMethods = useForm<UserValidationType>({
    mode: "onChange",
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      employeeName: "",
      departmentName: "",
      mailAddress: "",
      password: ""
    }
  });

  // hooksの呼び出し
  const userHook = postUserHooks();

  // ユーザー登録ダイアログの初期値
  const UserInitial: UserValidationType = {
    employeeName: "",
    departmentName: "",
    mailAddress: "",
    password: ""
  };

  /**
   * 新規登録を入力し、登録ボタン押下後の処理
   * ①hooks層を呼び出す（API通信が開始）
   *
   * --- 仮サーバーへの登録完了後 ---
   * ①ダイアログを閉じる
   * ②フォームを初期化
   *
   * --- ログインしたいとき ---
   * ①社員名・部署名・メールアドレス・パスワードを入力
   * ②仮サーバーが管理しているデータと照合とる
   * ③合致したらログイン成功
   */
  const registerStart = (data: UserValidationType) => {
    console.log("テスト");
    userHook.mutate(data);

    completeRegister();
  };

  const completeRegister = () => {
    setOpenUserDialog(false);
    userMethods.reset(UserInitial);
  };

  return (
    <Dialog
      component="form"
      open={openUserDialog}
      onClose={() => setOpenUserDialog(false)}
      onSubmit={userMethods.handleSubmit(registerStart)}
      sx={{
        p: 2
      }}>
      <DialogTitle>新規登録</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={1}>
          {/** 社員名 */}
          <Controller
            name="employeeName"
            control={userMethods.control}
            render={({field, fieldState}) => (
              <TextField
                {...field}
                label="社員名"
                placeholder="山田太郎"
                error={fieldState.invalid}
                helperText={fieldState.error?.message} />
            )} />

          {/** 部署名 */}
          <Controller
            name="departmentName"
            control={userMethods.control}
            render={({field, fieldState}) => (
              <FormControl
                error={fieldState.invalid}>
                <InputLabel>部署名</InputLabel>
                <Select
                  {...field}
                  displayEmpty>
                  <MenuItem value="">
                    <em>以下いずれかを選択して下さい</em>
                  </MenuItem>
                  {Object.entries(DepartmentName).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )} />

          {/** メールアドレス */}
          <Controller
            name="mailAddress"
            control={userMethods.control}
            render={({field, fieldState}) => (
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
            control={userMethods.control}
            render={({field, fieldState}) => (
              <TextField
                {...field}
                label="パスワード"
                placeholder="数字・小文字・大文字必須"
                error={fieldState.invalid}
                helperText={fieldState.error?.message} />
            )} />
          <SubmitButton />
        </Stack>
      </DialogContent>
    </Dialog>
  )
};