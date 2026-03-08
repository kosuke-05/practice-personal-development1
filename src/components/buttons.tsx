"use client"

import { TaskContext } from "@/contexts/context"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { InputTaskType } from "./createTask"

// フォーム入力後の送信ボタン
export const SubmitButton = () => {

  return (
    <Button
      variant="contained"
      type="submit">
      登録
    </Button>
  )
}

// 編集ボタン
type EditButtonType = {
  item: InputTaskType,
  handleEdit: (item: InputTaskType) => void
};

export const EditButton = (
  {
    item,
    handleEdit
  }: EditButtonType
) => {

  return (
    <Button
      variant="contained"
      onClick={() => handleEdit(item)}>
      編集
    </Button>
  )
}