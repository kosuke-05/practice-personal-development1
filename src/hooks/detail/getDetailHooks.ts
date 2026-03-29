"use client"

import { getDetailApi } from "@/api/detail/getDetailApi"
import { InputTaskType } from "@/components/createTask";
import { DepartmentNameType } from "@/types/table";
import { useQuery } from "@tanstack/react-query"

export const getDetailHooks = (
  {
    employeeName,
    departmentName
  } : {
    employeeName?: string,
    departmentName?: DepartmentNameType
}) => {

  return useQuery<InputTaskType[]>({
    queryKey: ["detail", employeeName, departmentName],
    queryFn: () =>
      getDetailApi({
        employeeName: employeeName ?? "",
        departmentName: departmentName ?? ""
      }),

    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!employeeName && !!departmentName
  })
};