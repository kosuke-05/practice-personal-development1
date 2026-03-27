"use client"

import { InputTaskType } from "@/components/createTask"

export type PaginationType = {
  data: InputTaskType[],
  total: number
};