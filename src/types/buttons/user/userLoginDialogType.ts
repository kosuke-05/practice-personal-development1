"use client"

import { UserCreateOrLogin } from "@/types/home/homeType";
import { Dispatch, SetStateAction } from "react";

export type UserLoginDialogType = {
  userStatus: UserCreateOrLogin | "",
  setUserStatus: Dispatch<SetStateAction<UserCreateOrLogin | "">>,
  openUserLoginDialog: boolean,
  setOpenUserLoginDialog: Dispatch<SetStateAction<boolean>>,
  toggleDialog: () => void
};
