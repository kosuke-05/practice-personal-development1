"use client"

import { createApi } from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createHooks = () => {
  // キャッシュ操作の準備
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApi,

    // キャッシュから再フェチ
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}