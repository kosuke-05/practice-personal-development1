"use client"

import { Dispatch, SetStateAction } from "react";

export type PromptLoginDialogType = {
  openPromptLoginDialog: boolean,
  setOpenPromptLoginDialog: Dispatch<SetStateAction<boolean>>
};

