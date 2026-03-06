"use client"

// 日本語表記に変換するラベル
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

export type TaskStatusType = keyof typeof TaskStatus;
export type TaskPriorityType = keyof typeof TaskPriority;
