"use client"

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// タスク詳細を表示するテーブル
export const DetailTable = () => {

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
        
      </TableBody>
    </Table>
  )
};