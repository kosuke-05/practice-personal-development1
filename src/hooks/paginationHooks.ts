"use client"

import { paginationApi } from "@/api/paginationApi"
import { PaginationType } from "@/types/pagination/paginationType";
import { useQuery } from "@tanstack/react-query"

export const paginationHooks = (
  {
    pageNumber,
    taskPerPage
  } : {
    pageNumber: number,
    taskPerPage: number
  }
) => {

  return useQuery<PaginationType>({
    queryKey: ["tasks", { pageNumber, taskPerPage }],
    queryFn: () => paginationApi({
      pageNumber,
      taskPerPage
    }),

    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 50,
    refetchOnWindowFocus: false
  })
};