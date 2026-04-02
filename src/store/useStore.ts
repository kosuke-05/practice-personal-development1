"use client"

import { AuthStatusType } from "@/types/buttons/user/userButtonType";
import { UserValidationType } from "@/types/user/userRegisterDialogType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * ストアで管理するもの
 * ①ログインした後のユーザー情報
 * →社員名・部署名・メールアドレス・パスワード
 */
type StoreType = {
  // 新規登録・ログイン・ゲスト状態の管理
  authStatus: AuthStatusType,
  setAuthStatus: (auth: AuthStatusType) => void,

  // ログインした際のデータを管理
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
      authStatus: "guest",
      setAuthStatus: (auth: AuthStatusType) => set({ authStatus: auth }),

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