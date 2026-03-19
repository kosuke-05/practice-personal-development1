"use client"

import { UserValidationType } from "@/components/user/userRegisterDialog"

export type DetailType = Omit<UserValidationType, "mailAddress" | "password">;