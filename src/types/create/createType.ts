"use client"

import { schemas } from "@/schemas/inputValidations";
import z from "zod";

// スキーマとの連携
export type InputTask = z.infer<typeof schemas>;

// 上記の型にidを追加
export type InputTaskType = InputTask & {
  id: string
};