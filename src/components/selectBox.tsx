"use client"

import { SelectBoxType } from "@/types/create/selectBoxType";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Controller, Path, useFormContext } from "react-hook-form"

export const SelectBox = <T extends Record<string, any>>({
  name,
  label,
  array
}: SelectBoxType<T>) => {
  // RHFから取得
  const { control } = useFormContext<T>();

  // 部署名の判別
  const isDepartmentName = name === "departmentName";

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
            displayEmpty
            sx={{
              width: isDepartmentName ? 230 : null
            }}>
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