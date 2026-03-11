"use client"

import { DepartmentName, DepartmentNameType, TaskPriority, TaskPriorityType, TaskStatus, TaskStatusType } from "@/constants/tableConstants";
import { getHooks } from "@/hooks/getHooks"
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DeleteButton, EditButton } from "./buttons";
import { useContext, useState } from "react";
import { TaskContext } from "@/contexts/context";
import { InputTaskType } from "./createTask";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { DialogComponent } from "./dialog";
import { deleteHooks } from "@/hooks/deleteHooks";
import dayjs from "dayjs";
import { SearchComponent } from "./search/search";
import { AppBarComponent } from "./appbar";
import Toolbar from "@mui/material/Toolbar";

/**
 * データ一覧をテーブルで描画
 * ①hooks層を読んでデータを取得
 * ②テーブル上で取得データを展開
 */
type TableType = {
  tasks: InputTaskType[] | undefined
};

export const TableComponent = ({
  tasks
}: TableType) => {
  // hooksから取得
  const { data } = getHooks();
  const delHook = deleteHooks();

  // コンテキストから取得
  const context = useContext(TaskContext);
  if(!context) return;

  // ルーターを取得
  const router = useRouter();

  // 削除確認ダイアログの開閉状態
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // 削除対象データのidを管理
  const [deleteId, setDeleteId] = useState<string | null>(null);

  /**
   * 検索結果が存在するかの判定
   * ①検索結果が存在　→　検索結果を優先
   * ②存在しない　→　全件取得
   */
  const getData = tasks ?? data;

  /**
   * 編集ボタン押下後の処理
   * ①ページステータスをeditに更新
   * ②編集対象のidをstateに渡す
   * ③編集対象のデータをstateに渡す
   * ③編集画面に遷移（登録画面と使い回し）
   */
  const handleEdit = (item: InputTaskType) => {
    context.setPageStatus("edit");
    // context.setDataId(item.id);
    context.setEditData(item);
    router.push("/create");
  };

  /**
   * 【削除】ボタン押下の段階で対象データのidを渡しておく
   * ①削除確認ダイアログの状態をtrueにする
   * ②削除対象データのid番号をstateに渡す
   */
  const startDelete = (id: string) => {
    setOpenDialog(true);
    setDeleteId(id);
  };

  /**
   * 削除確認ダイアログで【はい】ボタン押下後の処理
   * ①hooks層の呼び出し
   * ②削除処理完了後にダイアログを閉じる
   */
  const handleDeleteYes = () => {
    delHook.mutate(deleteId!);
    setOpenDialog(false);
  };

  /**
   * 削除確認ダイアログで【いいえ】ボタン押下時の処理
   * ①削除対象データのidをnullに戻す
   * ②ダイアログの開閉状態をfalseにする
   */
  const handleDeleteNo = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };


  return (
    <>
      <Table
        sx={{
          mt: "64px"
        }}>
        <TableHead>
          <TableRow>
            <TableCell>社員名 / 部署名</TableCell>
            <TableCell>業務名</TableCell>
            <TableCell>業務説明</TableCell>
            <TableCell>進捗度</TableCell>
            <TableCell>優先度</TableCell>
            <TableCell>期限</TableCell>
            <TableCell>オプション</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getData?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.employeeName} / {DepartmentName[item.departmentName as DepartmentNameType]}</TableCell>
              <TableCell>{item.taskName}</TableCell>
              <TableCell>{item.taskDescription}</TableCell>
              <TableCell>{TaskStatus[item.taskStatus as TaskStatusType]}</TableCell>
              <TableCell>{TaskPriority[item.taskPriority as TaskPriorityType]}</TableCell>
              <TableCell
                sx={{
                  color:
                    dayjs(item.dueDate).isSame(dayjs(), "day")
                    ? "red"
                    : "black"
                }}>{item.dueDate}</TableCell>
              <TableCell>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center"
                  }}>
                  <EditButton item={item} handleEdit={handleEdit} />
                  <DeleteButton onClick={() => startDelete(item.id)} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/** 削除確認ダイアログ */}
      <DialogComponent
        openDialog={openDialog}
        handleDeleteYes={handleDeleteYes}
        handleDeleteNo={handleDeleteNo} />
    </>
  )
};