"use client"

import { UserCreateOrLogin } from "@/types/home/homeType";
import { UserValidationType } from "@/types/user/userRegisterDialogType";
import { Dispatch, SetStateAction } from "react";
import { AuthStatusType } from "./userButtonType";

export type UserLoginDialogType = {
  userStatus: UserCreateOrLogin | "",
  setUserStatus: Dispatch<SetStateAction<UserCreateOrLogin | "">>,
  openUserLoginDialog: boolean,
  setOpenUserLoginDialog: Dispatch<SetStateAction<boolean>>,
  toggleDialog: () => void
};
