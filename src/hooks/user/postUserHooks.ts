"use client"

import { postUserApi } from "@/api/user/postUserApi";
import { useStore } from "@/store/useStore";
import { useMutation, useQueryClient } from "@tanstack/react-query"

// ユーザーの新規情報を登録
export const postUserHooks = () => {
  // キャッシュ操作の準備
  const queryClient = useQueryClient();

  // ストア
  const setIsRegister = useStore((state) => state.setIsRegister);

  return useMutation({
    mutationFn: postUserApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsRegister(true);
    }
  });
}