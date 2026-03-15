"use client"

import z from "zod";

export const userLoginSchema = z.object({
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
      }
    )
});