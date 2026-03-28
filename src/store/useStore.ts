"use client"

import { UserValidationType } from "@/components/user/userRegisterDialog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * ストアで管理するもの
 * ①ログインした後のユーザー情報
 * →社員名・部署名・メールアドレス・パスワード
 */
type StoreType = {
  loginData: UserValidationType | null,
  addLoginData: (data: UserValidationType) => void,
  deleteLoginData: () => void,

  // API通信でエラーが発生した場合のダイアログの開閉管理
  openErrorDialog: boolean,
  setOpenErrorDialog: (toggle: boolean) => void,

  // エラーメッセージ
  errorMessage: string | null,
  setErrorMessage: (mes: string | null) => void,

  // エラーステータス番号
  errorStatus: number | null,
  setErrorStatus: (status: number | null) => void,
};

export const useStore = create<StoreType>() (
  persist(
    (set) => ({
      loginData: null,
      addLoginData: (data: UserValidationType) => set({ loginData: data }),
      deleteLoginData: () => set({ loginData: null }),

      openErrorDialog: false,
      setOpenErrorDialog: (toggle: boolean) => set({ openErrorDialog: toggle }),

      errorMessage: null,
      setErrorMessage: (mes: string | null) => set({ errorMessage: mes }),

      errorStatus: null,
      setErrorStatus: (status: number | null) => set({ errorStatus: status })
    }),
    {
      name: "local-storage"
    }
  )
)