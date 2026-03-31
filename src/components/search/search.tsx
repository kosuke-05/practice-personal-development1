"use client"

import { SearchDataType } from "@/types/search/searchDataType";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react"

/**
 * 検索機能
 * ①以下の条件で検索を行う
 * ・タスク名
 * ・進捗度
 * ・優先度
 * ・期限
 * ②入力・選択情報はstateで管理
 */
export const SearchComponent = () => {
  const [searchData, setSearchData] = useState<SearchDataType>({
    taskName: "",
    taskStatus: "",
    taskPriority: "",
    dueDate: ""
  });

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        placeholder="業務名"
        size="small"
        value={searchData.taskName}
        onChange={(e) => setSearchData(
          prev => ({
            ...prev,
            taskName: e.target.value
          })
        )}
        sx={{
          width: 100
        }} />

      <Select size="small">
        <MenuItem value="notStarted">未着手</MenuItem>
        <MenuItem value="inProgress">進行中</MenuItem>
        <MenuItem value="done">完了</MenuItem>
      </Select>
    </Stack>
  )
}