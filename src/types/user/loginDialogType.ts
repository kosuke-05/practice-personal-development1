"use client"

import { userLoginSchema } from "@/schemas/user/userLoginValidations";
import z from "zod";

// スキーマとの連携
export type LoginDialogType = z.infer<typeof userLoginSchema>;