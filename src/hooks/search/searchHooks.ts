"use client"

import { searchGetApi } from "@/api/search/searchApi"
import { InputTaskType } from "@/components/createTask";
import { DepartmentNameType } from "@/constants/tableConstants";
import { useQuery } from "@tanstack/react-query"

// 検索用GETHooks
export const searchGetHooks = (
  employeeName: string,
  departmentName: DepartmentNameType | ""
) => {

  return useQuery<InputTaskType[]>({
    queryKey: ["tasks", employeeName, departmentName],
    queryFn: () => searchGetApi({employeeName, departmentName}),

    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: false
  });
};