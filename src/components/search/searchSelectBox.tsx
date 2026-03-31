"use client"

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DepartmentName } from "@/types/table";
import { SearchPropsType } from "@/types/search/searchPropsType";

// 検索用のセレクトボックス
export const SearchSelectBox = ({
  matchData,
  setMatchData
}: SearchPropsType) => {

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