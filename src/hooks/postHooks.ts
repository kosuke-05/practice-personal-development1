"use client"

import { postApi } from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const postHooks = () => {
  // キャッシュ操作の準備
  const queryClient = useQueryClient();
  console.log("hooks層");

  return useMutation({
    mutationFn: postApi,

    // キャッシュから再フェチ
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}