"use client"

import { Path } from "react-hook-form";

// テキストフォーム（共通化）
export type InputType<T> = {
  name: Path<T>,
  label: string,
  placeholder: string
};