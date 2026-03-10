"use client"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { useState } from "react";
import { SearchTextField } from "./searchTextForm";
import { SearchSelectBox } from "./searchSelectBox";
import { keyof } from "zod";
import { DepartmentName, DepartmentNameType } from "@/constants/tableConstants";
import Stack from "@mui/material/Stack";
import { SearchButton } from "./buttons";

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
          <SearchButton />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}