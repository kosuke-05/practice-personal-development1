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
  deleteLoginData: () => void
}

export const useStore = create<StoreType>() (
  persist(
    (set) => ({
      loginData: null,
      addLoginData: (data: UserValidationType) => set({ loginData: data }),
      deleteLoginData: () => set({ loginData: null })
    }),
    {
      name: "local-storage"
    }
  )
)