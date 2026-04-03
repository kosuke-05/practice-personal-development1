"use client"

import { Dispatch, SetStateAction } from "react";
import { InputTaskType } from "./create/createType";
import { PaginationType } from "./pagination/paginationType";

// 日本語表記に変換するラベル
export const DepartmentName = {
  sales: "営業部",
  development: "開発部",
  accounting: "経理部",
  generalAffairs: "総務部"
} as const;

export const TaskStatus = {
  notStarted: "未着手",
  inProgress: "進行中",
  done: "完了"
} as const;

export const TaskPriority = {
  low: "低",
  middle: "中",
  high: "高"
} as const;

export type DepartmentNameType = keyof typeof DepartmentName;
export type TaskStatusType = keyof typeof TaskStatus;
export type TaskPriorityType = keyof typeof TaskPriority;

export type TableType = {
  tasks: InputTaskType[] | undefined,
  pageNumber: number,
  setPageNumber: Dispatch<SetStateAction<number>>,
  totalPage: number,
  taskPerPage: number,
  paginatedData: PaginationType | undefined
};
