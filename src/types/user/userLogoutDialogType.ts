"use client"

import { Dispatch, SetStateAction } from "react";

export type LogoutDialogType = {
  openUserLogoutDialog: boolean,
  setOpenUserLogoutDialog: Dispatch<SetStateAction<boolean>>,
  handleLogoutYes: () => void
};

