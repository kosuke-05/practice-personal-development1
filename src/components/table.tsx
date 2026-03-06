"use client"

import { TaskPriority, TaskPriorityType, TaskStatus, TaskStatusType } from "@/constants/tableConstants";
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

/**
 * データ一覧をテーブルで描画
 * ①hooks層を読んでデータを取得
 * ②テーブル上で取得データを展開
 */
export const TableComponent = () => {
  // hooksから取得
  const { data } = getHooks();

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
              <TableCell>{item.employeeName} / {item.departmentName}</TableCell>
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
                  <EditButton />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}