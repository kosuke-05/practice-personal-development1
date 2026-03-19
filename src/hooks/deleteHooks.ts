"use client"

import { deleteApi } from "@/api/deleteApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"

// 削除処理
export const deleteHooks = () => {
  // キャッシュ操作の準備
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["detail"] });
    }
  });
};