"use client"

import { Path } from "react-hook-form";

// セレクトボックス（共通化）
export type SelectBoxType<T> = {
  name: Path<T>,
  label: string,
  array: SelectType
};

type SelectType =
  | [
    { value: "notStarted", name: "未着手" },
    { value: "inProgress", name: "進行中" },
    { value: "done", name: "完了" }
  ]
  | [
    { value: "low", name: "低" },
    { value: "middle", name: "中" },
    { value: "high", name: "高" }
  ]
  | [
    { value: "sales", name: "営業部" },
    { value: "development", name: "開発部" },
    { value: "accounting", name: "経理部" },
    { value: "generalAffairs", name: "総務部" }
  ];