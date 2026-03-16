"use client"

import { postUserLoginApi } from "@/api/user/postUserLoginApi";
import { LoginDialogType } from "@/components/user/userLoginDialog";
import { UserValidationType } from "@/components/user/userRegisterDialog";
import { useStore } from "@/store/useStore";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const postUserLoginHooks = () => {
  // キャッシュ操作の準備
  const queryClient = useQueryClient();

  // ストアから取得
  const addLoginData = useStore((state) => state.addLoginData);

  return useMutation<UserValidationType | null, Error, LoginDialogType>({
    mutationFn: postUserLoginApi,

    onSuccess: (data) => {
      if(data) {
        addLoginData(data);
      }
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    }
  });
};