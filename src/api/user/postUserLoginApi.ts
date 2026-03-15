"use client"

import { LoginType, UserValidationType } from "@/components/user/userRegisterDialog"

export const postUserLoginApi = 
  async (data: LoginType) => {
    console.log("ログイン：api");
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(data)
  });

  if(!res.ok) {
    throw new Error("ログイン処理に失敗しました。")
  }

  return res.json();
};