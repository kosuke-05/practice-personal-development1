"use client"

import { InputTaskType } from "../create/createType";

export type DetailTableType = {
  sortedData: InputTaskType[],
  handleEdit: (item: InputTaskType) => void,
  deleteStart: (id: string) => void
};

