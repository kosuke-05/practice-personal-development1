"use client"

import { DepartmentName, DepartmentNameType, TaskPriority, TaskPriorityType, TaskStatus, TaskStatusType } from "@/types/table";
import { getHooks } from "@/hooks/getHooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { TaskContext } from "@/contexts/context";
import { InputTaskType } from "./createTask";
import { useRouter } from "next/navigation";
import { deleteHooks } from "@/hooks/deleteHooks";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { paginationHooks } from "@/hooks/paginationHooks";
import { number } from "zod";
import { PaginationComponent } from "./pagination";

/**
 * データ一覧をテーブルで描画
 * ①hooks層を読んでデータを取得
 * ②テーブル上で取得データを展開
 */
type TableType = {
  tasks: InputTaskType[] | undefined,
  pageNumber: number,
  setPageNumber: Dispatch<SetStateAction<number>>,
  totalPage: number,
  taskPerPage: number
};

export const TableComponent = ({
  tasks,
  pageNumber,
  setPageNumber,
  totalPage,
  taskPerPage
}: TableType) => {
  // hooksから取得
  const { data } = getHooks();

  // コンテキストから取得
  const context = useContext(TaskContext);
  if(!context) return;

  /**
   * 検索結果が存在するかの判定
   * ①検索結果が存在　→　検索結果を優先
   * ②存在しない　→　全件取得
   */
  const getData = tasks ?? data;

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
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/** ページネーション */}
      <PaginationComponent
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPage={totalPage}
        taskPerPage={taskPerPage} />
    </>
  )
};