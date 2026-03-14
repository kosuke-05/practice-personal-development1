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
  handleSearch: () => void,
  setOpenUserDialog: Dispatch<SetStateAction<boolean>>
};

export const AppBarComponent = ({
  matchData,
  setMatchData,
  handleSearch,
  setOpenUserDialog
}: AppBarType) => {


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
          setOpenUserDialog={setOpenUserDialog} />
      </Toolbar>
    </AppBar>
  )
}