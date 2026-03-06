"use client"

import Button from "@mui/material/Button"

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
export const EditButton = () => {

  return (
    <Button
      variant="contained">
      編集
    </Button>
  )
}