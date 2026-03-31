"use client"

import { TaskContext } from "@/contexts/context";
import { PromptLoginDialogType } from "@/types/detail/promptLoginDialog";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";

// 詳細画面押下時にログインを促すダイアログ
export const PromptLoginDialog = ({
  openPromptLoginDialog,
  setOpenPromptLoginDialog
}: PromptLoginDialogType) => {
  // コンテキストから取得
  const context = useContext(TaskContext);
  if(!context) return null;

  return (
    <Dialog
      open={openPromptLoginDialog}
      onClose={() => {
        context.setPageStatus("normal");
        setOpenPromptLoginDialog(false);
      }}
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