"use client"

import { InputTaskType } from "../create/createType";

export type PaginationType = {
  data: InputTaskType[],
  total: number
};