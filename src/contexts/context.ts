"use client"

import { createContext } from "react"

// 登録・編集のステータス切り替え
export type PageStatus = "create" | "edit" | "normal";

// コンテキストの作成
type ContextType = {
  pageStatus: PageStatus,
  setPageStatus: (status: PageStatus) => void
};

export const TaskContext = createContext<ContextType | null>(null);