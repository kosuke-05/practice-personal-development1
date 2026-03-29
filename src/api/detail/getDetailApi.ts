"use client"

import { DetailType } from "@/types/detail/detailConstants";
import { ApiError } from "../apiError";
import ErrorHandling from "../errorHandling";

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
    throw new ApiError(res.status, ErrorHandling(res.status));
  }

  return res.json();
};