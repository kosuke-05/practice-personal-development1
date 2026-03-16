"use client"

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";

// 詳細画面押下時にログインを促すダイアログ
type PromptLoginDialogType = {
  openPromptLoginDialog: boolean,
  setOpenPromptLoginDialog: Dispatch<SetStateAction<boolean>>
};

export const PromptLoginDialog = ({
  openPromptLoginDialog,
  setOpenPromptLoginDialog
}: PromptLoginDialogType) => {


  return (
    <Dialog
      open={openPromptLoginDialog}
      onClose={() => setOpenPromptLoginDialog(false)}
      sx={{
        p: 1
      }}>
      <DialogContent>
        <Typography variant="body1">
          ログインを完了後、詳細画面に遷移できます
        </Typography>
      </DialogContent>
    </Dialog>
  )
};