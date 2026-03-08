"use client"

import { InputTask, InputTaskType } from "@/components/createTask"

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

  return res.json();
};