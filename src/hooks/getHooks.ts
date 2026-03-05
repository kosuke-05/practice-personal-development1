"use client"

import { getApi } from "@/api/getApi";
import { InputTaskType } from "@/components/createTask";
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const getHooks = () => {

  return useQuery<InputTaskType[]>({
    queryKey: ["tasks"],
    queryFn: getApi,

    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false
  });
};