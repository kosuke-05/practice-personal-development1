"use client"

export const getApi = async () => {
  const res = await fetch("/api/tasks", {
    method: "GET"
  });

  if(!res.ok) {
    throw new Error("取得処理に失敗しました。");
  }

  return res.json();
};