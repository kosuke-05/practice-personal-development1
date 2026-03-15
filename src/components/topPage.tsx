"use client"

import { TableComponent } from "./table";
import { useState } from "react";
import { searchGetHooks } from "@/hooks/search/searchHooks";
import { AppBarComponent, SearchType } from "./appbar";
import { UserRegisterDialog } from "./user/userRegisterDialog";
import { UserLoginDialog } from "./user/userLoginDialog";

/**
 * 一覧画面
 * ①AppBarとテーブルを描画するコンポーネントを読み込む
 */
export type UserCreateOrLogin = "userCreate" | "userLogin";

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

  // 新規登録・ログインの分岐
  const [userStatus, setUserStatus] = useState<UserCreateOrLogin | "">("");

  // ログインダイアログの開閉状態
  const [openUserLoginDialog, setOpenUserLoginDialog] = useState<boolean>(false);

  /**
   * 検索ボタン押下後の処理
   * ①state値をgetHookに渡す
   * ②検索完了後、stateを初期化
   */
  const handleSearch = () => {
    refetch();
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
        handleSearch={handleSearch}
        setOpenUserDialog={setOpenUserDialog}
        setUserStatus={setUserStatus}
        setOpenUserLoginDialog={setOpenUserLoginDialog} />

      {/** 新規登録ダイアログ */}
      <UserRegisterDialog
        openUserDialog={openUserDialog}
        setOpenUserDialog={setOpenUserDialog}
        userStatus={userStatus}
        setUserStatus={setUserStatus} />

      {/** ログインダイアログ */}
      <UserLoginDialog
        userStatus={userStatus}
        openUserLoginDialog={openUserLoginDialog}
        setOpenUserLoginDialog={setOpenUserLoginDialog} />
    </>
  )
};