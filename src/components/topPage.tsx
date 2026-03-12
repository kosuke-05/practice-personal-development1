"use client"

import { TableComponent } from "./table";
import { useState } from "react";
import { searchGetHooks } from "@/hooks/search/searchHooks";
import { AppBarComponent, SearchType } from "./appBar";

/**
 * 一覧画面
 * ①AppBarとテーブルを描画するコンポーネントを読み込む
 */
export const TopPage = () => {
  /**
   * 検索フォームへの入力情報を管理
   * ①AppBar側でstate管理すると、取得データをテーブル側に渡せないためここに定義
   */
  const [matchData, setMatchData] = useState<SearchType>({
    employeeName: "",
    departmentName: ""
  });

  // 検索用のhooksを呼び出す
  const { data: tasks, refetch } = searchGetHooks(
    matchData.employeeName,
    matchData.departmentName
  );

  /**
   * 検索ボタン押下後の処理
   * ①state値をgetHookに渡す
   * ②検索完了後、stateを初期化
   */
  const handleSearch = () => {
    refetch();
    // setMatchData({
    //   employeeName: "",
    //   departmentName: ""
    // })
  };

  return (
    <>
      {/** テーブル */}
      <TableComponent
        tasks={tasks} />

      {/** AppBar */}
      <AppBarComponent
        matchData={matchData}
        setMatchData={setMatchData}
        handleSearch={handleSearch} />
    </>
  )
};