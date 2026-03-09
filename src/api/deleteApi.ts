"use client"

// 削除API
export const deleteApi = async (id: string) => {
  const res = await fetch(`/api/task/${id}`, {
    method: "DELETE"
  });

  if(!res.ok) {
    throw new Error("API通信に失敗しました");
  }

  return null;
};