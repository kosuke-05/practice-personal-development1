"use client"

import { UserCreateOrLogin } from "@/components/topPage"
import { Dispatch, SetStateAction } from "react"
import { DepartmentNameType } from "../table";

// AppBarに関する型宣言
export type SearchType = {
  employeeName: string,
  departmentName: DepartmentNameType | ""
};

// AppBarを呼び出す際に必要なprops
export type PropsType = {
  matchData: SearchType,
  setMatchData: Dispatch<SetStateAction<SearchType>>,
  handleSearch: () => void,
  setOpenUserDialog: Dispatch<SetStateAction<boolean>>,
  setUserStatus: Dispatch<SetStateAction<UserCreateOrLogin | "">>,
  setOpenUserLoginDialog: Dispatch<SetStateAction<boolean>>,
  setOpenUserLogoutDialog: Dispatch<SetStateAction<boolean>>
};