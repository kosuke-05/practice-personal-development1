"use client"

import TextField from "@mui/material/TextField";
import { Controller, Path, useFormContext } from "react-hook-form"

// 提出期限フォーム
type DateType<T> = {
  name: Path<T>,
  label: string
};

export const InputDate = <T extends Record<string, any>>({
  name,
  label}: DateType<T>) => {
  // RHFから取得
  const {control} = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <TextField
          {...field}
          type="date"
          error={fieldState.invalid}
          helperText={fieldState.error?.message} />
      )} />
  )
}