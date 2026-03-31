"use client"

import { DateType } from "@/types/create/dateType";
import TextField from "@mui/material/TextField";
import { Controller, Path, useFormContext } from "react-hook-form"

export const InputDate = <T extends Record<string, any>>({
  name
}: DateType<T>) => {
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