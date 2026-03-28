"use client"

import { ApiError } from "./apiError";
import ErrorHandling from "./errorHandling";

// 削除API
export const deleteApi = async (id: string) => {
  const res = await fetch(`/api/task/${id}`, {
    method: "DELETE"
  });

  if(!res.ok) {
    throw new ApiError(res.status, ErrorHandling(res.status));
  }

  return null;
};