"use client"

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { DeleteButton, EditButton } from "../buttons";
import { DepartmentName, DepartmentNameType, TaskPriority, TaskPriorityType, TaskStatus, TaskStatusType } from "@/types/table";
import dayjs from "dayjs";
import { DetailTableType } from "@/types/detail/detailTableType";

// タスク詳細を表示するテーブル
export const DetailTable = ({
  sortedData,
  handleEdit,
  deleteStart
}: DetailTableType) => {

  return (
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
        {sortedData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.employeeName} / {DepartmentName[item.departmentName as DepartmentNameType]}</TableCell>
            <TableCell>{item.taskName}</TableCell>
            <TableCell>{item.taskDescription}</TableCell>
            <TableCell>{TaskStatus[item.taskStatus as TaskStatusType]}</TableCell>
            <TableCell>{TaskPriority[item.taskPriority as TaskPriorityType]}</TableCell>
            <TableCell
              sx={{
                color: dayjs(item.dueDate).isSame(dayjs(), "day")
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
                <EditButton
                  item={item}
                  handleEdit={handleEdit} />
                <DeleteButton
                  id={item.id}
                  deleteStart={deleteStart} />
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};