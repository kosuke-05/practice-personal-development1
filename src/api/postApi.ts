"use client"

import { InputTask } from "@/components/createTask"

export const createApi = async (input: InputTask) => {
  // API通信
  const res = await fetch("/api/task", {
    method: "POST",
    headers: { "Content-Type" : "application/json"},
    body: JSON.stringify(input)
  });

  // API通信が失敗
  if(!res.ok) {
    throw new Error("登録処理に失敗しました。");
  }

  return res.json();
};