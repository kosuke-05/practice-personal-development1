"use client"

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { Dispatch, SetStateAction } from "react";
import { DeleteNoButton, DeleteYesButton } from "./buttons";

type DialogType = {
  openDialog: boolean,
  handleDeleteYes: () => void,
  handleDeleteNo: () => void
};

// 削除確認ダイアログ
export const DialogComponent = (
  {
    openDialog,
    handleDeleteYes,
    handleDeleteNo
  }: DialogType
) => {


  return (
    <Dialog
      open={openDialog}
      PaperProps={{
        sx: {
          p: 2
        }
      }}>
      <DialogTitle>データを削除して宜しいですか？</DialogTitle>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <DeleteYesButton onClick={handleDeleteYes} />
          <DeleteNoButton onClick={handleDeleteNo} />
        </Stack>
      </DialogActions>
    </Dialog>
  )
};