"use client"

import { useStore } from "@/store/useStore";
import { DetailTable } from "./detailTable";
import { getDetailHooks } from "@/hooks/detail/getDetailHooks";
import { useContext, useMemo, useState } from "react";
import { TaskContext } from "@/contexts/context";
import { useRouter } from "next/navigation";
import { DeleteConfirmationDialog } from "../dialog";
import { deleteHooks } from "@/hooks/deleteHooks";
import { ApiError } from "@/api/apiError";
import { DepartmentNameType } from "@/types/table";
import { InputTaskType } from "@/types/create/createType";

// タスク詳細画面のトップ
export const DetailTopComponent = () => {
  // ストアから取得
  const loginData = useStore((state) => state.loginData);

  // コンテキストを取得
  const context = useContext(TaskContext);
  if(!context) return;

  // ルーターを取得
  const router = useRouter();

  // hooksを呼び出す
  const { data, error, isError } = getDetailHooks({
    employeeName: loginData?.employeeName,
    departmentName: loginData?.departmentName as DepartmentNameType
  });

  // 削除確認ダイアログの開閉状態
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<boolean>(false);

  // 削除対象データのidを管理
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ストアから取得
  const setOpenErrorDialog = useStore((state) => state.setOpenErrorDialog);
  const setErrorMessage = useStore((state) => state.setErrorMessage);
  const setErrorStatus = useStore((state) => state.setErrorStatus);

  // 詳細のAPI通信で例外が発生した場合の処理
  if(isError && error instanceof ApiError) {
    setErrorStatus(error.status);
    setErrorMessage(error.message);
    setOpenErrorDialog(true);
  };

  // hooksの呼び出し
  const deleteHook = deleteHooks();
  if(!data) return;

  /**
   * 詳細画面で表示するタスクのソート
   * ①タスク進捗度が完了だと表示しない
   * ②直近の日付のタスクから表示する
   */
  const sortedData = useMemo(() => {
    return [...(data ?? [])]
      .filter(
        (item) => item.taskStatus !== "done"
      )
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
  }, [data]);

  /**
   * ①ストアから取得したデータをhooksに渡す（社員名・部署名のみ）
   * →hooksは新規作成する必要あり
   * ②API通信で社員名・部署名で完全合致したデータを取得
   * ③useQuery()で取得したdataをpropsで詳細テーブルに渡す
   */

  /**
   * 編集ボタン押下後の処理
   * ①ページステータスをeditに更新
   * ②編集対象のidをstateに渡す
   * ③createに遷移
   * →新規登録画面と編集画面の使いまわし
   */
  const handleEdit = (item: InputTaskType) => {
    context.setPageStatus("edit");
    context.setEditData(item);
    router.push("/create");
  };

  /**
   * 削除ボタン押下後の処理
   * ①stateにidを渡す
   * ②削除確認ダイアログを開く
   */
  const deleteStart = (id: string) => {
    setDeleteId(id);
    setOpenDeleteConfirmation(true);
  };

  /**
   * 削除確認ダイアログで【はい】を押下後の処理
   * ①stateで管理しているidをhooksに渡す
   * ②ダイアログを閉じる
   * ③削除対象のidをnullに初期化する
   */
  const handleDelete = async () => {
    try {
      await deleteHook.mutateAsync(deleteId!);
      setOpenDeleteConfirmation(false);
      setDeleteId(null);
      router.push("/");
      context.setPageStatus("normal");
    } catch(e) {
      if(e instanceof ApiError) {
        setErrorMessage(e.message);
        setErrorStatus(e.status);
        setOpenErrorDialog(true);
      }
    }
  };

  /**
   * 削除確認ダイアログで【いいえ】を押下後の処理
   * ①ダイアログを閉じる
   * ②削除対象のidをnullに初期化する
   */
  const cancelDelete = () => {
    setOpenDeleteConfirmation(false);
    setDeleteId(null);
  };

  return (
    <>
      {/** タスク詳細を表示するテーブル */}
      <DetailTable
        sortedData={sortedData}
        handleEdit={handleEdit}
        deleteStart={deleteStart} />

      {/** 削除確認ダイアログ */}
      <DeleteConfirmationDialog
        openDeleteConfirmation={openDeleteConfirmation}
        handleDelete={handleDelete}
        cancelDelete={cancelDelete}
        />
    </>
  )
};