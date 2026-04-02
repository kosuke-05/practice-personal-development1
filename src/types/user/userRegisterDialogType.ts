"use client"

import { Dispatch, SetStateAction } from "react";
import { UserCreateOrLogin } from "../home/homeType";
import { userRegisterSchema } from "@/schemas/user/userValidations";
import z from "zod";
import { AuthStatusType } from "../buttons/user/userButtonType";

export type UserRegisterDialogType = {
  openUserDialog: boolean,
  setOpenUserDialog: Dispatch<SetStateAction<boolean>>,
  userStatus: UserCreateOrLogin | ""
};

// スキーマとの同期
export type UserValidationType = z.infer<typeof userRegisterSchema>;

// ログイン情報
export type LoginType = Omit<UserValidationType, "employeeName" | "departmentName">;


