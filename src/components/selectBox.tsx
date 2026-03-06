"use client"

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Controller, Path, useFormContext } from "react-hook-form"

// セレクトボックス（共通化）
type SelectBoxType<T> = {
  name: Path<T>,
  label: string,
  array: SelectType
};

type SelectType =
  | [
    { value: "notStarted", name: "未着手" },
    { value: "inProgress", name: "進行中" },
    { value: "done", name: "完了" }
  ]
  | [
    { value: "low", name: "低" },
    { value: "middle", name: "中" },
    { value: "high", name: "高" }
  ]
  | [
    { value: "sales", name: "営業部" },
    { value: "development", name: "開発部" },
    { value: "accounting", name: "経理部" },
    { value: "generalAffairs", name: "総務部" }
  ];

export const SelectBox = <T extends Record<string, any>>({
  name,
  label,
  array
}: SelectBoxType<T>) => {
  // RHFから取得
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <FormControl
          error={fieldState.invalid}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            displayEmpty>
            <MenuItem value="">
              <em>以下いずれかを選択して下さい</em>
            </MenuItem>
            {array.map((item) => (
              <MenuItem
                key={item.name}
                value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )} />
  )
}