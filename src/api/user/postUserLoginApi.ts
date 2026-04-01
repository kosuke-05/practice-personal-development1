"use client"

import { LoginType } from "@/types/user/userRegisterDialogType";
import { ApiError } from "../apiError";
import ErrorHandling from "../errorHandling";

export const postUserLoginApi = 
  async (data: LoginType) => {
    console.log("ログイン：api");
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(data)
  });

  if(!res.ok) {
    throw new ApiError(res.status, ErrorHandling(res.status))
  }

  return res.json();
};