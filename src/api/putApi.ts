"use client"

import { ApiError } from "./apiError";
import ErrorHandling from "./errorHandling";
import { InputTask } from "@/types/create/createType";

export const putApi = async (
  {
    id,
    input}: {
    id: string,
    input: InputTask
  }) => {
  const res = await fetch(`/api/task/${id}`, {
    method: "PUT",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify(input)
  });

  if(!res.ok) {
    throw new ApiError(res.status, ErrorHandling(res.status));
  }

  return res.json();
};