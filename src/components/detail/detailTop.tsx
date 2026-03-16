"use client"

import { useStore } from "@/store/useStore";
import { DetailTable } from "./detailTable";

// タスク詳細画面のトップ
export const DetailTopComponent = () => {
  // ストアから取得
  const loginData = useStore((state) => state.loginData);

  /**
   * ①ストアから取得したデータをhooksに渡す（社員名・部署名のみ）
   * →hooksは新規登録する必要あり
   * ②API通信で社員名・部署名で完全合致したデータを取得
   * ③useQuery()で取得したdataをpropsで詳細テーブルに渡す
   */

  return (
    <>
      {/** タスク詳細を表示するテーブル */}
      <DetailTable />
    </>
  )
};