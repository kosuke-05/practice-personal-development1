"use client"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Dispatch, SetStateAction } from "react";
import { UserCreateOrLogin } from "../topPage";
import { useStore } from "@/store/useStore";
import Typography from "@mui/material/Typography";

/**
 * AppBar上に配置
 * ①当ファイルはあくまでボタンの実装ファイル
 * →　ボタン押下後の処理等は責務分離の関係でappBar内に定義する
 */
type UserButtonType = {
  handleCreateUser: () => void,
  handleLogin: () => void,
  setOpenUserLogoutDialog: Dispatch<SetStateAction<boolean>>
};

export const UserButton = ({
  handleCreateUser,
  handleLogin,
  setOpenUserLogoutDialog
}: UserButtonType) => {
  // ストアから取得
  const loginData = useStore((state) => state.loginData);

  return (
    <Box component="div">
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center"
        }}>
        <Button
          variant="text"
          disabled={!!loginData}
          sx={{ color: "white" }}
          onClick={handleCreateUser}>
          新規登録
        </Button>
        {loginData 
          ? (
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold"
            }}>{loginData.employeeName} さん</Typography>
          )
          : (
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={handleLogin}>
              ログイン
            </Button>
          )
        }
        <Button
          variant="text"
          disabled={!loginData}
          sx={{ color: "white" }}
          onClick={() => setOpenUserLogoutDialog(true)}>ログアウト</Button>
      </Stack>
    </Box>
  )
};

// ユーザーの新規登録ダイアログ内で配置するボタン
type UserRegisterOrLoginButtonType = {
  userStatus: UserCreateOrLogin | ""
};

export const UserRegisterOrLoginButton = ({
  userStatus
}: UserRegisterOrLoginButtonType) => {

  return (
    <Button
      type="submit"
      variant="contained">
      {userStatus === "userCreate" ? "登録" : "ログイン"}
    </Button>
  )
};