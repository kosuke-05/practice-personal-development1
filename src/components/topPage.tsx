"use client"

import { TableComponent } from "./table";
import { useState } from "react";
import { searchGetHooks } from "@/hooks/search/searchHooks";
import { AppBarComponent } from "./appbar";
import { UserRegisterDialog } from "./user/userRegisterDialog";
import { UserLoginDialog } from "./user/userLoginDialog";
import { UserLogoutDialog } from "./user/userLogoutDialog";
import { useStore } from "@/store/useStore";
import { SearchType } from "@/types/appBar/appBar";
import { paginationHooks } from "@/hooks/paginationHooks";
import { ErrorDialog } from "./error/errorDialog";
import { UserCreateOrLogin } from "@/types/home/homeType";

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

  // 新規登録・ログインの分岐
  const [userStatus, setUserStatus] = useState<UserCreateOrLogin | "">("");

  // ログインダイアログの開閉状態
  const [openUserLoginDialog, setOpenUserLoginDialog] = useState<boolean>(false);

  // ログアウトダイアログの開閉状態
  const [openUserLogoutDialog, setOpenUserLogoutDialog] = useState<boolean>(false);

  // トップ画面内のページネーション
  const [pageNumber, setPageNumber] = useState<number>(1);

  // 全部で何ページまで表示するかを指定
  const totalPage = 5;

  // 1ページにつき何件表示するか
  const taskPerPage = 5;

  // ストアから取得
  const deleteLoginData = useStore((state) => state.deleteLoginData);

  // ページネーションhooksを取得
  const { data: paginatedData } = paginationHooks({
    pageNumber: pageNumber,
    taskPerPage: taskPerPage
  });

  /**
   * 検索ボタン押下後の処理
   * ①state値をgetHookに渡す
   * ②検索完了後、stateを初期化
   */
  const handleSearch = () => {
    refetch();
  };

  /**
   * 【新規登録が完了していない方はこちら】を押下後の処理
   * ①ログインダイアログの状態をfalseにする
   * ②新規登録ダイアログの状態をtrueにする
   */
  const toggleDialog = () => {
    setOpenUserLoginDialog(false)
    setOpenUserDialog(true);
  };

  /**
   * ログアウト確認ダイアログで【はい】押下後の処理
   * ①ストアのdeleteLoginDataを呼び出す
   * ②ダイアログを閉じる
   */
  const handleLogoutYes = () => {
    deleteLoginData();
    setOpenUserLogoutDialog(false);
  };

  return (
    <>
      {/** テーブル */}
      <TableComponent
        tasks={tasks}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPage={totalPage}
        taskPerPage={taskPerPage}
        paginatedData={paginatedData} />

      {/** AppBar */}
      <AppBarComponent
        matchData={matchData}
        setMatchData={setMatchData}
        handleSearch={handleSearch}
        setOpenUserDialog={setOpenUserDialog}
        setUserStatus={setUserStatus}
        setOpenUserLoginDialog={setOpenUserLoginDialog}
        setOpenUserLogoutDialog={setOpenUserLogoutDialog} />

      {/** 新規登録ダイアログ */}
      <UserRegisterDialog
        openUserDialog={openUserDialog}
        setOpenUserDialog={setOpenUserDialog}
        userStatus={userStatus} />

      {/** ログインダイアログ */}
      <UserLoginDialog
        userStatus={userStatus}
        openUserLoginDialog={openUserLoginDialog}
        setOpenUserLoginDialog={setOpenUserLoginDialog}
        toggleDialog={toggleDialog} />

      {/** ログアウトダイアログ */}
      <UserLogoutDialog
        openUserLogoutDialog={openUserLogoutDialog}
        setOpenUserLogoutDialog={setOpenUserLogoutDialog}
        handleLogoutYes={handleLogoutYes} />

      {/** エラーダイアログ */}
      <ErrorDialog />
    </>
  )
};