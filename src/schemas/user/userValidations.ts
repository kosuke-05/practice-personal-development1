"use client"

import z from "zod";

// ユーザー新規登録時に入力する情報のスキーマ
export const userRegisterSchema = z.object({
  employeeName:
    z.string()
    .min(2, {
      message: "2文字以上で登録して下さい"
    }),

  departmentName:
    z.string()
    .min(1, {
      message: "いずれかを選択して下さい"
    })
    .refine(
      v => ["sales", "development", "accounting", "generalAffairs"].includes(v)
    ),

  mailAddress:
    z.string()
    .email({
      message: "アドレスの形式に誤りがあります"
    }),

  password:
    z.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message: "8桁以上で、小文字・大文字・数字を含めてください"
    })
});