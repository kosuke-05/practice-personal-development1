"use client"

import { TableComponent } from "./table";
import { useState } from "react";
import { searchGetHooks } from "@/hooks/search/searchHooks";
import { AppBarComponent, SearchType } from "./appbar";
import { UserRegisterDialog } from "./user/userRegisterDialog";

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

  // ユーザー新規登録ダイアログの状態管理
  const [openUserDialog, setOpenUserDialog] = useState<boolean>(false);

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

  /**
   * 新規登録ボタン押下後の処理
   * ①新規登録ダイアログを表示
   * ②ダイアログ上で社員名・部署名・メールアドレス・パスワードを入力
   * ③②の情報をAPI通信でmswに登録
   * ④完了後、ダイアログを閉じる
   * ⑥【ログイン】の文言をユーザー名に変更（登録完了に伴い自動ログインしている状態）
   */

  
  return (
    <>
      {/** テーブル */}
      <TableComponent
        tasks={tasks} />

      {/** AppBar */}
      <AppBarComponent
        matchData={matchData}
        setMatchData={setMatchData}
        handleSearch={handleSearch}
        setOpenUserDialog={setOpenUserDialog} />

      {/** 新規登録ダイアログ */}
      <UserRegisterDialog
        openUserDialog={openUserDialog}
        setOpenUserDialog={setOpenUserDialog} />
    </>
  )
};