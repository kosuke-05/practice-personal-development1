"use client"

import { DetailType } from "@/constants/detail/detailConstants";

export const getDetailApi = async (
  {
    employeeName,
    departmentName
  }: DetailType
) => {
  // クエリパラメーター作成
  const params = new URLSearchParams();

  if(employeeName) params.append("employeeName", employeeName);
  if(departmentName) params.append("departmentName", departmentName);

  const res = await fetch(`/api/detail/?${params}`);

  if(!res.ok) {
    throw new Error("詳細情報の取得に失敗しました。")
  }

  return res.json();
};