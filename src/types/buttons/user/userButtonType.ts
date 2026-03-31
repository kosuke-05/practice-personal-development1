"use client"

import { UserCreateOrLogin } from "@/types/home/homeType";
import { Dispatch, SetStateAction } from "react";

export type UserButtonType = {
  handleCreateUser: () => void,
  handleLogin: () => void,
  setOpenUserLogoutDialog: Dispatch<SetStateAction<boolean>>
};

export type UserRegisterOrLoginButtonType = {
  userStatus: UserCreateOrLogin | ""
};

export type SubmitButtonType = {
  userStatus: UserCreateOrLogin | ""
};