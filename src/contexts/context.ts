"use client"

import { InputTaskType } from "@/components/createTask";
import { createContext } from "react"

// 登録・編集のステータス切り替え
export type PageStatus = "create" | "edit" | "detail" | "normal";

// コンテキストの作成
type ContextType = {
  // ページステータス
  pageStatus: PageStatus,
  setPageStatus: (status: PageStatus) => void,

  // 編集時に表示する対象データを管理
  editData: InputTaskType,
  setEditData: (data: InputTaskType) => void
};

export const TaskContext = createContext<ContextType | null>(null);