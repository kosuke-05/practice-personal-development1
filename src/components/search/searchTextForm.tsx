"use client"

import { SearchPropsType } from "@/types/search/searchPropsType";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// 検索用のテキストフォーム
export const SearchTextField = ({
  matchData,
  setMatchData
}: SearchPropsType) => {

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        size="small"
        value={matchData.employeeName}
        placeholder="社員名を入力"
        onChange={
          (e) =>  setMatchData({
            ...matchData,
            employeeName: e.target.value
          })}
        sx={{
          bgcolor: "#fafafa",
          borderRadius: 1
        }} />
    </Stack>
  )
};