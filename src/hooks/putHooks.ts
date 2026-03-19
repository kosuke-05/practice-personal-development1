"use client"

import { putApi } from "@/api/putApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const putHooks = () => {
  // キャッシュ操作の準備
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["detail"] });
    }
  })
};