"use client"

import { postUserApi } from "@/api/user/postUserApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"

// ユーザーの新規情報を登録
export const postUserHooks = () => {
  // キャッシュ操作の準備
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUserApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });
}