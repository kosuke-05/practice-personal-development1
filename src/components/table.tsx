"use client"

import { DepartmentName, DepartmentNameType, TaskPriority, TaskPriorityType, TaskStatus, TaskStatusType } from "@/constants/tableConstants";
import { getHooks } from "@/hooks/getHooks"
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { EditButton } from "./buttons";
import { useContext } from "react";
import { TaskContext } from "@/contexts/context";
import { InputTaskType } from "./createTask";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

/**
 * データ一覧をテーブルで描画
 * ①hooks層を読んでデータを取得
 * ②テーブル上で取得データを展開
 */
export const TableComponent = () => {
  // hooksから取得
  const { data } = getHooks();

  // コンテキストから取得
  const context = useContext(TaskContext);
  if(!context) return;

  // ルーターを取得
  const router = useRouter();

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

  return (
    <>
      <Table>
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
          {data?.map((item) => (
            <TableRow key={item.taskName}>
              <TableCell>{item.employeeName} / {DepartmentName[item.departmentName as DepartmentNameType]}</TableCell>
              <TableCell>{item.taskName}</TableCell>
              <TableCell>{item.taskDescription}</TableCell>
              <TableCell>{TaskStatus[item.taskStatus as TaskStatusType]}</TableCell>
              <TableCell>{TaskPriority[item.taskPriority as TaskPriorityType]}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center"
                  }}>
                  <EditButton item={item} handleEdit={handleEdit} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}