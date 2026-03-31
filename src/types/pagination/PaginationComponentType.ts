"use client"

import { Dispatch, SetStateAction } from "react";

export type PaginationComponentType = {
  pageNumber: number,
  setPageNumber: Dispatch<SetStateAction<number>>,
  totalPage: number
};

