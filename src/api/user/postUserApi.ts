"use client"

import { UserValidationType } from "@/components/user/userRegisterDialog"

export const postUserApi = async (data: UserValidationType) => {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify(data)
  });

  if(!res.ok) {
    throw new Error("登録処理に失敗しました。")
  };

  return res.json();
};