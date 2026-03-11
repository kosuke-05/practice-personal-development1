"use client"

import { DepartmentNameType } from "@/constants/tableConstants"

// 検索用GETApi
export const searchGetApi = async (
  {
    employeeName,
    departmentName
  } : {
    employeeName: string,
    departmentName: DepartmentNameType | ""
  }
) => {
  // クエリパラメータの準備
  const params = new URLSearchParams();

  if(employeeName) params.append("employeeName", employeeName);
  if(departmentName) params.append("departmentName", departmentName);

  const res = await fetch(`/api/task?${params}`);

  if(!res.ok) throw new Error("GET処理に失敗しました。");

  return res.json();
};