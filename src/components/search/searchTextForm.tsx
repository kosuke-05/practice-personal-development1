"use client"

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { SearchType } from "../appbar";

// 検索用のテキストフォーム
type PropsType = {
  matchData: SearchType,
  setMatchData: Dispatch<SetStateAction<SearchType>>
};

export const SearchTextField = ({
  matchData,
  setMatchData
}: PropsType) => {

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