"use client"

import { postUserLoginApi } from "@/api/user/postUserLoginApi";
import { useStore } from "@/store/useStore";
import { LoginDialogType } from "@/types/user/loginDialogType";
import { UserValidationType } from "@/types/user/userRegisterDialogType";
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