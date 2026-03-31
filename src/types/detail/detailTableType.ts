"use client"

import { InputTaskType } from "../create/createType";

export type DetailTableType = {
  data: InputTaskType[],
  handleEdit: (item: InputTaskType) => void,
  deleteStart: (id: string) => void
};

