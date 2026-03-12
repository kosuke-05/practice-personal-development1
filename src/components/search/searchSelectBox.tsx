"use client"

import { Dispatch, SetStateAction } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DepartmentName, DepartmentNameType } from "@/constants/tableConstants";
import { SearchType } from "../appBar";


// 検索用のセレクトボックス
type PropsType = {
  matchData: SearchType,
  setMatchData: Dispatch<SetStateAction<SearchType>>
};

export const SearchSelectBox = ({
  matchData,
  setMatchData
}: PropsType) => {

  return (
    <Select
      size="small"
      value={matchData.departmentName}
      onChange={
        (e) => setMatchData({
          ...matchData,
          departmentName: e.target.value
        })
      }
      displayEmpty
      sx={{
        bgcolor: "#fafafa"
      }}>
      <MenuItem value="">
        <em>いずれかを選択して下さい</em>
      </MenuItem>
      {Object.entries(DepartmentName).map(([key, value]) => (
        <MenuItem key={key} value={key}>{value}</MenuItem>
      ))}
    </Select>
  )
};