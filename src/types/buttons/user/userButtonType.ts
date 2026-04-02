"use client"

import { UserCreateOrLogin } from "@/types/home/homeType";
import { UserValidationType } from "@/types/user/userRegisterDialogType";
import { Dispatch, SetStateAction } from "react";

export type UserButtonType = {
  handleCreateUser: () => void,
  handleLogin: () => void,
  setOpenUserLogoutDialog: Dispatch<SetStateAction<boolean>>
};

export type SubmitButtonType = {
  userStatus: UserCreateOrLogin | "",
  loginData: UserValidationType | null
};

export type AuthStatusType = "guest" | "registered" | "loggedIn";