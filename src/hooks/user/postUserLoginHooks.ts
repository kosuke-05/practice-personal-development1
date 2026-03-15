"use client"

import { postUserLoginApi } from "@/api/user/postUserLoginApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const postUserLoginHooks = () => {
  // キャッシュ操作の準備
  const queryClient = useQueryClient();
  console.log("ログイン：hooks");

  return useMutation({
    mutationFn: postUserLoginApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    }
  });
};