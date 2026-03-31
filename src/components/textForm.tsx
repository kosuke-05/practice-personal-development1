"use client"

import { Controller, Path, useFormContext } from "react-hook-form"
import TextField from "@mui/material/TextField";
import { InputType } from "@/types/create/inputType";

export const InputForm = <T extends Record<string, any>>({
  name,
  label,
  placeholder}: InputType<T>) => {
  // RHFから取得
  const { control } = useFormContext<T>();

  // タスク説明欄かどうかの判定
  const desResult = name === "taskDescription";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          multiline={desResult}
          rows={desResult ? 5 : undefined}
          error={fieldState.invalid}
          helperText={fieldState.error?.message} />
      )} />
  )
}