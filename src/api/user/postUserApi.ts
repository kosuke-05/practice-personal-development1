"use client"

import ErrorHandling from "../errorHandling";
import { ApiError } from "../apiError";
import { UserValidationType } from "@/types/user/userRegisterDialogType";

export const postUserApi = async (data: UserValidationType) => {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify(data)
  });

  if(!res.ok) {
    throw new ApiError(res.status, ErrorHandling(res.status));
  };

  return res.json();
};