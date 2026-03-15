"use client"

import { TaskContext } from "@/contexts/context"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useContext } from "react"
import { useFormContext } from "react-hook-form"
import { InputTaskType } from "./createTask"
import { UserCreateOrLogin } from "./topPage"

// フォーム入力後の送信ボタン
type SubmitButtonType = {
  userStatus: UserCreateOrLogin | ""
};

export const SubmitButton = ({
  userStatus
}: SubmitButtonType) => {

  return (
    <Button
      variant="contained"
      type="submit">
      {userStatus === "userCreate" ? "登録" : "ログイン"}
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

// 削除ボタン
type DeleteButtonType = {
  onClick: () => void
};

export const DeleteButton = ({
  onClick
}: DeleteButtonType) => {

  return (
    <Button
      variant="contained"
      onClick={onClick}>
      削除
    </Button>
  )
};

// 削除【はい】ボタン
type DeleteYesButtonType = {
  onClick: () => void
};

export const DeleteYesButton = ({
  onClick
}: DeleteYesButtonType) => {

  return (
    <Button
      variant="contained"
      onClick={onClick}>
      はい
    </Button>
  )
};

// 削除【いいえ】ボタン
type DeleteNoButtonType = {
  onClick: () => void
};

export const DeleteNoButton = ({
  onClick
}: DeleteNoButtonType) => {

  return (
    <Button
      variant="contained"
      onClick={onClick}>
      いいえ
    </Button>
  )
};

// 検索ボタン
type SearchButtonType = {
  onClick: () => void
};

export const SearchButton = ({
  onClick
}: SearchButtonType) => {

  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        bgcolor: "#fafafa",
        color: "#212121"
      }}>
      検索
    </Button>
  )
}