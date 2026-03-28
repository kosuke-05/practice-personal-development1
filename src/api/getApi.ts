"use client"

import { ApiError } from "./apiError";
import ErrorHandling from "./errorHandling";

export const getApi = async () => {
  const res = await fetch("/api/tasks", {
    method: "GET"
  });

  if(!res.ok) {
    throw new ApiError(res.status, ErrorHandling(res.status))
  }

  return res.json();
};