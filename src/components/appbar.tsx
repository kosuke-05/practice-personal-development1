"use client"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { Dispatch, SetStateAction, useState } from "react";
import { SearchTextField } from "./search/searchTextForm";
import { SearchSelectBox } from "./search/searchSelectBox";
import { keyof } from "zod";
import { DepartmentName, DepartmentNameType } from "@/constants/tableConstants";
import Stack from "@mui/material/Stack";
import { SearchButton } from "./buttons";
import { searchGetHooks } from "@/hooks/search/searchHooks";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { UserButton } from "./user/userButton";

// AppBar
export type SearchType = {
  employeeName: string,
  departmentName: DepartmentNameType | ""
};

type AppBarType = {
  matchData: SearchType,
  setMatchData: Dispatch<SetStateAction<SearchType>>,
  handleSearch: () => void
};

export const AppBarComponent = ({
  matchData,
  setMatchData,
  handleSearch
}: AppBarType) => {
  /**
   * 新規登録ボタン押下後の処理
   * ①新規登録ダイアログを表示
   * ②ダイアログ上でメールアドレス・パスワードを入力
   * ③②の情報をAPI通信でmswに登録
   * ④完了後、ダイアログを閉じる
   * ⑥【ログイン】の文言をユーザー名に変更（登録完了に伴い自動ログインしている状態）
   */
  const handleUserCreate = () => {

  }


  return (
    <AppBar
      position="fixed">
      <Toolbar
        sx={{justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1}>
          <SearchTextField
            matchData={matchData}
            setMatchData={setMatchData} />
          <SearchSelectBox
            matchData={matchData}
            setMatchData={setMatchData} />
          <SearchButton onClick={handleSearch} />
        </Stack>
        <UserButton
          handleUserCreate={handleUserCreate} />
      </Toolbar>
    </AppBar>
  )
}