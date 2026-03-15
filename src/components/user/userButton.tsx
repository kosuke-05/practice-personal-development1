"use client"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Dispatch, SetStateAction } from "react";
import { UserCreateOrLogin } from "../topPage";

/**
 * AppBar上に配置
 * ①当ファイルはあくまでボタンの実装ファイル
 * →　ボタン押下後の処理等は責務分離の関係でappBar内に定義する
 */
type UserButtonType = {
  handleCreateUser: () => void,
  handleLogin: () => void
};

export const UserButton = ({
  handleCreateUser,
  handleLogin
}: UserButtonType) => {

  return (
    <Box component="div">
      <Stack direction="row" spacing={1}>
        <Button
          variant="text"
          sx={{ color: "white" }}
          onClick={handleCreateUser}>
          新規登録
        </Button>
        <Button
          variant="text"
          sx={{ color: "white" }}
          onClick={handleLogin}>
          ログイン
        </Button>
        <Button variant="text" sx={{ color: "white" }}>ログアウト</Button>
      </Stack>
    </Box>
  )
};