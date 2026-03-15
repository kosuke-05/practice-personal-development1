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
import { UserCreateOrLogin } from "./topPage";

// AppBar
export type SearchType = {
  employeeName: string,
  departmentName: DepartmentNameType | ""
};

type AppBarType = {
  matchData: SearchType,
  setMatchData: Dispatch<SetStateAction<SearchType>>,
  handleSearch: () => void,
  setOpenUserDialog: Dispatch<SetStateAction<boolean>>,
  setUserStatus: Dispatch<SetStateAction<UserCreateOrLogin | "">>,
  setOpenUserLoginDialog: Dispatch<SetStateAction<boolean>>
};

export const AppBarComponent = ({
  matchData,
  setMatchData,
  handleSearch,
  setOpenUserDialog,
  setUserStatus,
  setOpenUserLoginDialog
}: AppBarType) => {
  /**
   * 新規登録ボタン押下後の処理
   * ①ステータスをuserCreateに更新
   * ②新規登録ダイアログを開く
   */
  const handleCreateUser = () => {
    setUserStatus("userCreate");
    setOpenUserDialog(true);
  };

  /**
   * ログインボタン押下後の処理
   * ①ステータスをuserLoginに更新
   * ②ログインダイアログを開く
   */
  const handleLogin = () => {
    setUserStatus("userLogin");
    setOpenUserLoginDialog(true);
  };

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
          handleCreateUser={handleCreateUser}
          handleLogin={handleLogin} />
      </Toolbar>
    </AppBar>
  )
};