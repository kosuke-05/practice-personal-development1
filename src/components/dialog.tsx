"use client"

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { DeleteNoButton, DeleteYesButton } from "./buttons";
import { DialogType } from "@/types/delete/deleteDialogType";

// 削除確認ダイアログ
export const DeleteConfirmationDialog = (
  {
    openDeleteConfirmation,
    handleDelete,
    cancelDelete
  }: DialogType
) => {


  return (
    <Dialog
      open={openDeleteConfirmation}
      PaperProps={{
        sx: {
          p: 2
        }
      }}>
      <DialogTitle>データを削除して宜しいですか？</DialogTitle>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <DeleteYesButton onClick={handleDelete} />
          <DeleteNoButton onClick={cancelDelete} />
        </Stack>
      </DialogActions>
    </Dialog>
  )
};