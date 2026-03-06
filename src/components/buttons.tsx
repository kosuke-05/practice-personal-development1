"use client"

import { TaskContext } from "@/contexts/context"
import Button from "@mui/material/Button"
import { useContext } from "react"

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
  // コンテキストから取得
  const context = useContext(TaskContext);
  if(!context) return;

  /**
   * 編集ボタン押下後の処理
   * ①ページステータスをeditに更新
   * ②データを特定できるようにid番号を管理する必要がある
   * →ストアに定義？
   * ③stateにidを渡す
   * →テーブル内で渡すのが望ましい？
   * ④編集処理
   * ⑤API通信
   * ⑥MSWで登録して、GET処理で編集内容を表示
   */
  const editStart = () => {
    context.setPageStatus("edit");
  }

  return (
    <Button
      variant="contained">
      編集
    </Button>
  )
}