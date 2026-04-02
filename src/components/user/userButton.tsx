"use client"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useStore } from "@/store/useStore";
import Typography from "@mui/material/Typography";
import { UserButtonType } from "@/types/buttons/user/userButtonType";

/**
 * AppBar上に配置
 * ①当ファイルはあくまでボタンの実装ファイル
 * →　ボタン押下後の処理等は責務分離の関係でappBar内に定義する
 */
export const UserButton = ({
  handleCreateUser,
  handleLogin,
  setOpenUserLogoutDialog
}: UserButtonType) => {
  // ストアから取得
  const loginData = useStore((state) => state.loginData);
  const authStatus = useStore((state) => state.authStatus);

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
          disabled={authStatus === "registered" || authStatus === "loggedIn"}
          sx={{ color: "white" }}
          onClick={handleCreateUser}>
          新規登録
        </Button>
        {authStatus === "loggedIn"
          ? (
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold"
            }}>{loginData?.employeeName} さん</Typography>
          )
          : (
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={handleLogin}
              disabled={authStatus === "guest"}>
              ログイン
            </Button>
          )
        }
        <Button
          variant="text"
          disabled={authStatus === "guest" || authStatus === "registered"}
          sx={{ color: "white" }}
          onClick={() => setOpenUserLogoutDialog(true)}>ログアウト</Button>
      </Stack>
    </Box>
  )
};

// ユーザーの新規登録ボタン
export const UserRegisterButton = () => {

  return (
    <Button
      type="submit"
      variant="contained">
      新規登録
    </Button>
  )
};

// ユーザーログインボタン
export const UserLoginButton = () => {

  return (
    <Button
      type="submit"
      variant="contained">
      ログイン
    </Button>
  )
};