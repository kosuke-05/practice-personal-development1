"use client"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { useState } from "react";
import { SearchTextField } from "./search/searchTextForm";
import { SearchSelectBox } from "./search/searchSelectBox";
import { keyof } from "zod";
import { DepartmentName, DepartmentNameType } from "@/constants/tableConstants";
import Stack from "@mui/material/Stack";
import { SearchButton } from "./buttons";
import { searchGetHooks } from "@/hooks/search/searchHooks";

// AppBar
export type SearchType = {
  employeeName: string,
  departmentName: DepartmentNameType | ""
};

export const AppBarComponent = () => {
  // 検索フォームへの入力情報を管理
  const [matchData, setMatchData] = useState<SearchType>({
    employeeName: "",
    departmentName: ""
  });

  // hooksの呼び出し
  const { data, refetch } = searchGetHooks(matchData.employeeName, matchData.departmentName);

  /**
   * 検索ボタン押下後の処理
   * ①state値をgetHookに渡す
   */
  const handleSearch = () => {
    refetch();
  }

  return (
    <AppBar
      position="fixed">
      <Toolbar>
        <Stack direction="row" spacing={1}>
          <SearchTextField
            matchData={matchData}
            setMatchData={setMatchData} />
          <SearchSelectBox
            matchData={matchData}
            setMatchData={setMatchData} />
          <SearchButton onClick={handleSearch} />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}