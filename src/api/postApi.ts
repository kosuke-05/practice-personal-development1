"use client"

import { InputTask } from "@/types/create/createType";
import { ApiError } from "./apiError";
import ErrorHandling from "./errorHandling";

export const postApi = async (input: InputTask) => {
  // API通信
  const res = await fetch("/api/task", {
    method: "POST",
    headers: { "Content-Type" : "application/json"},
    body: JSON.stringify(input)
  });

  // API通信が失敗
  if(!res.ok) {
    throw new ApiError(res.status, ErrorHandling(res.status));
  }

  return res.json();
};