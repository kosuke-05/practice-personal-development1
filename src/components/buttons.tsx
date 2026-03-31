"use client"

import { DeleteButtonType, DeleteNoButtonType, DeleteYesButtonType, EditButtonType, SearchButtonType } from "@/types/buttons/buttonsType";
import { SubmitButtonType } from "@/types/buttons/user/userButtonType";
import Button from "@mui/material/Button"

// フォーム入力後の送信ボタン
export const SubmitButton = ({
  userStatus
}: SubmitButtonType) => {

  return (
    <Button
      variant="contained"
      type="submit">
      登録
    </Button>
  )
}

// 編集ボタン
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
export const DeleteButton = ({
  id,
  deleteStart
}: DeleteButtonType) => {

  return (
    <Button
      variant="contained"
      onClick={() => deleteStart(id)}>
      削除
    </Button>
  )
};

// 削除【はい】ボタン
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
};